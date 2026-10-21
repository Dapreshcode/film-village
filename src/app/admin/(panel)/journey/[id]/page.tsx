import { notFound } from "next/navigation";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import DeleteButton from "@/components/admin/delete-button";
import JourneyForm from "../journey-form";
import { updateJourneyItem, deleteJourneyItem } from "../actions";

export default async function EditJourneyItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const item = await prisma.journeyItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit journey item</h1>
      <JourneyForm
        action={updateJourneyItem.bind(null, item.id)}
        values={item}
        submitLabel="Save changes"
      />
      <div className="mt-10 border-t pt-6">
        <DeleteButton
          action={deleteJourneyItem.bind(null, item.id)}
          label="Delete journey item"
          confirmText={`Delete "${item.title}"? This cannot be undone.`}
        />
      </div>
    </div>
  );
}