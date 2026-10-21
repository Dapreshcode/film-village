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
  name: z.string().trim().min(1, "Name is required").max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only")
    .max(80),
  summary: z.string().trim().min(1, "Summary is required").max(300),
  description: z.string().trim().max(5000),
  category: z.string().trim().max(80),
  //image validation: must be a local path (starting with /) or a full https:// URL, max length 500
imageUrl: z
  .string()
  .trim()
  .max(500)
  .refine(isAllowedImageUrl, {
    message:
      "Please upload an image, or use a local /images/... path. Links from Google, Pinterest and similar sites aren't supported.",
  }),
  status: z.enum(["PLANNED", "IN_DEVELOPMENT", "COMING_SOON"]),
  sortOrder: z.coerce.number().int().min(0).max(9999),
  features: z.array(z.string().max(120)).max(20),
});

function parse(formData: FormData) {
  const s = (k: string) => String(formData.get(k) ?? "");
  const result = schema.safeParse({
    name: s("name"),
    slug: s("slug"),
    summary: s("summary"),
    description: s("description"),
    category: s("category"),
    imageUrl: s("imageUrl"),
    status: s("status"),
    sortOrder: s("sortOrder") || "0",
    features: s("features")
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean),
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
      name: d.name,
      slug: d.slug,
      summary: d.summary,
      description: d.description || null,
      category: d.category || null,
      imageUrl: d.imageUrl || null,
      status: d.status,
      sortOrder: d.sortOrder,
      features: d.features,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    },
  };
}

function refreshPublicPages() {
  // public pages that may be affected by facility changes
  revalidatePath("/");
  revalidatePath("/facilities");
  revalidatePath("/admin/facilities");
}

function isUniqueError(e: unknown) {
  return (e as { code?: string })?.code === "P2002";
}

export async function createFacility(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.ok) return parsed.state;

  try {
    await prisma.facility.create({ data: parsed.data });
  } catch (e) {
    if (isUniqueError(e)) {
      return { error: "That slug is already used by another facility.", fieldErrors: { slug: ["Slug must be unique"] } };
    }
    throw e;
  }

  refreshPublicPages();
  redirect("/admin/facilities");
}

export async function updateFacility(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.ok) return parsed.state;

  try {
    await prisma.facility.update({ where: { id }, data: parsed.data });
  } catch (e) {
    if (isUniqueError(e)) {
      return { error: "That slug is already used by another facility.", fieldErrors: { slug: ["Slug must be unique"] } };
    }
    throw e;
  }

  refreshPublicPages();
  redirect("/admin/facilities");
}

export async function togglePublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const current = await prisma.facility.findUnique({
    where: { id },
    select: { published: true },
  });
  if (!current) return;
  await prisma.facility.update({
    where: { id },
    data: { published: !current.published },
  });
  refreshPublicPages();
}

export async function deleteFacility(id: string) {
  await requireAdmin();
  await prisma.facility.delete({ where: { id } });
  refreshPublicPages();
  redirect("/admin/facilities");
}