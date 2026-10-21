
import Image from "next/image";
import { prisma } from "@/lib/Prisma";

export default async function Journey() {
  const milestones = await prisma.journeyItem.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { title: "asc" },
    ],
    take: 6,
    select: {
      id: true,
      title: true,
      description: true,
      summary: true,
      imageUrl: true,
      dateLabel: true,
      sortOrder: true,
    },
  });

  if (milestones.length === 0) return null;

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-3 md:mb-16">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
            08 / The Journey
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-16 grid gap-7 md:mb-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              Every vision has a journey
            </p>

            <h2 className="max-w-[850px] font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
              From vision
              <br />
              <span className="text-white/40">to reality.</span>
            </h2>
          </div>

          <p className="max-w-[440px] text-sm leading-7 text-white/55 md:text-base md:leading-8 lg:col-span-4 lg:justify-self-end">
            Every step contributes to a bigger story. Follow the
            milestones, people and moments shaping the development
            of Capital Film & Creatives Village.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-0 w-px bg-white/15 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-14 md:space-y-20">
            {milestones.map((milestone, index) => {
              const number = String(index + 1).padStart(2, "0");
              const description =
                milestone.description || milestone.summary;

              return (
                <article
                  key={milestone.id}
                  className="relative grid grid-cols-[16px_1fr] gap-5 md:grid-cols-2 md:gap-12"
                >
                  {/* Timeline marker */}
                  <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-span-2 md:row-start-1">
                    <span className="mt-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--orange)] bg-[var(--cinematic-navy)] md:absolute md:left-1/2 md:-translate-x-1/2" />
                  </div>

                  {/* Milestone content */}
                  <div
                    className={`col-start-2 row-start-1 pb-2 md:row-start-1 ${
                      index % 2 === 0
                        ? "md:col-start-1 md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--orange)] md:text-[10px]">
                      {number} / {milestone.dateLabel || "JOURNEY MILESTONE"}
                    </p>

                    <h3 className="mt-4 font-[var(--font-cormorant)] text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
                      {milestone.title}
                    </h3>

                    {description && (
                      <p
                        className={`mt-4 max-w-[480px] text-sm leading-7 text-white/55 md:text-base ${
                          index % 2 === 0 ? "md:ml-auto" : ""
                        }`}
                      >
                        {description}
                      </p>
                    )}
                  </div>

                  {/* Milestone image */}
                  <div
                    className={`col-start-2 row-start-2 md:row-start-1 ${
                      index % 2 === 0
                        ? "md:col-start-2 md:pl-12"
                        : "md:col-start-1 md:pr-12"
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface)]">
                      {milestone.imageUrl ? (
                        <Image
                          src={milestone.imageUrl}
                          alt={`Image illustrating ${milestone.title}`}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 45vw"
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          aria-hidden="true"
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* View the full journey */}
        <div className="mt-16 border-t border-white/10 pt-8 md:mt-24">
          <a
            href="/journey"
            className="inline-flex items-center gap-3 border-b border-white/30 pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
          >
            Follow the Journey
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
