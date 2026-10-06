"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const activities = [
  {
    number: "01",
    title: "Learn",
    description:
      "Classroom and workshop sessions building the foundations of storytelling, media theory and craft.",
    image: "/homepage/academy1.jpeg",
  },
  {
    number: "02",
    title: "Practise",
    description:
      "Hands-on studio time — cameras, sound, editing and real production gear used under guidance.",
    image: "/homepage/the-village-1.jpeg",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Trainees move from exercises to original work — short films, pieces and projects of their own.",
    image: "/homepage/story-2.jpeg",
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function Academy() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    

    timerRef.current = setTimeout(() => {
      setPrevIndex(index);
      setIndex((i) => (i === activities.length - 1 ? 0 : i + 1));
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index]);

  const goTo = (i: number) => {
    setPrevIndex(index);
    setIndex(i);
  };

  return (
    <section
      id="academy"
     
      className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">

        {/* Section label */}
        <div className="mb-8 flex items-center gap-3 md:mb-10">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[6px] font-medium uppercase tracking-[0.16em] text-white/50 md:text-[8px]">
            05 / The Academy
          </p>
        </div>

        {/* Trimmed intro — single line, no side paragraph */}
        <h2 className="mb-10 max-w-[720px] font-[var(--font-cormorant)] text-[36px] font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl md:mb-14 md:text-6xl">
          The next generation of African storytellers{" "}
          <span className="text-white/45">starts here.</span>
        </h2>

        {/* Full-size auto-cycling card stage — fixed viewport-relative height, not aspect ratio */}
        <div className="relative h-[56vh] min-h-[380px] max-h-[560px] lg:min-h-[600px] overflow-hidden">
          {activities.map((activity, i) => {
            const isActive = i === index;
            const isExiting = i === prevIndex;

            return (
              <div
                key={activity.number}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  isActive
                    ? "z-20 translate-y-0 opacity-100"
                    : isExiting
                    ? "z-10 -translate-y-10 opacity-0"
                    : "z-0 translate-y-full opacity-0"
                }`}
              >
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1360px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/35 to-[#020617]/10" />

                {isActive && (
                  <div
                    key={`text-${index}`}
                    className="absolute inset-x-0 bottom-0 animate-[academyTextUp_0.8s_ease-out] p-6 md:p-10"
                  >
                    <span className="text-[10px] tracking-wider text-[var(--orange)]">
                      {activity.number}
                    </span>

                    <h3 className="mt-2 font-[var(--font-cormorant)] text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl">
                      {activity.title}
                    </h3>

                    <p className="mt-3 max-w-[440px] text-sm leading-6 text-white/65 md:text-base">
                      {activity.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Indicators */}
          <div className="absolute right-5 top-5 z-30 flex items-center gap-2 md:right-8 md:top-8">
            {activities.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show ${activities[i].title}`}
                className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                  i === index ? "bg-[var(--orange)]" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Prominent CTA band */}
        <a
          href="/academy"
          className="group mt-8 flex items-center justify-between border border-white/15 px-7 py-6 transition-colors duration-300 hover:border-[var(--orange)] hover:bg-white/[0.03] md:mt-10 md:px-10 md:py-8"
        >
          <span className="font-[var(--font-cormorant)] text-2xl text-white md:text-3xl">
            Discover the Academy
          </span>

          <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--orange)]">
            Explore Programs
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </span>
        </a>

      </div>
    </section>
  );
}