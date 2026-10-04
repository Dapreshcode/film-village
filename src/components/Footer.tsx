
import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "The Village", href: "/village" },
  { label: "Facilities", href: "/facilities" },
  { label: "Academy", href: "/academy" },
  { label: "Stories", href: "/stories" },
  { label: "Journal", href: "/journal" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--cinematic-navy)]">
      <div className="mx-auto max-w-[1360px] px-6 py-12 md:px-8 md:py-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex flex-col">
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-white">
                CFCV
              </span>
              <span className="mt-2 text-[9px] uppercase tracking-[0.14em] text-white/45">
                Capital Film & Creatives Village
              </span>
            </Link>

            <p className="mt-6 max-w-[340px] text-sm leading-7 text-white/45">
              A creative ecosystem for African storytelling, filmmaking
              and the development of creative talent.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4">
            <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
              Explore
            </p>

            <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-xs text-white/65 transition-colors duration-300 hover:text-[var(--orange)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
              Get in Touch
            </p>

            <Link
              href="/partner"
              className="inline-flex items-center gap-3 text-xs text-white/65 transition-colors duration-300 hover:text-[var(--orange)]"
            >
              Partnership Enquiries <span aria-hidden="true">↗</span>
            </Link>

            <p className="mt-4 text-xs leading-6 text-white/40">
              Saakpenwa, Tai LGA
              <br />
              Rivers State, Nigeria
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.12em] text-white/30 sm:flex-row sm:items-center sm:justify-between md:mt-16">
          <p>
            © {new Date().getFullYear()} Capital Film & Creatives Village.
            All rights reserved.
          </p>

          <Link
            href="/"
            className="w-fit transition-colors hover:text-white/70"
          >
            Back to Top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}