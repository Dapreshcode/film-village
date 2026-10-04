
import Image from "next/image";

const updates = [
  {
    category: "Project Update",
    date: "Latest Update",
    title: "The journey of building the Village continues",
    image: "/homepage/journal-1.jpeg",
  },
  {
    category: "Community",
    date: "From the Village",
    title: "Creating new possibilities for African creatives",
    image: "/homepage/journal-2.jpeg",
  },
];

export default function Journal() {
  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-3 md:mb-16">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
            09 / The Journal
          </p>
        </div>

        {/* Heading */}
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

          <a
            href="/journal"
            className="inline-flex w-fit items-center gap-3 border-b border-white/30 pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
          >
            Visit the Journal <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Updates */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Featured update */}
          <a
            href="/journal"
            className="group lg:col-span-7"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--cinematic-navy)]">
              <Image
                src="/homepage/journal-featured.jpeg"
                alt="Featured Capital Film and Creatives Village update"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />

              <span className="absolute bottom-5 left-5 border border-white/30 px-3 py-2 text-[9px] uppercase tracking-[0.14em] text-white md:bottom-7 md:left-7">
                Featured update
              </span>
            </div>

            <div className="mt-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[var(--orange)]">
                CFCV Journal · Project Update
              </p>

              <h3 className="mt-3 max-w-[650px] font-[var(--font-cormorant)] text-3xl font-medium leading-tight text-white transition-colors group-hover:text-white/75 sm:text-4xl md:text-5xl">
                Documenting the journey of building a creative future
              </h3>

              <p className="mt-4 max-w-[580px] text-sm leading-7 text-white/50">
                Follow the developments, decisions and moments shaping
                the journey of Capital Film & Creatives Village.
              </p>
            </div>
          </a>

          {/* Smaller updates */}
          <div className="flex flex-col divide-y divide-white/10 border-t border-white/10 lg:col-span-5 lg:border-t-0">
            {updates.map((update) => (
              <a
                href="/journal"
                key={update.title}
                className="group flex gap-5 py-6 first:pt-0 md:gap-6 md:py-8"
              >
                <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden bg-[var(--cinematic-navy)] sm:w-36">
                  <Image
                    src={update.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="144px"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--orange)]">
                    {update.category}
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-white/35">
                    {update.date}
                  </p>

                  <h3 className="mt-3 font-[var(--font-cormorant)] text-2xl leading-tight text-white transition-colors group-hover:text-white/70 md:text-3xl">
                    {update.title}
                  </h3>

                  <span className="mt-4 text-sm text-white/50 transition-colors group-hover:text-[var(--orange)]">
                    Read update →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}