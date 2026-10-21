import { notFound } from "next/navigation";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import DeleteButton from "@/components/admin/delete-button";
import FounderQuoteForm from "../founder-quote-form";
import { updateFounderQuote, deleteFounderQuote } from "../actions";

export default async function EditFounderQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const quote = await prisma.founderQuote.findUnique({ where: { id } });
  if (!quote) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit founder quote</h1>
      <FounderQuoteForm
        action={updateFounderQuote.bind(null, quote.id)}
        values={quote}
        submitLabel="Save changes"
      />
      <div className="mt-10 border-t pt-6">
        <DeleteButton
          action={deleteFounderQuote.bind(null, quote.id)}
          label="Delete quote"
          confirmText="Delete this founder quote? This cannot be undone."
        />
      </div>
    </div>
  );
}