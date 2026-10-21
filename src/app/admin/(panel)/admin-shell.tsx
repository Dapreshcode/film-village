"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./sign-out-button";

type NavItem = { href: string; label: string };

export default function AdminShell({
  email,
  nav,
  children,
}: {
  email: string;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-black/10 px-4 py-3 md:hidden">
        <span className="text-sm font-semibold">CFCV Admin</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="rounded border px-3 py-1.5 text-sm"
        >
          Menu
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto border-r bg-[var(--cinematic-navy)] p-4 transition-transform md:static md:z-auto md:w-60 md:shrink-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold">CFCV Admin</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-sm md:hidden"
          >
            Close
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`rounded px-3 py-2 text-sm hover:bg-black/5 ${
                isActive(item.href) ? "bg-black/10 font-medium" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 text-xs opacity-70">
          <p className="mb-2 truncate">{email}</p>
          <SignOutButton />
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}