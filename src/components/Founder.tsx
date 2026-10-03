import Image from "next/image";

export default function Founder() {
return <section
   id="founder"
   className="relative w-full overflow-hidden bg-[var(--cinematic-navy)]  py-24 md:py-26 lg:py-30"
 > <div className="mx-auto max-w-[1360px] px-6 md:px-8">
{/* Section heading */} 
<div className="mb-12 flex items-center gap-3 md:mb-16"> <span className="h-2 w-2 bg-[var(--orange)]" />


      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
        06 / The Founder
      </p>
    </div>

    {/* Founder layout */}
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
      {/* Founder portrait */}
      <div className="relative lg:col-span-5">
        <div className="relative aspect-[3/3] w-full overflow-hidden bg-[var(--surface)] ">
          <Image
            src="/homepage/NdumeGreen.jpeg"
            alt="Ndume Green, founder of Capital Film & Creatives Village"
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02] "
           sizes="(max-width: 1024px) 100vw, 42vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/45 via-transparent to-transparent" />
        </div>

        <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-white/35">
          Founder · Capital Film & Creatives Village
        </p>
      </div>

      {/* Founder introduction */}
      <div className="lg:col-span-7 lg:pl-6">
        <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
          The person behind the vision
        </p>

        <h2 className="max-w-[700px] font-[var(--font-cormorant)] text-[48px] font-medium leading-[0.95] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl lg:text-[80px]">
          A vision for
          <br />
          <span className="text-white/45">
            a different future.
          </span>
        </h2>

        <h3 className="mt-8 font-[var(--font-cormorant)] text-3xl text-white md:text-4xl">
          Ndume Green
        </h3>

        <div className="mt-5 max-w-[560px] space-y-5 text-sm leading-7 text-white/60 md:text-base">
          <p>
            Capital Film & Creatives Village is built around a
            vision of creating more opportunities for African
            storytelling and the people who bring those stories
            to life.
          </p>

          <p>
            Through CFCV, that vision takes shape in a creative
            environment where talent, technology, production
            and collaboration can come together in the Niger Delta.
          </p>
        </div>

        {/* Full story link */}
        <a
          href="/about"
          className="mt-9 inline-flex items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
        >
          Discover His Story
          <span className="ml-3">→</span>
        </a>
      </div>
    </div>
  </div>
</section>

}
