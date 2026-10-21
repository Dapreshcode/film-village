
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const facilities = [
  {
    slug: "production-studios",
    name: "Production Studios",
    summary: "Purpose-built spaces for visual storytelling.",
    description:
      "Dedicated production spaces envisioned to support film, television and other forms of visual storytelling.",
    category: "Production",
    imageUrl: "/homepage/facilities4.jpeg",
    features: ["Film production", "Television production"],
    status: "IN_DEVELOPMENT" as const,
    sortOrder: 0,
  },
  {
    slug: "post-production",
    name: "Post-Production Suite",
    summary: "Spaces for shaping and finishing creative work.",
    description:
      "A creative environment for editing, sound design and the development of finished stories.",
    category: "Post-Production",
    imageUrl: "/homepage/facilities1.jpeg",
    features: ["Editing", "Sound design", "Finishing"],
    status: "COMING_SOON" as const,
    sortOrder: 1,
  },
  {
    slug: "screening-cinema",
    name: "Screening Cinema",
    summary: "A space for experiencing completed creative work.",
    description:
      "A dedicated space for screening and sharing completed creative work.",
    category: "Exhibition",
    imageUrl: "/homepage/facilities2.jpg",
    features: ["Film screenings", "Creative exhibitions"],
    status: "COMING_SOON" as const,
    sortOrder: 2,
  },
  {
    slug: "training-studios",
    name: "Training Studios",
    summary: "Spaces for practical learning and talent development.",
    description:
      "Spaces envisioned for practical learning, creative development and emerging talent.",
    category: "Learning",
    imageUrl: "/homepage/facilities3.jpeg",
    features: ["Practical learning", "Creative development"],
    status: "COMING_SOON" as const,
    sortOrder: 3,
  },
  {
    slug: "outdoor-backlot",
    name: "Outdoor Backlot",
    summary: "Outdoor environments for visual storytelling.",
    description:
      "Outdoor production space intended to expand the environments available for visual storytelling.",
    category: "Production",
    imageUrl: "/homepage/facilities4.jpg",
    features: ["Outdoor production"],
    status: "PLANNED" as const,
    sortOrder: 4,
  },
  {
    slug: "guest-accommodation",
    name: "Guest Accommodation",
    summary: "Accommodation for visiting creatives and collaborators.",
    description:
      "Accommodation intended to support visiting creatives, collaborators and other guests.",
    category: "Hospitality",
    imageUrl: "/homepage/facilities5.jpeg",
    features: ["Guest accommodation"],
    status: "PLANNED" as const,
    sortOrder: 5,
  },
];

const journeyItems = [
  {
    slug: "the-vision",
    title: "The Vision",
    summary: "An idea takes shape.",
    description:
      "The early vision for a creative home dedicated to African storytelling.",
    imageUrl: "/homepage/journey-1.jpeg",
    status: "COMPLETED" as const,
    sortOrder: 0,
  },
  {
    slug: "building-the-village",
    title: "Building the Village",
    summary: "Turning the vision into a place.",
    description:
      "Developing the facilities and environment needed to support film production.",
    imageUrl: "/homepage/journey-2.jpeg",
    status: "IN_PROGRESS" as const,
    sortOrder: 1,
  },
  {
    slug: "building-the-people",
    title: "Building the People",
    summary: "The people make the Village.",
    description:
      "A future focus on developing talent and supporting the next generation of creatives.",
    imageUrl: "/homepage/journey-3.jpeg",
    status: "UPCOMING" as const,
    sortOrder: 2,
  },
];

