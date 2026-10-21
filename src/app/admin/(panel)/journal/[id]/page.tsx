import { notFound } from "next/navigation";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import DeleteButton from "@/components/admin/delete-button";
import JournalForm from "../journal-form";
import { updateJournalEntry, deleteJournalEntry } from "../actions";

export default async function EditJournalEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [entry, rows] = await Promise.all([
    prisma.journalEntry.findUnique({ where: { id } }),
    prisma.journalEntry.findMany({
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
  ]);
  if (!entry) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit journal entry</h1>
      <JournalForm
        action={updateJournalEntry.bind(null, entry.id)}
        values={entry}
        categories={rows.map((r) => r.category)}
        submitLabel="Save changes"
      />
      <div className="mt-10 border-t pt-6">
        <DeleteButton
          action={deleteJournalEntry.bind(null, entry.id)}
          label="Delete entry"
          confirmText={`Delete "${entry.title}"? This cannot be undone.`}
        />
      </div>
    </div>
  );
}