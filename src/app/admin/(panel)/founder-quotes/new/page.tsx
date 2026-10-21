import { requireAdmin } from "@/lib/require-admin";
import FounderQuoteForm from "../founder-quote-form";
import { createFounderQuote } from "../actions";

export default async function NewFounderQuotePage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add founder quote</h1>
      <FounderQuoteForm action={createFounderQuote} submitLabel="Create quote" />
    </div>
  );
}