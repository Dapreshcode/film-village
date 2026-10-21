import Link from "next/link";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import { togglePublished } from "./actions";

export default async function FacilitiesAdminPage() {
  await requireAdmin();

  const facilities = await prisma.facility.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold">Facilities</h1>
        <Link href="/admin/facilities/new" className="rounded bg-black px-4 py-2 text-sm text-white">
          Add facility
        </Link>
      </div>

      {facilities.length === 0 ? (
        <p className="text-sm opacity-70">No facilities yet.</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b text-xs uppercase opacity-70">
            <tr>
              <th className="py-2">Name</th>
              <th>Status</th>
              <th>Order</th>
              <th>Featured</th>
              <th>Visibility</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((f) => (
              <tr key={f.id} className="border-b">
                <td className="py-3 font-medium">{f.name}</td>
                <td>{f.status.replaceAll("_", " ").toLowerCase()}</td>
                <td>{f.sortOrder}</td>
                <td>{f.featured ? "Yes" : "No"}</td>
                <td>
                  <form action={togglePublished}>
                    <input type="hidden" name="id" value={f.id} />
                    <button type="submit" className="underline">
                      {f.published ? "Published · unpublish" : "Hidden · publish"}
                    </button>
                  </form>
                </td>
                <td className="text-right">
                  <Link href={`/admin/facilities/${f.id}`} className="underline">Edit</Link>
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