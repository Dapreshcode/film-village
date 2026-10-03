import Image from "next/image";

const learningPillars = [
  {
    number: "01",
    title: "Learn",
    description: "Build the knowledge behind creative storytelling.",
  },
  {
    number: "02",
    title: "Practise",
    description: "Develop skills through practical creative work.",
  },
  {
    number: "03",
    title: "Create",
    description: "Turn ideas into stories that can reach the world.",
  },
];

export default function Academy() {
  return (
    <section
      id="academy"
      className="relative overflow-hidden bg-[var(--surface)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        {/* Section label */}
        <div className="mb-12 flex items-center gap-3 md:mb-16">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
            05 / The Academy
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Image */}
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cinematic-navy)] md:aspect-[5/4]">
              <Image
                src="/homepage/Academy-homepage.jpeg"
                alt="Creative media training and filmmaking education"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />

              <p className="absolute bottom-5 left-5 text-[9px] font-medium uppercase tracking-[0.18em] text-white/75 md:bottom-7 md:left-7">
                Knowledge · Practice · Possibility
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-6 lg:pl-4">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              Developing creative talent
            </p>

            <h2 className="max-w-[650px] font-[var(--font-cormorant)] text-[46px] font-medium leading-[0.98] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl">
              The next generation of African storytellers{" "}
              <span className="text-white/45">starts here.</span>
            </h2>

            <p className="mt-7 max-w-[560px] text-sm leading-7 text-white/60 md:text-base md:leading-8">
              A creative ecosystem needs more than production spaces. It needs
              people with the skills, knowledge and imagination to tell
              meaningful stories. The CFCV Academy represents that commitment
              to learning, creative development and the future of African media.
            </p>

            {/* Learning themes */}
            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {learningPillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="flex gap-5 py-5 md:gap-7"
                >
                  <span className="pt-1 text-[10px] tracking-wider text-[var(--orange)]">
                    {pillar.number}
                  </span>

                  <div>
                    <h3 className="font-[var(--font-cormorant)] text-2xl text-white md:text-3xl">
                      {pillar.title}
                    </h3>

                    <p className="mt-1 text-xs leading-6 text-white/50 md:text-sm">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/academy"
              className="mt-9 inline-flex items-center gap-3 border-b border-white/30 pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
            >
              Discover the Academy
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}