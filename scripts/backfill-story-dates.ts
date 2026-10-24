import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL!;
console.log("Target database host:", new URL(url).hostname);

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

async function main() {
  const updated = await prisma.$executeRaw`
    UPDATE "Story" SET "publishedAt" = "createdAt"
    WHERE "published" = true AND "publishedAt" IS NULL`;
  console.log(`Stories updated: ${updated}`);
}

main().finally(() => prisma.$disconnect());