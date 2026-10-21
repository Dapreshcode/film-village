import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { isAllowedImageUrl } from "@/lib/image-url";

export default async function StoriesPage() {
  const records = await prisma.story.findMany({
    where: { published: true },
    orderBy: [
      { featured: "desc" },
      { sortOrder: "asc" },
      { title: "asc" },
    ],
  });

  const stories = records.map((story) => ({
    id: story.id,
    slug: story.slug,
    title: story.title,
    excerpt: story.excerpt,
    category: story.category,
    date: story.dateLabel ?? "Coming Soon",
    image:  story.imageUrl && isAllowedImageUrl(story.imageUrl)
    ? story.imageUrl : "/homepage/featured-story.jpeg",
    featured: story.featured,
  }));





const featuredStory = stories.find((story) => story.featured);

const supportingStories = stories.filter(
  (story) => story.id !== featuredStory?.id
);


  return (
    <main className="bg-[var(--cinematic-navy)] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 pt-36 pb-24 md:pt-44 md:pb-32 mt-5">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="max-w-4xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2 w-2 bg-[var(--orange)]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
                Stories
              </p>
            </div>

            <h1 className="font-[var(--font-cormorant)] text-6xl font-medium leading-[0.92] tracking-[-0.025em] sm:text-7xl md:text-8xl lg:text-[110px]">
              Stories
              <br />
              <span className="text-white/35">from the Village.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              Follow the people, ideas, progress and moments shaping Capital
              Film & Creatives Village.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED STORY */}
      {featuredStory && (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-[1360px] px-6 md:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[var(--orange)]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
                  Featured Story
                </p>
              </div>
            </div>

            <Link
              href={`/stories/${featuredStory.slug}`}
              className="group grid overflow-hidden border border-white/10 bg-[var(--surface)] lg:grid-cols-12"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[540px]">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-between p-8 md:p-12 lg:col-span-5 lg:p-14">
                <div>
                  <div className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    <span>{featuredStory.category}</span>
                    <span className="h-px w-8 bg-white/20" />
                    <span>{featuredStory.date}</span>
                  </div>

                  <h2 className="mt-8 max-w-xl font-[var(--font-cormorant)] text-4xl font-medium leading-[0.98] tracking-[-0.02em] md:text-5xl lg:text-6xl">
                    {featuredStory.title}
                  </h2>

                  <p className="mt-7 max-w-lg text-sm leading-7 text-white/55 md:text-base">
                    {featuredStory.excerpt}
                  </p>
                </div>

                <div className="mt-12 flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 group-hover:text-[var(--orange)]">
                  Read Story
                  <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* STORY GRID */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="mb-12 flex items-end justify-between gap-8 md:mb-16">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 bg-[var(--orange)]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 md:text-[11px]">
                  From the Village
                </p>
              </div>

              <h2 className="font-[var(--font-cormorant)] text-5xl font-medium leading-none md:text-6xl">
                More stories.
              </h2>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {supportingStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 via-transparent to-transparent opacity-70" />
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.16em] text-white/35">
                    <span>{story.category}</span>
                    <span className="h-px w-5 bg-white/20" />
                    <span>{story.date}</span>
                  </div>

                  <h3 className="mt-4 font-[var(--font-cormorant)] text-3xl font-medium leading-[1] transition-colors duration-300 group-hover:text-[var(--orange)]">
                    {story.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-white/50">
                    {story.excerpt}
                  </p>

                  <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors duration-300 group-hover:text-white">
                    Read Story →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="border-t border-white/10 py-24 md:py-32">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="max-w-4xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--orange)]">
              The Story Continues
            </p>

            <h2 className="mt-6 font-[var(--font-cormorant)] text-5xl font-medium leading-[0.95] md:text-7xl">
              This is only
              <br />
              <span className="text-white/35">the beginning.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 md:text-base">
              As the Village develops, this space will grow with it — capturing
              the people, milestones, creative work and ideas shaping its
              journey.
            </p>

            <Link
              href="/journey"
              className="mt-9 inline-flex items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
            >
              Follow the Journey
              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}