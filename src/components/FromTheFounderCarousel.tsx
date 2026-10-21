  "use client";

  import { isAllowedImageUrl } from "@/lib/image-url";
  import Image from "next/image";
  import { useEffect, useRef, useState } from "react";


  type FounderQuote = {
    id: string;
    text: string;
    imageUrl: string;
  };

  type FromTheFounderCarouselProps = {
    quotes: FounderQuote[];
  };

  const AUTO_ADVANCE_MS = 7000;

export default function FromTheFounderCarousel({
  quotes,
}: FromTheFounderCarouselProps) {
  const [rawIndex, setRawIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = quotes.length;

  // auto advance every 7 seconds (skipped when there is nothing to rotate)
  useEffect(() => {
    if (paused || count < 2) return;

    timerRef.current = setTimeout(() => {
      setRawIndex((i) => (i >= count - 1 ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [rawIndex, paused, count]);

  // All hooks are above this line; early returns are only safe from here down
  if (count === 0) return null;

  // Keeps the position valid if the list gets shorter
  const index = Math.min(rawIndex, count - 1);

  const goTo = (i: number) => setRawIndex(i);
  const prev = () => goTo(index === 0 ? count - 1 : index - 1);
  const next = () => goTo(index === count - 1 ? 0 : index + 1);

    return (
      <section
        id="founder"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative overflow-hidden bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40"
      >
        {/* Animated background per quote */}
        <div className="absolute inset-0">
          {quotes.map((quote, i) => (
            <div
              key={quote.imageUrl}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={  quote.imageUrl && isAllowedImageUrl(quote.imageUrl)
                ? quote.imageUrl : "/homepage/journal-1.jpg"}
                alt="quote background image"
                fill
                priority={i === 0}
                className={`object-cover transition-transform duration-[7000ms] ease-out ${
                  i === index ? "scale-110" : "scale-100"
                }`}
                sizes="100vw"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-[#020617]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-[#020617]/70" />
        </div>

        <div className="relative mx-auto max-w-[1360px] px-6 md:px-8">

          <div className="mb-16 flex items-center gap-3 md:mb-20">
            <span className="h-2 w-2 bg-[var(--orange)]" />
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
              05 / From The Founder
            </p>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">

            <button
              onClick={prev}
              aria-label="Previous quote"
              className="group order-2 flex items-start gap-4 text-left lg:order-1"
            >
              <span className="mt-1 text-lg text-white/40 transition-colors duration-300 group-hover:text-[var(--orange)]">
                ←
              </span>
              <p className="max-w-[260px] text-sm leading-6 text-white/40 transition-colors duration-300 group-hover:text-white/60">
                {quotes[index === 0 ? quotes.length - 1 : index - 1].text}
              </p>
            </button>

            <div
              key={index}
              className="order-1 flex animate-[founderFadeUp_0.7s_ease-out] flex-col items-center text-center lg:order-2"
            >
              <div className="relative h-44 w-44 overflow-hidden rounded-full border border-white/15 md:h-52 md:w-52">
                <Image
                  src="/homepage/NdumeGreen.jpeg"
                  alt="Mr. Green, Founder"
                  fill
                  className="object-cover"
                  sizes="208px"
                />
              </div>

              <blockquote className="mt-8 max-w-[560px] font-[var(--font-cormorant)] text-3xl font-medium italic leading-[1.3] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-4xl md:text-5xl">
                “{quotes[index].text}”
              </blockquote>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--orange)]">
                Mr. Green
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/50">
                Founder, Capital Film &amp; Creatives Village
              </p>

              <div className="mt-8 flex items-center gap-2">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to quote ${i + 1}`}
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      i === index ? "bg-[var(--orange)]" : "bg-white/25"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={next}
              aria-label="Next quote"
              className="group order-3 flex items-start justify-end gap-4 text-right lg:order-3"
            >
              <p className="max-w-[260px] text-sm leading-6 text-white/40 transition-colors duration-300 group-hover:text-white/60">
                {quotes[index === quotes.length - 1 ? 0 : index + 1].text}
              </p>
              <span className="mt-1 text-lg text-white/40 transition-colors duration-300 group-hover:text-[var(--orange)]">
                →
              </span>
            </button>

          </div>
        </div>
      </section>
    );
  }