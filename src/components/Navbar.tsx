"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
  { label: "About", href: "/about" },
  { label: "The Village", href: "#village" },
  { label: "Facilities", href: "#facilities" },
  { label: "Academy", href: "#academy" },
  { label: "Stories", href: "#stories" },
  { label: "Journal", href: "#journal" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    
    <header className="absolute top-0 left-0 z-50 w-full bg-[var(--cinematic-navy)]/0 transition-colors duration-300">
      
      <nav className="mx-auto flex h-20 max-w-[1360px] items-center justify-between px-6 md:h-[88px] md:px-8">
      
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center border border-white/20 text-xs font-bold tracking-widest text-white">
              CFCV
            </div>

            <div className="hidden leading-none sm:block">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-white">
                CAPITAL FILM
              </p>

              <p className="mt-1 text-[9px] tracking-[0.18em] text-white/60">
                & CREATIVES VILLAGE
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/80 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="#partner"
            className="ml-3 bg-[var(--orange)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#020617] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Partner With Us
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-end justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "translate-y-[4px] -rotate-45" : ""
            }`}
          />

          <span
            className={`block h-px bg-white transition-all duration-300 ${
              menuOpen ? "w-6 -translate-y-[3px] rotate-45" : "w-4"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--cinematic-navy)] transition-all duration-500 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex min-h-screen flex-col justify-center px-6">
          <div className="space-y-6">
            {navigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block font-[var(--font-cormorant)] text-4xl text-white transition-colors duration-300 hover:text-[var(--orange)]"
                style={{
                  transitionDelay: menuOpen
                    ? `${index * 50}ms`
                    : "0ms",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="#partner"
            onClick={() => setMenuOpen(false)}
            className="mt-12 inline-flex w-fit bg-[var(--orange)] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-[#020617]"
          >
            Partner With Us
            <span className="ml-3">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}