import Image from "next/image";

export default function Vision() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px]  min-h-[400px] max-h-[560px] px-6 md:px-8">

        {/* Section heading */}
        <div className="mb-16 flex items-center gap-3 md:mb-20">
          <span className="h-2 w-2 bg-[var(--orange)]" />

          <p className="text-[6px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[8px]">
            01 / The Vision
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">

          {/* Text */}
          <div className="lg:col-span-5">

            <h2 className="max-w-[650px] font-[var(--font-cormorant)] text-[48px] font-medium leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl">
              Africa has the stories.
              <br />
              <span className="text-white/45">
                We are building the place to tell them.
              </span>
            </h2>

            <div className="mt-8 max-w-[560px] space-y-5 text-sm leading-7 text-white/60 md:mt-10 md:text-base">
              <p>
                Capital Film & Creatives Village is being developed in
                Saakpenwa, Tai LGA, as a purpose-built creative ecosystem
                for African storytelling.
              </p>

              <p>
                It is envisioned as a place where filmmakers, journalists,
                photographers, digital creators and emerging talents can
                create, learn, collaborate and bring their stories to the
                world.
              </p>
            </div>

            {/* CTA */}
            <a
              href="/about"
              className="mt-9 inline-flex items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
            >
              Discover Our Vision
              <span className="ml-3">→</span>
            </a>
          </div>

          {/* Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)] md:aspect-[16/10]">

              <Image
                src="/homepage/vision.jpg"
                alt="Capital Film & Creatives Village"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Cinematic image treatment */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent" />

            </div>

            {/* Image caption */}
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <p className="text-[9px] uppercase tracking-[0.16em] text-white/35">
                Saakpenwa · Tai LGA
              </p>

              <p className="text-[9px] uppercase tracking-[0.16em] text-white/25">
                Rivers State · Nigeria
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}