
import Image from "next/image";
import { prisma } from "@/lib/Prisma";
import Link from "next/link";

export default async function Stories() {
  const stories = await prisma.story.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
    take: 4,
    select: {
      id: true,
      slug: true,
      category: true,
      title: true,
      excerpt: true,
      imageUrl: true,
    },
  });

  if (stories.length === 0) return null;

  const [featuredStory, ...otherStories] = stories;

  return (
    <section
      id="stories"
      className="relative flex w-full items-center justify-center overflow-hidden bg-[var(--surface)] py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1360px] px-6 md:px-8">
        <div className="mb-12 flex items-center gap-3 px-10 md:mb-16">
          <span className="h-2 w-2 bg-[var(--orange)]" />
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 md:text-[11px]">
            04 / The Stories
          </p>
        </div>

        <div className="mx-10 mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <h2 className="max-w-[680px] font-[var(--font-cormorant)] text-[44px] font-medium leading-[0.95] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl">
            The Africa moving
            <br />
            <span className="text-white/45">
              the world forward.
            </span>
          </h2>

          <Link
            href="/stories"
            className="inline-flex w-fit shrink-0 items-center border-b border-white/30 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-[var(--orange)] hover:text-[var(--orange)]"
          >
            Read All Stories
            <span className="ml-3">→</span>
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Featured story */}
          <Link
            href={`/stories/${featuredStory.slug}`}
            className="group relative mx-10 col-span-12 aspect-[4/5] overflow-hidden bg-[var(--cinematic-navy)] md:aspect-[16/10] lg:col-span-7 lg:aspect-[4/5]"
          >
            {featuredStory.imageUrl && (
              <Image
                src={featuredStory.imageUrl}
                alt={featuredStory.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[var(--orange)]">
                {featuredStory.category}
              </p>

              <h3 className="max-w-[440px] font-[var(--font-cormorant)] text-3xl leading-[1.02] text-white md:text-5xl">
                {featuredStory.title}
              </h3>

              <p className="mt-4 max-w-[420px] text-sm leading-6 text-white/60">
                {featuredStory.excerpt}
              </p>
            </div>
          </Link>

          {/* Remaining featured stories */}
          <div className="mx-10 col-span-12 flex flex-col divide-y divide-white/10 border-t border-white/10 lg:col-span-5 lg:border-t-0">
            {otherStories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group flex items-center gap-5 py-6 first:pt-0 md:gap-7 md:py-8"
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden bg-[var(--cinematic-navy)] md:h-24 md:w-32">
                  {story.imageUrl && (
                    <Image
                      src={story.imageUrl}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="128px"
                    />
                  )}
                </div>

                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--orange)]">
                    {story.category}
                  </p>

                  <h3 className="font-[var(--font-cormorant)] text-xl leading-tight text-white transition-colors duration-300 group-hover:text-white/70 md:text-2xl">
                    {story.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
