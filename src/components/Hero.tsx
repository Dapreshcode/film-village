  export default function Hero() {
    return (
      <section
        id="home"
        className="relative flex min-h-screen items-end overflow-hidden bg-[var(--cinematic-navy)]"
      >
        
        <div className="absolute inset-0">
          <div
    className="hero-image h-full w-full bg-cover bg-center"
    style={{
      backgroundImage: "url('/homepage/hero-film-village.jpg')",
    }}
  />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-[#020617]/65 to-[#020617]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-[#020617]/30 to-[#020617]/45" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 pb-20 md:px-8 md:pb-24 lg:pb-28">
          
          {/* Location */}
          <div className="hero-fade-up hero-delay-2 mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[var(--orange)]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 md:text-[11px]">
              Saakpenwa · Rivers State · Nigeria
            </p>
          </div>

          {/* Main heading */}
        <h1 className="hero-fade-up hero-delay-0.5 max-w-[1000px] font-[var(--font-cormorant)] text-[52px] font-medium leading-[0.9] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
            Where African Stories
            <br />
            Come to Life.
          </h1>

          {/* Description */}
        <p className="hero-fade-up hero-delay-3 mt-7 max-w-[580px] text-sm leading-6 text-white/65 md:mt-8 md:text-base md:leading-7">
            A purpose-built creative ecosystem where filmmakers,
            storytellers and emerging talents can create, learn and
            bring African stories to the world.
          </p>

          {/* CTA */}
          <div className="hero-fade-up hero-delay-4 mt-8 flex flex-col gap-5 sm:flex-row sm:items-center md:mt-10">
            <a
              href="#village"
              className="inline-flex w-fit items-center bg-[var(--orange)] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[#020617] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore the Village
              <span className="ml-3">→</span>
            </a>

            <a
              href="/vision"
              className="inline-flex w-fit items-center text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:text-[var(--orange)]"
            >
              Our Vision
              <span className="ml-3">→</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 md:flex">
          <span className="text-[9px] uppercase tracking-[0.18em] text-white/40">
            Scroll
          </span>

          <span className="h-10 w-px bg-white/25" />
        </div>
      </section>
    );
  }