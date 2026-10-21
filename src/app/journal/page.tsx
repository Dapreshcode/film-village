
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { isAllowedImageUrl } from "@/lib/image-url";

const categoryStyles: Record<string, string> = {
  Vision: "text-[var(--orange)]",
  "The Village": "text-white/60",
  People: "text-white/60",
  "Behind the Scenes": "text-white/60",
};

export default async function JournalPage() {
  const records = await prisma.journalEntry.findMany({
    where: { published: true },
    orderBy: [
      { featured: "desc" },
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
  });

  const journalEntries = records.map((entry) => ({
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt,
    category: entry.category,
    date: entry.dateLabel ?? "Coming Soon",
     image:  entry.imageUrl && isAllowedImageUrl(entry.imageUrl)
    ? entry.imageUrl : "/homepage/journal-1.jpg",
    featured: entry.featured,
  }));

  const featuredEntry = journalEntries.find((entry) => entry.featured);
  const otherEntries = journalEntries.filter((entry) => !entry.featured);
    
   
    
  return (
    <main className="bg-[var(--cinematic-navy)] text-white">
      {/* HERO */}
      <section className="overflow-hidden border-b border-white/10 pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="max-w-5xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2 w-2 bg-[var(--orange)]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
                The Journal
              </p>
            </div>

            <h1 className="font-[var(--font-cormorant)] text-6xl font-medium leading-[0.9] tracking-[-0.025em] sm:text-7xl md:text-8xl lg:text-[110px]">
              Notes from
              <br />
              <span className="text-white/35">the journey.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              Updates, reflections, conversations and moments from the people
              building Capital Film & Creatives Village.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featuredEntry && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1360px] px-6 md:px-8">
            <div className="mb-10 flex items-center gap-3">
              <span className="h-2 w-2 bg-[var(--orange)]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                Latest Entry
              </p>
            </div>

            <Link
              href={`/journal/${featuredEntry.slug}`}
              className="group grid border border-white/10 bg-[var(--surface)] lg:grid-cols-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[520px]">
                <Image
                  src={featuredEntry.image}
                  alt={featuredEntry.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-between p-8 md:p-12 lg:col-span-5 lg:p-14">
                <div>
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.16em]">
                    <span className={categoryStyles[featuredEntry.category] ?? "text-white/60"}>
                      {featuredEntry.category}
                    </span>
                    <span className="h-px w-8 bg-white/20" />
                    <span className="text-white/35">{featuredEntry.date}</span>
                  </div>

                  <h2 className="mt-8 font-[var(--font-cormorant)] text-4xl font-medium leading-[0.98] md:text-5xl lg:text-6xl">
                    {featuredEntry.title}
                  </h2>

                  <p className="mt-7 max-w-lg text-sm leading-7 text-white/55 md:text-base">
                    {featuredEntry.excerpt}
                  </p>
                </div>

                <div className="mt-12 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 group-hover:text-[var(--orange)]">
                  Read Journal Entry →
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ENTRIES */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                Field Notes
              </p>
              <h2 className="mt-4 font-[var(--font-cormorant)] text-5xl font-medium leading-none md:text-6xl">
                Recent entries.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/40">
              The journal will grow alongside the Village, documenting the
              moments that shape its development.
            </p>
          </div>

          {otherEntries.length > 0 ? (
            <div className="divide-y divide-white/10 border-y border-white/10">
              {otherEntries.map((entry, index) => (
                <Link
                  key={entry.id}
                  href={`/journal/${entry.slug}`}
                  className="group grid gap-8 py-10 md:grid-cols-[90px_260px_1fr] md:items-center md:gap-10"
                >
                  <div className="font-[var(--font-cormorant)] text-3xl text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 260px"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-[9px] font-medium uppercase tracking-[0.16em]">
                      <span className={categoryStyles[entry.category] ?? "text-white/60"}>
                        {entry.category}
                      </span>
                      <span className="h-px w-5 bg-white/15" />
                      <span className="text-white/30">{entry.date}</span>
                    </div>

                    <h3 className="mt-4 max-w-2xl font-[var(--font-cormorant)] text-3xl font-medium leading-none transition-colors duration-300 group-hover:text-[var(--orange)] md:text-4xl">
                      {entry.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
                      {entry.excerpt}
                    </p>

                    <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
                      Read Entry →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="border-y border-white/10 py-10 text-sm leading-7 text-white/45">
              Journal entries will appear here as updates are published.
            </p>
          )}
        </div>
      </section>

      {/* FOUNDER JOURNAL */}
      <section className="border-t border-white/10 bg-[var(--surface)] py-24 md:py-32">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                From the Founder
              </p>
              <h2 className="mt-6 max-w-4xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] md:text-7xl">
                A vision is only
                <br />
                <span className="text-white/35">the beginning.</span>
              </h2>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-sm leading-7 text-white/50 md:text-base">
                The Journal can also become a space for the founder's
                thoughts, reflections and perspectives as the Village develops.
              </p>

              <Link
                href="/#from-the-founder"
                className="mt-8 inline-flex items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
              >
                From the Founder
                <span className="ml-3">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                Keep Following
              </p>
              <h2 className="mt-3 font-[var(--font-cormorant)] text-3xl md:text-4xl">
                The journey continues.
              </h2>
            </div>

            <Link
              href="/journey"
              className="inline-flex w-fit items-center border border-white/20 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
            >
              Explore the Journey
              <span className="ml-4">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
