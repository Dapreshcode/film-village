
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/Prisma";
import MarkdownContent from "@/components/markdown-content";
import ShareButtons from "@/components/share-buttons";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const story = await prisma.story.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  if (!story) {
    notFound();
  }

  const image = story.imageUrl ?? "/homepage/featured-story.jpeg";
  const date = story.dateLabel ?? "Coming Soon";

  return (
    <main className="bg-[var(--cinematic-navy)] text-white">
      {/* HEADER */}
      <section className="border-b border-white/10 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-[1100px] px-6 md:px-8">
          <Link
            href="/stories"
            className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white"
          >
            ← Back to Stories
          </Link>

          <div className="mt-12">
            <div className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              <span>{story.category}</span>
              <span className="h-px w-8 bg-white/20" />
              <span>{date}</span>
            </div>

            <h1 className="mt-7 max-w-5xl font-[var(--font-cormorant)] text-5xl font-medium leading-[0.92] tracking-[-0.025em] sm:text-6xl md:text-8xl">
              {story.title}
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/55 md:text-lg">
              {story.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-[1360px] px-6 md:px-8">
          <div className="relative aspect-[16/8] overflow-hidden bg-[var(--surface)]">
            <Image
              src={image}
              alt={story.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[760px] px-6 md:px-8">
          <div className="whitespace-pre-line text-base leading-8 text-white/65 md:text-lg md:leading-9">
           {story.content && <MarkdownContent source={story.content} />}
          </div>
        </div>
      </article>

      {/* FOOTER CTA */}
      <section className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-[1100px] px-6 md:px-8">
         <div className="flex items-center px-4 justify-center">
        <ShareButtons path={`/stories/${story.slug}`} title={story.title} />
      </div>

          <p className="text-sm leading-7 text-white/45">
            Discover more stories and updates from Capital Film & Creatives
            Village.
          </p>
          <Link
            href="/stories"
            className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-[var(--orange)]"
          >
            ← Explore More Stories
          </Link>
        </div>
      </section>
    </main>
  );
}
