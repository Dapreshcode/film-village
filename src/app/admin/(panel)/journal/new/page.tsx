import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import JournalForm from "../journal-form";
import { createJournalEntry } from "../actions";

export default async function NewJournalEntryPage() {
  await requireAdmin();

  const rows = await prisma.journalEntry.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add journal entry</h1>
      <JournalForm
        action={createJournalEntry}
        categories={rows.map((r) => r.category)}
        submitLabel="Create entry"
      />
    </div>
  );
}