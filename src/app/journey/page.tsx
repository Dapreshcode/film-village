  import { isAllowedImageUrl } from "@/lib/image-url";
import { prisma } from "@/lib/Prisma";
  import Image from "next/image";
  import Link from "next/link";

  const statusLabels = {
    COMPLETED: "Completed",
    IN_PROGRESS: "In Progress",
    UPCOMING: "Upcoming",
  } as const;

  export default async function Journey() {
    const records = await prisma.journeyItem.findMany({
      where: { published: true },
        orderBy: [
    { sortOrder: "asc" },
    { title: "asc" },
  ],
     
    });
  
    const journeyItems = records.map((journeyItem) => ({
      id: journeyItem.id,
      slug: journeyItem.slug,
      number: String(journeyItem.sortOrder + 1).padStart(2, "0"),
      title: journeyItem.title,
      description:  journeyItem.description ?? journeyItem.summary,
      summary: journeyItem.summary,
      image:  journeyItem.imageUrl && isAllowedImageUrl(journeyItem.imageUrl)
          ? journeyItem.imageUrl : "/homepage/journey1.jpeg",
      status: statusLabels[journeyItem.status],
    }));

  const statusStyles = {
    Completed: "text-emerald-300/70",
    "In Progress": "text-[var(--orange)]",
    Upcoming: "text-white/40",
  };

  return(
  <main className="bg-[var(--cinematic-navy)] text-white">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/10 pt-36 pb-24 md:pt-44 md:pb-32">
          <div className="mx-auto max-w-[1360px] px-6 md:px-8">
            <div className="max-w-5xl">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-2 w-2 bg-[var(--orange)]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
                  The Journey
                </p>
              </div>

              <h1 className="font-[var(--font-cormorant)] text-6xl font-medium leading-[0.9] tracking-[-0.025em] sm:text-7xl md:text-8xl lg:text-[110px]">
                From vision
                <br />
                <span className="text-white/35">to reality.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                The Village is more than a destination. It is an evolving
                journey of building spaces, developing people and creating new
                possibilities for African storytelling.
              </p>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1360px] px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[var(--orange)]" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                    A Living Project
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <p className="font-[var(--font-cormorant)] text-3xl leading-[1.15] text-white/90 md:text-4xl">
                  The Village will continue to evolve as new spaces are built,
                  new people join the community and new stories are created.
                </p>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
                  This page will eventually become a living record of that
                  progress — documenting milestones, developments, programmes,
                  partnerships and moments along the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY TIMELINE */}
        <section className="border-t border-white/10 py-24 md:py-32">
          <div className="mx-auto max-w-[1360px] px-6 md:px-8">
            <div className="mb-16 md:mb-20">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                The Path
              </p>

              <h2 className="mt-5 font-[var(--font-cormorant)] text-5xl font-medium leading-none md:text-6xl">
                Building step by step.
              </h2>
            </div>

            <div className="relative">
              {/* Desktop timeline line */}
              <div className="absolute left-[39px] top-0 hidden h-full w-px bg-white/10 md:block" />

              <div className="space-y-20 md:space-y-28">
                {journeyItems.map((item) => (
                  <article
                    key={item.id}
                    className="relative grid gap-10 md:grid-cols-[80px_1fr] md:gap-8"
                  >
                    {/* Number */}
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center bg-[var(--cinematic-navy)]">
                      <div className="flex h-14 w-14 items-center justify-center border border-white/15 text-[11px] font-semibold tracking-[0.12em] text-white/60">
                        {item.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                      <div className="lg:col-span-5">
                        <div className="flex items-center gap-3">
                          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/35">
                            {item.summary}
                          </p>

                          <span className="h-px w-5 bg-white/15" />

                          <p
                            className={`text-[9px] font-medium uppercase tracking-[0.16em] ${statusStyles[item.status]}`}
                          >
                            {item.status}
                          </p>
                        </div>

                        <h3 className="mt-5 font-[var(--font-cormorant)] text-4xl font-medium leading-[0.98] md:text-5xl">
                          {item.title}
                        </h3>

                        <p className="mt-6 max-w-lg text-sm leading-7 text-white/50">
                          {item.description}
                        </p>
                      </div>

                      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface)] lg:col-span-7">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHAT COMES NEXT */}
        <section className="border-t border-white/10 py-24 md:py-32">
          <div className="mx-auto max-w-[1360px] px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                  What Comes Next
                </p>

                <h2 className="mt-6 max-w-4xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] md:text-7xl">
                  The story is still
                  <br />
                  <span className="text-white/35">being written.</span>
                </h2>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-sm leading-7 text-white/50 md:text-base">
                  As the Village develops, this timeline will grow with it.
                  Future updates will capture milestones, developments,
                  programmes, partnerships and other important moments.
                </p>

                <Link
                  href="/journal"
                  className="mt-8 inline-flex items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
                >
                  Read the Journal
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
                  Explore the Village
                </p>

                <h2 className="mt-3 font-[var(--font-cormorant)] text-3xl md:text-4xl">
                  See what is being built.
                </h2>
              </div>

              <Link
                href="/facilities"
                className="inline-flex w-fit items-center border border-white/20 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
              >
                Explore Facilities
                <span className="ml-4">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
  )
  }
