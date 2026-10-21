import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import StoryForm from "../story-form";
import { createStory } from "../actions";

export default async function NewStoryPage() {
  await requireAdmin();

  const rows = await prisma.story.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add story</h1>
      <StoryForm
        action={createStory}
        categories={rows.map((r) => r.category)}
        submitLabel="Create story"
      />
    </div>
  );
}