import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const requireAdmin = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/admin/login");

  const { user } = session;
  if (user.role !== "admin" || user.banned) {
    redirect("/admin/login?error=forbidden");
  }

  return session;
});


export async function getAdminSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin" || session.user.banned) {
    return null;
  }
  return session;
}