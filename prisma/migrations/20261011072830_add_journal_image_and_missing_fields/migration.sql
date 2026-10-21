/*
  Warnings:

  - You are about to drop the column `description` on the `JournalItem` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `JournalItem` table. All the data in the column will be lost.
  - Added the required column `category` to the `JournalItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `excerpt` to the `JournalItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JournalItem" DROP COLUMN "description",
DROP COLUMN "summary",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "excerpt" TEXT NOT NULL,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ALTER COLUMN "published" SET DEFAULT false;
