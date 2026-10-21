import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import { togglePublished } from "./actions";

export default async function JourneyAdminPage() {
  await requireAdmin();

  const items = await prisma.journeyItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h1 className="text-2xl font-semibold">Journey</h1>
        <Link href="/admin/journey/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          Add journey item
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-sm opacity-70">No journey items yet.</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b text-xs uppercase opacity-70">
            <tr>
              <th className="py-2">Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Order</th>
              <th>Visibility</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 font-medium">{item.title}</td>
                <td>{item.dateLabel ?? "—"}</td>
                <td>{item.status.replaceAll("_", " ").toLowerCase()}</td>
                <td>{item.sortOrder}</td>
                <td>
                  <form action={togglePublished}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className="underline">
                      {item.published ? "Published · unpublish" : "Hidden · publish"}
                    </button>
                  </form>
                </td>
                <td className="text-right">
                  <Link href={`/admin/journey/${item.id}`} className="underline">Edit</Link>
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