
import Link from "next/link";

export default function AcademyPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--cinematic-navy)] text-white">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(244,122,32,0.10),transparent_45%)]"
      />

      {/* Minimal header */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-6 md:px-10">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.2em]"
        >
          CFCV
        </Link>

        <Link
          href="/"
          className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
        >
          Back to Home <span className="ml-2">↗</span>
        </Link>
      </header>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 flex-col justify-center px-6 py-24 md:px-10 md:py-32">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
            Capital Film & Creatives Village
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-cormorant)] text-6xl font-medium leading-[0.9] tracking-[-0.035em] sm:text-7xl md:text-8xl lg:text-[112px]">
          The future of
          <br />
          creative learning
          <br />
          <span className="text-white/35">is taking shape.</span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-[540px] text-sm leading-7 text-white/60 md:col-span-7 md:text-base md:leading-8">
            We are developing a space dedicated to the next generation
            of African storytellers and creative talent. More about the
            Academy, its learning opportunities and its programmes will
            be shared as the vision takes shape.
          </p>

          <div className="md:col-span-5 md:flex md:justify-end">
            <span className="inline-flex items-center gap-3 border border-white/15 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--orange)]" />
              Academy · Coming Soon
            </span>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 md:mt-24">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-[var(--orange)]"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Explore the Village
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col gap-2 border-t border-white/10 px-6 py-5 text-[9px] uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span>Capital Film & Creatives Village</span>
        <span>Saakpenwa · Rivers State · Nigeria</span>
      </footer>
    </main>
  );
}