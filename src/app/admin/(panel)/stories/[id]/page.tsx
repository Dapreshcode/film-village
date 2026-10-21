import { notFound } from "next/navigation";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import DeleteButton from "@/components/admin/delete-button";
import StoryForm from "../story-form";
import { updateStory, deleteStory } from "../actions";

export default async function EditStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [story, rows] = await Promise.all([
    prisma.story.findUnique({ where: { id } }),
    prisma.story.findMany({
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
  ]);
  if (!story) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit story</h1>
      <StoryForm
        action={updateStory.bind(null, story.id)}
        values={story}
        categories={rows.map((r) => r.category)}
        submitLabel="Save changes"
      />
      <div className="mt-10 border-t pt-6">
        <DeleteButton
          action={deleteStory.bind(null, story.id)}
          label="Delete story"
          confirmText={`Delete "${story.title}"? This cannot be undone.`}
        />
      </div>
    </div>
  );
}