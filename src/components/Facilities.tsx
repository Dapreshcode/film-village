import Image from "next/image";

const facilities = [
  {
    number: "01",
    title: "Production Studios",
    description:
      "Purpose-built soundstages and indoor sets equipped for film, TV and digital production.",
    image: "/homepage/facilities4.jpeg",
  },
  {
    number: "02",
    title: "Post-Production Suite",
    description:
      "Editing, sound design, colour grading and finishing spaces built for a modern workflow.",
    image: "/homepage/facilities1.jpeg",
  },
  {
    number: "03",
    title: "Screening Cinema",
    description:
      "A dedicated screening space for premieres, reviews and community film nights.",
    image: "/homepage/facilities-2.jpg",
  },
  {
    number: "04",
    title: "Training Studios",
    description:
      "Hands-on classrooms and practical studios for the Academy's filmmaking and media programs.",
    image: "/homepage/facilities3.jpeg",
  },
  {
    number: "05",
    title: "Outdoor Backlot",
    description:
      "Open location sets within the Village grounds for exterior and location-style shoots.",
    image: "/homepage/facilities4.jpg",
  },
  {
    number: "06",
    title: "Guest Accommodation",
    description:
      "On-site lodging for crews, trainees and visiting creatives during productions and programs.",
    image: "/homepage/facilities5.jpeg",
  },
];

export default function Facilities() {
  return (
    <section
      id="facilities"
      className="relative overflow-hidden bg-[var(--cinematic-navy)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">

        {/* Section heading */}
        <div className="mb-12 flex items-center gap-3 md:mb-16">
          <span className="h-2 w-2 bg-[var(--orange)]" />

          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
            03 / The Facilities
          </p>
        </div>

        {/* Intro row */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <h2 className="max-w-[620px] font-[var(--font-cormorant)] text-[44px] font-medium leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl">
            Built for the
            <br />
            <span className="text-white/45">work of storytelling.</span>
          </h2>

          <a
            href="/facilities"
            className="inline-flex w-fit shrink-0 items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
          >
            View All Facilities
            <span className="ml-3">→</span>
          </a>
        </div>

        {/* Facility grid */}
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
        {facilities.length > 0 && facilities.map((facility)=>(
          <a
            key={facility.number}
            href="/facilities"
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-[var(--cinematic-navy)] p-6 md:p-8"
          >
            <Image
              src={facility.image}
              alt={facility.title}
              fill
              className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-70"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/50 to-[#020617]/10" />

            <div className="relative">
              <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[var(--orange)]">
                {facility.number}
              </p>

              <h3 className="font-[var(--font-cormorant)] text-3xl text-white md:text-4xl">
                {facility.title}
              </h3>

              <p className="mt-3 max-w-[280px] text-sm leading-6 text-white/55">
                {facility.description}
              </p>
            </div>
          </a>
        ))}
        </div>

      </div>
    </section>
  );
}