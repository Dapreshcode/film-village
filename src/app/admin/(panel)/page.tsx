import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";

export default async function DashboardPage() {
  await requireAdmin(); // check again here; never rely on the layout alone

  const [facilities, journey, stories, journal, quotes, newEnquiries, recent] =
    await Promise.all([
      prisma.facility.count(),
      prisma.journeyItem.count(),
      prisma.story.count(),
      prisma.journalEntry.count(),
      prisma.founderQuote.count(),
      prisma.partnerEnquiry.count({ where: { status: "NEW" } }),
      prisma.partnerEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, enquiryType: true, status: true, createdAt: true },
      }),
    ]);

  const cards = [
    { label: "Facilities", value: facilities, href: "/admin/facilities" },
    { label: "Journey items", value: journey, href: "/admin/journey" },
    { label: "Stories", value: stories, href: "/admin/stories" },
    { label: "Journal entries", value: journal, href: "/admin/journal" },
    { label: "Founder quotes", value: quotes, href: "/admin/founder-quotes" },
    { label: "New enquiries", value: newEnquiries, href: "/admin/enquiries" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded border p-4 hover:bg-black/5">
            <p className="text-3xl font-semibold">{c.value}</p>
            <p className="text-sm opacity-70">{c.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold">Latest enquiries</h2>
      {recent.length === 0 ? (
        <p className="text-sm opacity-70">No enquiries yet.</p>
      ) : (
        <ul className="divide-y rounded border">
          {recent.map((e) => (
            <li key={e.id} className="flex justify-between p-3 text-sm">
              <span>{e.name} · {e.enquiryType}</span>
              <span className="opacity-70">{e.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}