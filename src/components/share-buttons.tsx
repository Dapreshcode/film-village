"use client";

import { useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export default function ShareButtons({
  path,
  title,
}: {
  path: string; // e.g. /stories/my-story
  title: string;
}) {
  const url = `${SITE_URL}${path}`;
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator !== "undefined" && "share" in navigator,
    () => false,
  );

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "X", href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  const item =
    "border-b border-white/30 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]";

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
        Share
      </span>

      {canNativeShare && (
        <button
          type="button"
          className={item}
          onClick={() => navigator.share({ title, url }).catch(() => {})}
        >
          Share…
        </button>
      )}

      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={item}>
          {l.label}
        </a>
      ))}

      <button type="button" className={item} onClick={copy}>
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}