
export default function PartnerWithUs() {
  return (
    <section
      id="partner"
      className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32 lg:py-40"
    >
      {/* Subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(244,122,32,0.10),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1360px] px-6 md:px-8">
        <div className="border-y border-white/15 py-16 md:py-24 lg:py-28">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 bg-[var(--orange)]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
              10 / Partner With Us
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                Be part of the story
              </p>

              <h2 className="max-w-[900px] font-[var(--font-cormorant)] text-5xl font-medium leading-[0.93] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl lg:text-[92px]">
                The future of African storytelling is{" "}
                <span className="text-white/40">a shared vision.</span>
              </h2>

              <p className="mt-7 max-w-[580px] text-sm leading-7 text-white/55 md:text-base md:leading-8">
                We welcome conversations with people and organisations
                who share an interest in creative development, African
                storytelling, filmmaking and the future of the creative
                industry.
              </p>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <a
                href="/partner"
                className="group inline-flex items-center gap-5 border border-white/25 px-6 py-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:bg-[var(--orange)] hover:text-[#020617] md:px-7"
              >
                Start a Conversation
                <span
                  aria-hidden="true"
                  className="text-base transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[9px] uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>Capital Film & Creatives Village</span>
          <span>Saakpenwa · Rivers State · Nigeria</span>
        </div>
      </div>
    </section>
  );
}