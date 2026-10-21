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
  text: z.string().trim().min(1, "The quote is required").max(1200),
  imageUrl: z
    .string()
    .trim()
    .min(1, "Please upload a photo")
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
    text: s("text"),
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
      text: d.text,
      imageUrl: d.imageUrl,
      sortOrder: d.sortOrder,
      published: formData.get("published") === "on",
    },
  };
}

function refreshPublicPages() {
  // Adjust to the real public routes where founder quotes appear
  revalidatePath("/");
  revalidatePath("/founder");
  revalidatePath("/admin/founder-quotes");
}

export async function createFounderQuote(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.ok) return parsed.state;

  await prisma.founderQuote.create({ data: parsed.data });

  refreshPublicPages();
  redirect("/admin/founder-quotes");
}

export async function updateFounderQuote(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.ok) return parsed.state;

  const exists = await prisma.founderQuote.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!exists) return { error: "This quote no longer exists." };

  await prisma.founderQuote.update({ where: { id }, data: parsed.data });

  refreshPublicPages();
  redirect("/admin/founder-quotes");
}

export async function togglePublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const current = await prisma.founderQuote.findUnique({
    where: { id },
    select: { published: true },
  });
  if (!current) return;
  await prisma.founderQuote.update({
    where: { id },
    data: { published: !current.published },
  });
  refreshPublicPages();
}

export async function deleteFounderQuote(id: string) {
  await requireAdmin();
  await prisma.founderQuote.delete({ where: { id } });
  refreshPublicPages();
  redirect("/admin/founder-quotes");
}