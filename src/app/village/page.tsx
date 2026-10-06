import Image from "next/image";
import Link from "next/link";

const ecosystem = [
  {
    number: "01",
    title: "Production",
    description:
      "A creative environment designed to support the development and production of film, television and other visual stories.",
  },
  {
    number: "02",
    title: "Learning",
    description:
      "A place where emerging creatives can develop practical skills, learn from experienced professionals and grow their craft.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "Bringing filmmakers, creators, journalists, creative entrepreneurs and partners into the same ecosystem.",
  },
  {
    number: "04",
    title: "Innovation",
    description:
      "Connecting storytelling with technology and new ways of creating, producing and sharing African stories.",
  },
];

const creativeCommunity = [
  "Filmmakers",
  "Journalists",
  "Photographers",
  "Digital creators",
  "Creative entrepreneurs",
  "Emerging talent",
];

export default function VillagePage() {
  return (
    <main className="bg-[var(--cinematic-navy)] text-white">
      {/* HERO */}
      <section className="relative flex min-h-[78vh] items-end overflow-hidden">
        <Image
          src="/images/hero-placeholder.jpg"
          alt="Capital Film & Creatives Village"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[#020617]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 pb-20 pt-32 md:px-8 md:pb-28 lg:pb-32">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-2 w-2 bg-[var(--orange)]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
              The Village
            </p>
          </div>

          <h1 className="max-w-6xl font-[var(--font-cormorant)] text-6xl font-medium leading-[0.88] tracking-[-0.035em] sm:text-7xl md:text-8xl lg:text-[112px]">
            More than
            <br />
            <span className="text-white/45">a film studio.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
            Capital Film & Creatives Village is being developed as a connected
            creative environment where people can produce, learn, collaborate
            and build the future of African storytelling.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-t border-white/10 bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[var(--orange)]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
                  01 / The Concept
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="max-w-4xl font-[var(--font-cormorant)] text-4xl font-medium leading-[0.98] tracking-[-0.02em] sm:text-5xl md:text-6xl">
                A place where the different parts of the creative process can
                exist{" "}
                <span className="text-white/40">under one roof.</span>
              </h2>

              <div className="mt-10 max-w-2xl space-y-6 text-sm leading-7 text-white/60 md:text-base md:leading-8">
                <p>
                  CFCV is envisioned as more than a collection of production
                  facilities. It is a creative ecosystem built around the
                  people, skills, technology and relationships required to
                  develop compelling stories.
                </p>

                <p>
                  The idea is simple: bring different creative disciplines
                  closer together and create an environment where ideas can
                  move from concept to creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="bg-[var(--surface)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="mb-14 max-w-3xl md:mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              02 / The Ecosystem
            </p>

            <h2 className="mt-5 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.93] tracking-[-0.025em] sm:text-6xl md:text-7xl">
              Four parts of
              <br />
              <span className="text-white/40">one creative ecosystem.</span>
            </h2>
          </div>

          <div className="grid border-t border-white/10 md:grid-cols-2">
            {ecosystem.map((item) => (
              <article
                key={item.number}
                className="border-b border-white/10 py-9 md:min-h-[300px] md:px-10 md:py-12 md:nth-[2n+1]:border-r"
              >
                <p className="text-[10px] tracking-[0.16em] text-white/30">
                  {item.number}
                </p>

                <h3 className="mt-8 font-[var(--font-cormorant)] text-4xl font-medium text-white md:text-5xl">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-white/55 md:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LARGE IMAGE */}
      <section className="relative overflow-hidden bg-[var(--cinematic-navy)]">
        <div className="relative h-[65vh] min-h-[500px]">
          <Image
            src="/images/village-placeholder.jpg"
            alt="Capital Film & Creatives Village"
            fill
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-[#020617]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/20" />

          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1360px] px-6 pb-14 md:px-8 md:pb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
              A place to create
            </p>

            <h2 className="mt-4 max-w-4xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.92] tracking-[-0.025em] sm:text-6xl md:text-8xl">
              From the first idea
              <br />
              <span className="text-white/45">to the finished story.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                03 / The Community
              </p>

              <h2 className="mt-5 max-w-xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.94] tracking-[-0.025em] sm:text-6xl md:text-7xl">
                Built around
                <br />
                <span className="text-white/40">creative people.</span>
              </h2>

              <p className="mt-8 max-w-lg text-sm leading-7 text-white/55 md:text-base md:leading-8">
                A creative ecosystem becomes meaningful through the people who
                use it. CFCV is envisioned as a place where different
                disciplines and generations can meet and create together.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid border-t border-white/10 sm:grid-cols-2">
                {creativeCommunity.map((person, index) => (
                  <div
                    key={person}
                    className="flex items-center gap-5 border-b border-white/10 py-6"
                  >
                    <span className="text-[10px] tracking-[0.12em] text-[var(--orange)]">
                      0{index + 1}
                    </span>

                    <p className="font-[var(--font-cormorant)] text-2xl text-white md:text-3xl">
                      {person}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="border-y border-white/10 bg-[var(--surface)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                04 / The Location
              </p>

              <h2 className="mt-5 max-w-4xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.92] tracking-[-0.025em] sm:text-6xl md:text-8xl">
                Rooted in
                <br />
                <span className="text-white/40">the Niger Delta.</span>
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pt-3">
              <p className="text-sm leading-7 text-white/60 md:text-base md:leading-8">
                CFCV is being developed in Saakpenwa, Tai Local Government Area
                of Rivers State. Its location is part of a wider ambition to
                create opportunities for creative talent and storytelling from
                the Niger Delta.
              </p>

              <div className="mt-8 border-l border-[var(--orange)] pl-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
                  Location
                </p>

                <p className="mt-2 font-[var(--font-cormorant)] text-2xl text-white">
                  Saakpenwa
                </p>

                <p className="mt-1 text-sm text-white/45">
                  Tai LGA · Rivers State · Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE BIGGER PICTURE */}
      <section className="bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              05 / The Bigger Picture
            </p>

            <h2 className="mt-6 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.92] tracking-[-0.025em] sm:text-6xl md:text-8xl">
              The goal is not simply
              <br />
              <span className="text-white/40">to build a place.</span>
            </h2>

            <p className="mx-auto mt-9 max-w-2xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
              It is to help create an environment where African stories can be
              imagined, developed, produced and shared — while creating new
              opportunities for the people behind them.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[var(--surface)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="max-w-5xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              Explore CFCV
            </p>

            <h2 className="mt-5 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.92] tracking-[-0.025em] sm:text-6xl md:text-8xl">
              See what is being
              <br />
              <span className="text-white/40">built.</span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
              Explore the spaces, facilities and development journey behind
              Capital Film & Creatives Village.
            </p>

            <div className="mt-9 flex flex-wrap gap-5">
              <Link
                href="/facilities"
                className="inline-flex items-center bg-white px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--cinematic-navy)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore Facilities
                <span className="ml-4">→</span>
              </Link>

              <Link
                href="/journey"
                className="inline-flex items-center border border-white/20 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-white/50"
              >
                Follow the Journey
                <span className="ml-4">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}