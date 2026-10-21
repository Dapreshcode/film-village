
import Image from "next/image";
import { prisma } from "@/lib/Prisma";
import Link from "next/link";

export default async function Journal() {
  const entries = await prisma.journalEntry.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
    take: 3,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      dateLabel: true,
      imageUrl: true,
    },
  });

  if (entries.length === 0) return null;

  const [featuredEntry, ...otherEntries] = entries;

  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        <div className="mb-12 flex items-center gap-3 md:mb-16">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
            09 / The Journal
          </p>
        </div>

        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              Notes from the journey
            </p>

            <h2 className="font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl lg:text-[80px]">
              The latest
              <br />
              <span className="text-white/40">from CFCV.</span>
            </h2>
          </div>

          <Link
            href="/journal"
            className="inline-flex w-fit items-center gap-3 border-b border-white/30 pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
          >
            Visit the Journal <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Featured journal entry */}
          <Link
            href={`/journal/${featuredEntry.slug}`}
            className="group lg:col-span-7"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--cinematic-navy)]">
              {featuredEntry.imageUrl && (
                <Image
                  src={featuredEntry.imageUrl}
                  alt={featuredEntry.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />

              <span className="absolute bottom-5 left-5 border border-white/30 px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-white md:bottom-7 md:left-7">
                Featured update
              </span>
            </div>

            <div className="mt-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--orange)]">
                CFCV Journal · {featuredEntry.category}
              </p>

              <h3 className="mt-3 max-w-[650px] font-[var(--font-cormorant)] text-3xl font-medium leading-tight text-white transition-colors group-hover:text-white/75 sm:text-4xl md:text-5xl">
                {featuredEntry.title}
              </h3>

              <p className="mt-4 max-w-[580px] text-sm leading-7 text-white/50">
                {featuredEntry.excerpt}
              </p>
            </div>
          </Link>

          {/* Smaller journal entries */}
          <div className="flex flex-col divide-y divide-white/10 border-t border-white/10 lg:col-span-5 lg:border-t-0">
            {otherEntries.map((entry) => (
              <Link
                href={`/journal/${entry.slug}`}
                key={entry.id}
                className="group flex gap-5 py-6 first:pt-0 md:gap-6 md:py-8"
              >
                <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden bg-[var(--cinematic-navy)] sm:w-36">
                  {entry.imageUrl && (
                    <Image
                      src={entry.imageUrl}
                      alt={entry.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="144px"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--orange)]">
                    {entry.category}
                  </p>

                  {entry.dateLabel && (
                    <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-white/35">
                      {entry.dateLabel}
                    </p>
                  )}

                  <h3 className="mt-3 font-[var(--font-cormorant)] text-2xl leading-tight text-white transition-colors group-hover:text-white/70 md:text-3xl">
                    {entry.title}
                  </h3>

                  <span className="mt-4 text-sm text-white/50 transition-colors group-hover:text-[var(--orange)]">
                    Read update →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
