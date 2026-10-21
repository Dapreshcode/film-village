-- CreateTable
CREATE TABLE "FounderQuote" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FounderQuote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FounderQuote_published_sortOrder_idx" ON "FounderQuote"("published", "sortOrder");
