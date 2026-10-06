import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    number: "01",
    title: "Storytelling",
    description:
      "Creating space for African stories to be developed, produced and experienced from an African perspective.",
  },
  {
    number: "02",
    title: "Talent",
    description:
      "Supporting the next generation of filmmakers, journalists, creators and creative entrepreneurs.",
  },
  {
    number: "03",
    title: "Technology",
    description:
      "Bringing people, ideas and modern creative technology together to shape the future of storytelling.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[var(--cinematic-navy)] text-white">
      {/* HERO */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">
        <Image
          src="/images/hero-placeholder.jpg"
          alt="Capital Film & Creatives Village"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-[#020617]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1360px] px-6 pb-20 pt-32 md:px-8 md:pb-28 lg:pb-32">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-2 w-2 bg-[var(--orange)]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
              About CFCV
            </p>
          </div>

          <h1 className="max-w-5xl font-[var(--font-cormorant)] text-6xl font-medium leading-[0.9] tracking-[-0.03em] sm:text-7xl md:text-8xl lg:text-[112px]">
            A place built
            <br />
            <span className="text-white/45">for African stories.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
            Capital Film & Creatives Village is being developed as a creative
            ecosystem where storytelling, talent, technology and collaboration
            can come together.
          </p>
        </div>
      </section>

      {/* THE IDEA */}
      <section className="border-t border-white/10 bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[var(--orange)]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
                  01 / The Idea
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="max-w-4xl font-[var(--font-cormorant)] text-4xl font-medium leading-[1] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
                Africa has the stories.
                <br />
                <span className="text-white/40">
                  We are building the place to tell them.
                </span>
              </h2>

              <div className="mt-10 max-w-2xl space-y-6 text-sm leading-7 text-white/60 md:text-base md:leading-8">
                <p>
                  Capital Film & Creatives Village is built around the belief
                  that African stories deserve spaces, tools and opportunities
                  that allow them to be developed and told with confidence.
                </p>

                <p>
                  The Village is envisioned as more than a production facility.
                  It is a place where filmmakers, journalists, photographers,
                  digital creators and other creative professionals can meet,
                  learn, create and collaborate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE + STORY */}
      <section className="bg-[var(--surface)] py-20 md:py-28 lg:py-36">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7">
              <Image
                src="/images/vision-placeholder.jpg"
                alt="The vision behind Capital Film & Creatives Village"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/30 to-transparent" />
            </div>

            <div className="lg:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                02 / The Vision
              </p>

              <h2 className="mt-5 font-[var(--font-cormorant)] text-4xl font-medium leading-[0.95] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
                More than a building.
                <br />
                <span className="text-white/40">
                  A creative ecosystem.
                </span>
              </h2>

              <div className="mt-7 space-y-5 text-sm leading-7 text-white/60 md:text-base">
                <p>
                  The ambition behind CFCV extends beyond creating studios or
                  production spaces. The larger goal is to create an environment
                  where different parts of the creative industry can exist
                  alongside one another.
                </p>

                <p>
                  Production, learning, collaboration and innovation can become
                  part of one connected ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY HERE */}
      <section className="bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                03 / Why Here
              </p>

              <h2 className="mt-5 max-w-xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl">
                Rooted in the
                <br />
                <span className="text-white/40">Niger Delta.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 lg:pt-2">
              <div className="max-w-2xl space-y-6 text-sm leading-7 text-white/60 md:text-base md:leading-8">
                <p>
                  CFCV is being developed in Saakpenwa, Tai Local Government
                  Area of Rivers State, placing the project within the Niger
                  Delta and its rich cultural landscape.
                </p>

                <p>
                  The location is part of the vision: creating opportunities
                  for stories, talent and creative enterprise to grow from a
                  region that has much more to offer than the narratives it has
                  traditionally been known for.
                </p>

                <p>
                  From this setting, the ambition is to connect local talent and
                  stories with a wider African and global creative community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-y border-white/10 bg-[var(--surface)] py-24 md:py-32 lg:py-36">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="mb-14 max-w-3xl md:mb-20">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              04 / What Drives It
            </p>

            <h2 className="mt-5 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl">
              Three ideas at the
              <br />
              <span className="text-white/40">heart of the Village.</span>
            </h2>
          </div>

          <div className="grid border-t border-white/10 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.number}
                className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <p className="text-[10px] tracking-[0.16em] text-white/30">
                  {pillar.number}
                </p>

                <h3 className="mt-8 font-[var(--font-cormorant)] text-3xl text-white md:text-4xl">
                  {pillar.title}
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-20">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] max-w-lg overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/homepage/NdumeGreen.jpeg"
                  alt="Ndume Green, founder of Capital Film & Creatives Village"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/45 via-transparent to-transparent" />
              </div>

              <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-white/30">
                Ndume Green · Founder
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
                05 / The Founder
              </p>

              <h2 className="mt-5 max-w-3xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] tracking-[-0.025em] sm:text-6xl md:text-7xl lg:text-[80px]">
                A vision for
                <br />
                <span className="text-white/40">a different future.</span>
              </h2>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/60 md:text-base md:leading-8">
                The Village grows from a wider vision of creating more
                opportunities for African storytelling and for the people who
                bring those stories to life.
              </p>

              <Link
                href="/journal"
                className="mt-8 inline-flex items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
              >
                Explore the Journal
                <span className="ml-3">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[var(--surface)] py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="max-w-5xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              The journey continues
            </p>

            <h2 className="mt-6 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.92] tracking-[-0.025em] sm:text-6xl md:text-8xl">
              The story is still
              <br />
              <span className="text-white/40">being written.</span>
            </h2>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
              Explore the Village, follow its development and discover the
              people and stories shaping what comes next.
            </p>

            <div className="mt-9 flex flex-wrap gap-6">
              <Link
                href="/village"
                className="inline-flex items-center bg-white px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--cinematic-navy)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore the Village
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