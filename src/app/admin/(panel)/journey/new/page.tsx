import { requireAdmin } from "@/lib/require-admin";
import JourneyForm from "../journey-form";
import { createJourneyItem } from "../actions";

export default async function NewJourneyItemPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add journey item</h1>
      <JourneyForm action={createJourneyItem} submitLabel="Create journey item" />
    </div>
  );
}