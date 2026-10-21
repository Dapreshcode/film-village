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
  title: z.string().trim().min(1, "Title is required").max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only")
    .max(80),
  summary: z.string().trim().min(1, "Summary is required").max(300),
  description: z.string().trim().max(5000),
  dateLabel: z.string().trim().max(60),
  imageUrl: z
    .string()
    .trim()
    .max(500)
    .refine(isAllowedImageUrl, {
      message:
        "Please upload an image, or use a local /images/... path. Links from Google, Pinterest and similar sites aren't supported.",
    }),
  status: z.enum(["COMPLETED", "IN_PROGRESS", "UPCOMING"]),
  sortOrder: z.coerce.number().int().min(0).max(9999),
});

function parse(formData: FormData) {
  const s = (k: string) => String(formData.get(k) ?? "");
  const result = schema.safeParse({
    title: s("title"),
    slug: s("slug"),
    summary: s("summary"),
    description: s("description"),
    dateLabel: s("dateLabel"),
    imageUrl: s("imageUrl"),
    status: s("status"),
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
      summary: d.summary,
      description: d.description || null,
      dateLabel: d.dateLabel || null,
      imageUrl: d.imageUrl || null,
      status: d.status,
      sortOrder: d.sortOrder,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    },
  };
}

function refreshPublicPages() {
  // Adjust to the real public routes where journey items appear
  revalidatePath("/");
  revalidatePath("/journey");
  revalidatePath("/admin/journey");
}

function isUniqueError(e: unknown) {
  return (e as { code?: string })?.code === "P2002";
}

const duplicateSlug: FormState = {
  error: "That slug is already used by another journey item.",
  fieldErrors: { slug: ["Slug must be unique"] },
};

export async function createJourneyItem(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.ok) return parsed.state;

  try {
    await prisma.journeyItem.create({ data: parsed.data });
  } catch (e) {
    if (isUniqueError(e)) return duplicateSlug;
    throw e;
  }

  refreshPublicPages();
  redirect("/admin/journey");
}

export async function updateJourneyItem(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.ok) return parsed.state;

  try {
    await prisma.journeyItem.update({ where: { id }, data: parsed.data });
  } catch (e) {
    if (isUniqueError(e)) return duplicateSlug;
    throw e;
  }

  refreshPublicPages();
  redirect("/admin/journey");
}

export async function togglePublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const current = await prisma.journeyItem.findUnique({
    where: { id },
    select: { published: true },
  });
  if (!current) return;
  await prisma.journeyItem.update({
    where: { id },
    data: { published: !current.published },
  });
  refreshPublicPages();
}

export async function deleteJourneyItem(id: string) {
  await requireAdmin();
  await prisma.journeyItem.delete({ where: { id } });
  refreshPublicPages();
  redirect("/admin/journey");
}