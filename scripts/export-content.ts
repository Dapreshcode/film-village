import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "";
if (!/localhost|127\.0\.0\.1/.test(url)) {
  throw new Error("Export must run against the LOCAL database. Open a fresh terminal.");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

// Case-sensitive check, because Windows would hide mismatches that break on Vercel
function existsExact(publicUrl: string) {
  let dir = "public";
  for (const part of publicUrl.split("/").filter(Boolean)) {
    let entries: string[];
    try {
      entries = fs.readdirSync(dir);
    } catch {
      return false;
    }
    if (!entries.includes(part)) return false;
    dir = path.join(dir, part);
  }
  return true;
}

function imageStatus(u: string | null) {
  if (!u) return "none";
  if (u.startsWith("/")) return existsExact(u) ? "public file ok" : "MISSING in public/";
  return "remote (blob)";
}

/* eslint-disable @typescript-eslint/no-unused-vars */
function strip<T extends { id: string; createdAt: Date; updatedAt: Date }>(row: T) {
  const { id, createdAt, updatedAt, ...rest } = row;
  return rest;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

async function main() {
  const [facilities, journeyItems, stories, journalEntries, founderQuotes] =
    await Promise.all([
      prisma.facility.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.journeyItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.story.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.journalEntry.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.founderQuote.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

  fs.writeFileSync(
    "prisma/content-snapshot.json",
    JSON.stringify(
      {
        facilities: facilities.map(strip),
        journeyItems: journeyItems.map(strip),
        stories: stories.map(strip),
        journalEntries: journalEntries.map(strip),
        founderQuotes: founderQuotes.map(strip),
      },
      null,
      2,
    ),
  );

  console.table([
    ...facilities.map((r) => ({ table: "Facility", item: r.slug, published: r.published, image: imageStatus(r.imageUrl) })),
    ...journeyItems.map((r) => ({ table: "Journey", item: r.slug, published: r.published, image: imageStatus(r.imageUrl) })),
    ...stories.map((r) => ({ table: "Story", item: r.slug, published: r.published, image: imageStatus(r.imageUrl) })),
    ...journalEntries.map((r) => ({ table: "Journal", item: r.slug, published: r.published, image: imageStatus(r.imageUrl) })),
    ...founderQuotes.map((r) => ({ table: "Founder", item: r.text.slice(0, 40), published: r.published, image: imageStatus(r.imageUrl) })),
  ]);

  console.log("Saved prisma/content-snapshot.json");
}

main().finally(() => prisma.$disconnect());