const stories = [
  {
    slug: "building-a-home-for-african-stories",
    title: "Building a Home for African Stories",
    excerpt:
      "An evolving look at the vision behind Capital Film & Creatives Village and the environment being created for African storytellers.",
    category: "The Village",
    dateLabel: "Coming Soon",
    imageUrl: "/homepage/featured-story.jpeg",
    featured: true,
    sortOrder: 0,
    published: false,
  },
  {
    slug: "developing-the-next-generation",
    title: "Developing the Next Generation",
    excerpt:
      "A look at the importance of creating opportunities for emerging creatives to learn, practise and build.",
    category: "Talent",
    dateLabel: "Coming Soon",
    imageUrl: "/homepage/story-1.jpeg",
    featured: false,
    sortOrder: 1,
    published: false,
  },
  {
    slug: "where-technology-meets-storytelling",
    title: "Where Technology Meets Storytelling",
    excerpt:
      "Exploring the relationship between technology, creativity and the future of African storytelling.",
    category: "Innovation",
    dateLabel: "Coming Soon",
    imageUrl: "/homepage/story-2.jpeg",
    featured: false,
    sortOrder: 2,
    published: false,
  },
  {
    slug: "a-new-creative-landscape",
    title: "A New Creative Landscape",
    excerpt:
      "The journey of creating a space where filmmakers, journalists, photographers and digital creators can collaborate.",
    category: "Community",
    dateLabel: "Coming Soon",
    imageUrl: "/homepage/story-3.jpeg",
    featured: false,
    sortOrder: 3,
    published: false,
  },
];



const journalEntries = [
  {
    slug: "building-the-future-of-african-storytelling",
    title: "Building the Future of African Storytelling",
    excerpt:
      "Notes, updates and reflections from the continuing development of Capital Film & Creatives Village.",
    category: "Vision",
    dateLabel: "Coming Soon",
    imageUrl: "/homepage/journal-featured.jpeg",
    featured: true,
    sortOrder: 0,
    published: false,
  },
  {
    slug: "inside-the-village",
    title: "Inside the Village",
    excerpt: "A closer look at the spaces, ideas and people shaping the Village.",
    category: "The Village",
    dateLabel: "Coming Soon",
    imageUrl: "/homepage/journal-1.jpeg",
    featured: false,
    sortOrder: 1,
    published: false,
  },
  {
    slug: "creating-opportunities-for-talent",
    title: "Creating Opportunities for Talent",
    excerpt:
      "Reflections on developing young creatives and creating pathways into the creative industry.",
    category: "People",
    dateLabel: "Coming Soon",
    imageUrl: "/homepage/journal-2.jpeg",
    featured: false,
    sortOrder: 2,
    published: false,
  },
  {
    slug: "the-work-behind-the-vision",
    title: "The Work Behind the Vision",
    excerpt:
      "A look at the ongoing work, conversations and decisions behind the development of the Village.",
    category: "Behind the Scenes",
    dateLabel: "Coming Soon",
    imageUrl: "/homepage/journal-3.jpeg",
    featured: false,
    sortOrder: 3,
    published: false,
  },
];


const founderQuotes = [
  {
    text: "We are not just building a studio. We are building a home for African stories to finally be told on their own terms.",
    imageUrl: "/homepage/story-1.jpeg",
    sortOrder: 0,
    published: true,
  },
  {
    text: "Technology has caught up with our stories. Now we need the place, and the people, to tell them at a world-class level.",
    imageUrl: "/homepage/story-2.jpeg",
    sortOrder: 1,
    published: true,
  },
  {
    text: "Every filmmaker, journalist and creator who walks through this Village should leave more capable than they arrived.",
    imageUrl: "/homepage/story-3.jpeg",
    sortOrder: 2,
    published: true,
  },
];





async function main() {
  const facilityResult = await prisma.facility.createMany({
    data: facilities,
    skipDuplicates: true,
  });

  console.log(`Facilities: ${facilityResult.count} new records.`);

  const journeyResult = await prisma.journeyItem.createMany({
    data: journeyItems,
    skipDuplicates: true,
  });

  console.log(`Journey items: ${journeyResult.count} new records.`);
//story seed function
  const storyResult = await prisma.story.createMany({
    data: stories,
    skipDuplicates: true,
  });

  console.log(`Stories: ${storyResult.count} new records.`);

  //journal seed function
  
const journalResult = await prisma.journalEntry.createMany({
  data: journalEntries,
  skipDuplicates: true,
});

console.log(`Journal entries added: ${journalResult.count}`);


//From the founder seed function

const founderQuoteResult = await prisma.founderQuote.createMany({
  data: founderQuotes,
  skipDuplicates: true,
});

console.log(`Founder quotes added: ${founderQuoteResult.count}`);

console.log("All seed operations completed.");
}




main()
  .catch((error) => {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
