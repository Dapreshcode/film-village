import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import { isAllowedImageUrl } from "@/lib/image-url";
import { togglePublished } from "./actions";

export default async function FounderQuotesAdminPage() {
  await requireAdmin();

  const quotes = await prisma.founderQuote.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Founder quotes</h1>
        <Link href="/admin/founder-quotes/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          Add quote
        </Link>
      </div>

      {quotes.length === 0 ? (
        <p className="text-sm opacity-70">No founder quotes yet.</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b text-xs uppercase opacity-70">
            <tr>
              <th className="py-2">Photo</th>
              <th>Quote</th>
              <th>Order</th>
              <th>Visibility</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b align-top">
                <td className="py-3 pr-3">
                  {isAllowedImageUrl(q.imageUrl) && q.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={q.imageUrl} alt="" className="h-14 w-14 rounded object-cover" />
                  ) : (
                    <div className="h-14 w-14 rounded border" />
                  )}
                </td>
                <td className="max-w-md py-3 pr-3">
                  {q.text.length > 140 ? `${q.text.slice(0, 140)}…` : q.text}
                </td>
                <td className="py-3">{q.sortOrder}</td>
                <td className="py-3">
                  <form action={togglePublished}>
                    <input type="hidden" name="id" value={q.id} />
                    <button type="submit" className="underline">
                      {q.published ? "Published · unpublish" : "Hidden · publish"}
                    </button>
                  </form>
                </td>
                <td className="py-3 text-right">
                  <Link href={`/admin/founder-quotes/${q.id}`} className="underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}