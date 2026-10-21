import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import { togglePublished } from "./actions";

export default async function JournalAdminPage() {
  await requireAdmin();

  const entries = await prisma.journalEntry.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      category: true,
      featured: true,
      published: true,
      publishedAt: true,
    },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h1 className="text-2xl font-semibold">Journal</h1>
        <Link href="/admin/journal/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          Add entry
        </Link>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm opacity-70">No journal entries yet.</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b text-xs uppercase opacity-70">
            <tr>
              <th className="py-2">Title</th>
              <th>Category</th>
              <th>First published</th>
              <th>Featured</th>
              <th>Visibility</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b">
                <td className="py-3 font-medium">{e.title}</td>
                <td>{e.category}</td>
                <td>
                  {e.publishedAt
                    ? e.publishedAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td>{e.featured ? "Yes" : "No"}</td>
                <td>
                  <form action={togglePublished}>
                    <input type="hidden" name="id" value={e.id} />
                    <button type="submit" className="underline">
                      {e.published ? "Published · unpublish" : "Draft · publish"}
                    </button>
                  </form>
                </td>
                <td className="text-right">
                  <Link href={`/admin/journal/${e.id}`} className="underline">Edit</Link>
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