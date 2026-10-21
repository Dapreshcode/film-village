import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import { togglePublished } from "./actions";

export default async function StoriesAdminPage() {
  await requireAdmin();

  const stories = await prisma.story.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      category: true,
      dateLabel: true,
      featured: true,
      published: true,
    },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h1 className="text-2xl font-semibold">Stories</h1>
        <Link href="/admin/stories/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          Add story
        </Link>
      </div>

      {stories.length === 0 ? (
        <p className="text-sm opacity-70">No stories yet.</p>
      ) : (
         <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b text-xs uppercase opacity-70">
            <tr>
              <th className="py-2">Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Featured</th>
              <th>Visibility</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stories.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="py-3 font-medium">{s.title}</td>
                <td>{s.category}</td>
                <td>{s.dateLabel ?? "—"}</td>
                <td>{s.featured ? "Yes" : "No"}</td>
                <td>
                  <form action={togglePublished}>
                    <input type="hidden" name="id" value={s.id} />
                    <button type="submit" className="underline">
                      {s.published ? "Published · unpublish" : "Draft · publish"}
                    </button>
                  </form>
                </td>
                <td className="text-right">
                  <Link href={`/admin/stories/${s.id}`} className="underline">Edit</Link>
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