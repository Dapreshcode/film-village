import "dotenv/config";
import fs from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set.");

const host = new URL(url).hostname;
console.log(`Target database host: ${host}`);
if (!process.argv.includes("--yes")) {
  console.log("Dry run only. Check the host above, then re-run with --yes to import.");
  process.exit(0);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
const snap = JSON.parse(fs.readFileSync("prisma/content-snapshot.json", "utf8"));

async function main() {
  // upsert with an empty update = create if missing, never overwrite
  for (const f of snap.facilities)
    await prisma.facility.upsert({ where: { slug: f.slug }, create: f, update: {} });

  for (const j of snap.journeyItems)
    await prisma.journeyItem.upsert({ where: { slug: j.slug }, create: j, update: {} });

  for (const s of snap.stories)
    await prisma.story.upsert({ where: { slug: s.slug }, create: s, update: {} });

  for (const e of snap.journalEntries)
    await prisma.journalEntry.upsert({
      where: { slug: e.slug },
      create: { ...e,publishedAt: e.publishedAt
  ? new Date(e.publishedAt)
  : e.published
    ? new Date()
    : null, },
      update: {},
    });

  // Founder quotes have no unique key, so only import into an empty table
  if ((await prisma.founderQuote.count()) === 0) {
    await prisma.founderQuote.createMany({ data: snap.founderQuotes });
  } else {
    console.log("Founder quotes already exist; skipped.");
  }

  console.log("Import finished.");
}

main()
  .catch((e) => {
    console.error("Import failed:", e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());