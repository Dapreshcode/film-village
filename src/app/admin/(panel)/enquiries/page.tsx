import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import { STATUSES, STATUS_LABEL } from "./status";

const PAGE_SIZE = 20;

export default async function EnquiriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  await requireAdmin();

  const sp = await searchParams;
  const status = STATUSES.find((s) => s === sp.status);
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const where = status ? { status } : undefined;

  const [rows, total, grouped] = await Promise.all([
    prisma.partnerEnquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        organization: true,
        enquiryType: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.partnerEnquiry.count({ where }),
    prisma.partnerEnquiry.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const counts = Object.fromEntries(grouped.map((g) => [g.status, g._count._all]));
  const allCount = grouped.reduce((sum, g) => sum + g._count._all, 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const href = (p: number) => {
    const qs = new URLSearchParams();
    if (status) qs.set("status", status);
    if (p > 1) qs.set("page", String(p));
    const s = qs.toString();
    return `/admin/enquiries${s ? `?${s}` : ""}`;
  };

  const tab = (active: boolean) =>
    `rounded px-3 py-1.5 text-sm ${active ? "bg-black text-white" : "border hover:bg-black/5"}`;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Partner enquiries</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/admin/enquiries" className={tab(!status)}>
          All ({allCount})
        </Link>
        {STATUSES.map((s) => (
          <Link key={s} href={`/admin/enquiries?status=${s}`} className={tab(status === s)}>
            {STATUS_LABEL[s]} ({counts[s] ?? 0})
          </Link>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="text-sm opacity-70">No enquiries here.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="border-b text-xs uppercase opacity-70">
            <tr>
              <th className="py-2">From</th>
              <th>Organisation</th>
              <th>Type</th>
              <th>Received</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-b">
                <td className={`py-3 ${e.status === "NEW" ? "font-semibold" : ""}`}>{e.name}</td>
                <td>{e.organization ?? "—"}</td>
                <td>{e.enquiryType}</td>
                <td>
                  {e.createdAt.toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Africa/Lagos",
                  })}
                </td>
                <td>{STATUS_LABEL[e.status]}</td>
                <td className="text-right">
                  <Link href={`/admin/enquiries/${e.id}`} className="underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-4 text-sm">
          {page > 1 && <Link href={href(page - 1)} className="underline">← Newer</Link>}
          <span className="opacity-70">Page {page} of {totalPages}</span>
          {page < totalPages && <Link href={href(page + 1)} className="underline">Older →</Link>}
        </div>
      )}
    </div>
  );
}