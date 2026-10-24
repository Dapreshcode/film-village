import type { MetadataRoute } from "next";
import { prisma } from "@/lib/Prisma";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [stories, entries] = await Promise.all([
    prisma.story.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    prisma.journalEntry.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const pages = ["", "/about", "/village", "/academy", "/facilities", "/journey", "/stories", "/journal", "/partner"];

  return [
    ...pages.map((p) => ({
      url: `${SITE}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...stories.map((s) => ({
      url: `${SITE}/stories/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...entries.map((e) => ({
      url: `${SITE}/journal/${e.slug}`,
      lastModified: e.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}