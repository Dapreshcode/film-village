import Image from "next/image";

export default function Village() {
  return (
    <section
      id="village"
      className="relative overflow-hidden bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">

        {/* Section heading */}
        <div className="mb-12 flex items-center gap-3 md:mb-16">
          <span className="h-2 w-2 bg-[var(--orange)]" />

          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
            02 / The Village
          </p>
        </div>

        {/* Main visual */}
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[16/9]">

          <Image
            src="/homepage/the-village-1.jpeg"
            alt="Capital Film & Creatives Village"
            fill
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 90vw"
          />

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/40 to-[#020617]/10" />

          {/* Content over image */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">

            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              A creative ecosystem
            </p>

            <h2 className="max-w-[760px] font-[var(--font-cormorant)] text-[52px] font-medium leading-[0.9] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl lg:text-[92px]">
              More Than
              <br />
              a Film Studio.
            </h2>

            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">

              <p className="max-w-[520px] text-sm leading-6 text-white/65 md:text-base md:leading-7">
                A purpose-built environment where production,
                learning and collaboration come together to create
                new possibilities for African storytellers.
              </p>

              <a
                href="/village"
                className="inline-flex w-fit shrink-0 items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
              >
                Explore the Village
                <span className="ml-3">→</span>
              </a>

            </div>
          </div>
        </div>

        {/* Three pillars */}
        <div className="mt-10 grid border-t border-white/10 md:grid-cols-3">

          <div className="border-b border-white/10 py-7 md:border-b-0 md:border-r md:pr-8">
            <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[var(--orange)]">
              01
            </p>

            <h3 className="font-[var(--font-cormorant)] text-3xl text-white md:text-4xl">
              Production
            </h3>

            <p className="mt-3 max-w-[340px] text-sm leading-6 text-white/45">
              Spaces and resources designed to support the creation
              of high-quality film, media and digital content.
            </p>
          </div>

          <div className="border-b border-white/10 py-7 md:border-b-0 md:border-r md:px-8">
            <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[var(--orange)]">
              02
            </p>

            <h3 className="font-[var(--font-cormorant)] text-3xl text-white md:text-4xl">
              Learning
            </h3>

            <p className="mt-3 max-w-[340px] text-sm leading-6 text-white/45">
              An environment for developing the skills and talent
              needed to shape the next generation of storytellers.
            </p>
          </div>

          <div className="py-7 md:pl-8">
            <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[var(--orange)]">
              03
            </p>

            <h3 className="font-[var(--font-cormorant)] text-3xl text-white md:text-4xl">
              Collaboration
            </h3>

            <p className="mt-3 max-w-[340px] text-sm leading-6 text-white/45">
              Bringing creatives, industry professionals, partners
              and ideas together within one ecosystem.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}