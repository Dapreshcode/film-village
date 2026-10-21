-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "FounderQuote" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "JourneyItem" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;
