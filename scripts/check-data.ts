import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "";
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

async function main() {
  console.log("Database host:", new URL(url).hostname);

  const users = await prisma.user.findMany({
    select: { email: true, role: true, createdAt: true },
  });
  console.log("Users:");
  console.table(users);

  console.table({
    facilities: await prisma.facility.count(),
    journeyItems: await prisma.journeyItem.count(),
    stories: await prisma.story.count(),
    journalEntries: await prisma.journalEntry.count(),
    founderQuotes: await prisma.founderQuote.count(),
  });
}

main().finally(() => prisma.$disconnect());