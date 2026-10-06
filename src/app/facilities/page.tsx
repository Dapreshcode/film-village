import Image from "next/image";
import Link from "next/link";

type Facility = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  status: "Planned" | "In Development" | "Coming Soon";
};

const facilities: Facility[] = [
  {
    id: "production-studios",
    number: "01",
    title: "Production Studios",
    category: "Production",
    description:
      "Dedicated production spaces envisioned to support film, television and other forms of visual storytelling.",
    image: "/homepage/facilities4.jpeg",
    status: "In Development",
  },
  {
    id: "post-production",
    number: "02",
    title: "Post-Production Suite",
    category: "Post-Production",
    description:
      "A creative environment for the work that continues after production, from editing through the development of finished stories.",
    image: "/homepage/facilities1.jpeg",
    status: "Coming Soon",
  },
  {
    id: "screening-cinema",
    number: "03",
    title: "Screening Cinema",
    category: "Exhibition",
    description:
      "A dedicated space for experiencing, screening and sharing completed creative work.",
    image: "/homepage/facilities-2.jpg",
    status: "Coming Soon",
  },
  {
    id: "training-studios",
    number: "04",
    title: "Training Studios",
    category: "Learning",
    description:
      "Spaces envisioned for practical learning, creative development and the growth of emerging talent.",
    image: "/homepage/facilities3.jpeg",
    status: "Coming Soon",
  },
  {
    id: "outdoor-backlot",
    number: "05",
    title: "Outdoor Backlot",
    category: "Production",
    description:
      "Outdoor production space intended to expand the range of environments available for visual storytelling.",
    image: "/homepage/facilities4.jpg",
    status: "Planned",
  },
  {
    id: "guest-accommodation",
    number: "06",
    title: "Guest Accommodation",
    category: "Hospitality",
    description:
      "Accommodation intended to support visiting creatives, collaborators and other guests of the Village.",
    image: "/homepage/facilities5.jpeg",
    status: "Planned",
  },
];

export default function FacilitiesPage() {
  return (
    <main className="bg-[var(--cinematic-navy)] text-white">
      {/* HERO */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">
        <Image
          src="/homepage/facilities4.jpeg"
          alt="Capital Film & Creatives Village facility"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[#020617]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/35 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 pb-20 pt-32 md:px-8 md:pb-28 lg:pb-32">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-2 w-2 bg-[var(--orange)]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
              The Facilities
            </p>
          </div>

          <h1 className="max-w-6xl font-[var(--font-cormorant)] text-6xl font-medium leading-[0.88] tracking-[-0.035em] sm:text-7xl md:text-8xl lg:text-[112px]">
            Spaces built
            <br />
            <span className="text-white/45">for creation.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
            Explore the spaces envisioned as part of Capital Film & Creatives
            Village — bringing production, learning, exhibition and
            collaboration into one creative environment.
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
                  01 / The Spaces
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="max-w-4xl font-[var(--font-cormorant)] text-4xl font-medium leading-[0.98] tracking-[-0.02em] sm:text-5xl md:text-6xl">
                Every part of the Village has a role to play in{" "}
                <span className="text-white/40">the creative process.</span>
              </h2>

              <p className="mt-9 max-w-2xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
                From production and post-production to learning and
                collaboration, the planned spaces are intended to support
                different stages of the creative journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITY LIST */}
      <section className="bg-[var(--surface)] py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                02 / Explore the Facilities
              </p>

              <h2 className="mt-5 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.93] tracking-[-0.025em] sm:text-6xl md:text-7xl">
                The Village
                <br />
                <span className="text-white/40">takes shape here.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/40">
              The information below is part of the current project
              presentation and will evolve as the Village develops.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {facilities.map((facility, index) => {
              const reversed = index % 2 !== 0;

              return (
                <article
                  key={facility.id}
                  className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden bg-[var(--cinematic-navy)] lg:col-span-7 ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/35 to-transparent" />

                    <div className="absolute left-5 top-5 flex items-center gap-3 md:left-7 md:top-7">
                      <span className="bg-[#020617]/70 px-3 py-2 text-[10px] tracking-[0.15em] text-white/70 backdrop-blur-sm">
                        {facility.number}
                      </span>

                      <span className="bg-[#020617]/70 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/60 backdrop-blur-sm">
                        {facility.status}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-5 ${
                      reversed ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                      {facility.category}
                    </p>

                    <h3 className="mt-4 font-[var(--font-cormorant)] text-4xl font-medium leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
                      {facility.title}
                    </h3>

                    <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 md:text-base md:leading-8">
                      {facility.description}
                    </p>

                    <Link
                      href={`/facilities/${facility.id}`}
                      className="mt-8 inline-flex items-center border-b border-white/25 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
                    >
                      View Facility
                      <span className="ml-3">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section className="bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                03 / One Connected Environment
              </p>

              <h2 className="mt-5 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.94] tracking-[-0.025em] sm:text-6xl md:text-7xl">
                Different spaces.
                <br />
                <span className="text-white/40">One ecosystem.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 lg:pt-2">
              <p className="max-w-2xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
                The strength of a creative village is not simply the individual
                spaces. It is what happens when those spaces, the people using
                them and the wider creative community become connected.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  "Create",
                  "Learn",
                  "Collaborate",
                  "Share",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="border-t border-white/10 pt-5"
                  >
                    <span className="text-[10px] tracking-[0.15em] text-white/25">
                      0{index + 1}
                    </span>

                    <p className="mt-3 font-[var(--font-cormorant)] text-3xl text-white">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[var(--surface)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="max-w-5xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              Keep exploring
            </p>

            <h2 className="mt-5 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.92] tracking-[-0.025em] sm:text-6xl md:text-8xl">
              See how the
              <br />
              <span className="text-white/40">Village is evolving.</span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
              Follow the development of CFCV and the milestones shaping its
              journey.
            </p>

            <div className="mt-9 flex flex-wrap gap-5">
              <Link
                href="/journey"
                className="inline-flex items-center bg-white px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--cinematic-navy)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Follow the Journey
                <span className="ml-4">→</span>
              </Link>

              <Link
                href="/partner"
                className="inline-flex items-center border border-white/20 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-white/50"
              >
                Partner With Us
                <span className="ml-4">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}