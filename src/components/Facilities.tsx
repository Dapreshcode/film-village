
import Image from "next/image";
import { prisma } from "@/lib/Prisma";
import { isAllowedImageUrl } from "@/lib/image-url";

export default async function Facilities() {
  const facilities = await prisma.facility.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { name: "asc" },
    ],
    take: 6,
    select: {
      id: true,
      slug: true,
      name: true,
      summary: true,
      imageUrl: true,
      sortOrder: true,
    },
  });

  if (facilities.length === 0) return null;

  return (
    <section
      id="facilities"
      className="relative overflow-hidden bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        <div className="mb-12 flex items-center gap-3 md:mb-16">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
            03 / The Facilities
          </p>
        </div>

        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <h2 className="max-w-[620px] font-[var(--font-cormorant)] text-[44px] font-medium leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl">
            Built for the
            <br />
            <span className="text-white/45">
              work of storytelling.
            </span>
          </h2>

          <a
            href="/facilities"
            className="inline-flex w-fit shrink-0 items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
          >
            View All Facilities
            <span className="ml-3">→</span>
          </a>
        </div>

        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <a
              key={facility.id}
              href="/facilities"
              className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-[var(--cinematic-navy)] p-6 md:p-8"
            >
              {facility.imageUrl && (
                <Image
                  src={ facility.imageUrl && isAllowedImageUrl(facility.imageUrl)
                  ? facility.imageUrl : "/homepage/facilities4.jpeg" }
                  alt={facility.name}
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-70"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/50 to-[#020617]/10" />

              <div className="relative">
                <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[var(--orange)]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="font-[var(--font-cormorant)] text-3xl text-white md:text-4xl">
                  {facility.name}
                </h3>

                <p className="mt-3 max-w-[280px] text-sm leading-6 text-white/55">
                  {facility.summary}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
