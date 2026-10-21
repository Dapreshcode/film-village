import { notFound } from "next/navigation";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import FacilityForm from "../facility-form";
import DeleteButton from "../delete-button";
import { updateFacility } from "../actions";

export default async function EditFacilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const facility = await prisma.facility.findUnique({ where: { id } });
  if (!facility) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit facility</h1>
      <FacilityForm
        action={updateFacility.bind(null, facility.id)}
        values={facility}
        submitLabel="Save changes"
      />
      <div className="mt-10 border-t pt-6">
        <DeleteButton id={facility.id} name={facility.name} />
      </div>
    </div>
  );
}