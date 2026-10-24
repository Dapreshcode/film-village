"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import { isAllowedImageUrl } from "@/lib/image-url";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const schema = z.object({
  title: z.string().trim().min(1, "Title is required").max(150),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only")
    .max(100),
  excerpt: z.string().trim().min(1, "Excerpt is required").max(300),
  content: z.string().trim().max(50000),
  category: z.string().trim().min(1, "Category is required").max(60),
  dateLabel: z.string().trim().max(60),
  imageUrl: z
    .string()
    .trim()
    .max(500)
    .refine(isAllowedImageUrl, {
      message:
        "Please upload an image, or use a local /images/... path. Links from Google, Pinterest and similar sites aren't supported.",
    }),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

function parse(formData: FormData) {
  const s = (k: string) => String(formData.get(k) ?? "");
  const result = schema.safeParse({
    title: s("title"),
    slug: s("slug"),
    excerpt: s("excerpt"),
    content: s("content"),
    category: s("category"),
    dateLabel: s("dateLabel"),
    imageUrl: s("imageUrl"),
    sortOrder: s("sortOrder") || "0",
  });

  if (!result.success) {
    const state: FormState = {
      error: "Please fix the highlighted fields.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
    return { ok: false as const, state };
  }

  const d = result.data;
  return {
    ok: true as const,
    data: {
      title: d.title,
      slug: d.slug,
      excerpt: d.excerpt,
      content: d.content || null,
      category: d.category,
      dateLabel: d.dateLabel || null,
      imageUrl: d.imageUrl || null,
      sortOrder: d.sortOrder,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    },
  };
}

function refreshPublicPages() {
  // Adjust to the real public routes. "layout" also refreshes /stories/[slug] pages.
  revalidatePath("/");
  revalidatePath("/stories", "layout");
  revalidatePath("/admin/stories");
  revalidatePath("/sitemap.xml");
}

function isUniqueError(e: unknown) {
  return (e as { code?: string })?.code === "P2002";
}

const duplicateSlug: FormState = {
  error: "That slug is already used by another story.",
  fieldErrors: { slug: ["Slug must be unique"] },
};

export async function createStory(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.ok) return parsed.state;

  try {
    await prisma.story.create({
      data: {
        ...parsed.data,
        publishedAt: parsed.data.published ? new Date() : null,
      },
    });
  } catch (e) {
    if (isUniqueError(e)) return duplicateSlug;
    throw e;
  }

  refreshPublicPages();
  redirect("/admin/stories");
}

export async function updateStory(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.ok) return parsed.state;

  const existing = await prisma.story.findUnique({
    where: { id },
    select: { publishedAt: true },
  });
  if (!existing) return { error: "This story no longer exists." };

  // Set once, on first publish; never changed afterwards
  const publishedAt =
    parsed.data.published && !existing.publishedAt
      ? new Date()
      : existing.publishedAt;

  try {
    await prisma.story.update({
      where: { id },
      data: { ...parsed.data, publishedAt },
    });
  } catch (e) {
    if (isUniqueError(e)) return duplicateSlug;
    throw e;
  }

  refreshPublicPages();
  redirect("/admin/stories");
}

export async function togglePublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const current = await prisma.story.findUnique({
    where: { id },
    select: { published: true, publishedAt: true },
  });
  if (!current) return;

  const nowPublished = !current.published;
  await prisma.story.update({
    where: { id },
    data: {
      published: nowPublished,
      publishedAt:
        nowPublished && !current.publishedAt ? new Date() : current.publishedAt,
    },
  });
  refreshPublicPages();
}

export async function deleteStory(id: string) {
  await requireAdmin();
  await prisma.story.delete({ where: { id } });
  refreshPublicPages();
  redirect("/admin/stories");
}