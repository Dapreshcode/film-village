
import { prisma } from "@/lib/Prisma";
import FromTheFounderCarousel from "./FromTheFounderCarousel";

export default async function FromTheFounder() {
  const quotes = await prisma.founderQuote.findMany({
    where: { published: true },
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "asc" },
    ],
    select: {
      id: true,
      text: true,
      imageUrl: true,
    },
  });

  return <FromTheFounderCarousel quotes={quotes} />;
}
