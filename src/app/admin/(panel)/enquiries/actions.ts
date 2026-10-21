"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";

const statusSchema = z.enum(["NEW", "REVIEWING", "CONTACTED", "CLOSED"]);

export async function updateEnquiryStatus(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = statusSchema.safeParse(formData.get("status"));
  if (!parsed.success) return;

  await prisma.partnerEnquiry
    .update({ where: { id }, data: { status: parsed.data } })
    .catch(() => null); // record may have been deleted in another tab

  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
}

export async function deleteEnquiry(id: string) {
  await requireAdmin();

  await prisma.partnerEnquiry.delete({ where: { id } }).catch(() => null);

  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  redirect("/admin/enquiries");
}