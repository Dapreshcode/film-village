import Link from "next/link";

export default function ContentNotFound({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <main className="bg-[var(--cinematic-navy)] text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-[1360px] flex-col justify-center px-6 pb-24 pt-36 md:px-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
            Not available
          </p>
        </div>
        <h1 className="max-w-3xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 md:text-base">
          {description}
        </p>
        <Link
          href={href}
          className="mt-10 inline-flex w-fit items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
        >
          {linkLabel}
          <span className="ml-3">→</span>
        </Link>
      </section>
    </main>
  );
}