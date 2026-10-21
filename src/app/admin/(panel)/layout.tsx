import type { Metadata } from "next";
import { requireAdmin } from "@/lib/require-admin";
import AdminShell from "./admin-shell";

export const metadata: Metadata = {
  title: "CFCV Admin",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/facilities", label: "Facilities" },
  { href: "/admin/journey", label: "Journey" },
  { href: "/admin/stories", label: "Stories" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/founder-quotes", label: "Founder quotes" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  return (
    <AdminShell email={session.user.email} nav={nav}>
      {children}
    </AdminShell>
  );
}