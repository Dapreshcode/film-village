import { requireAdmin } from "@/lib/require-admin";
import FacilityForm from "../facility-form";
import { createFacility } from "../actions";

export default async function NewFacilityPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Add facility</h1>
      <FacilityForm action={createFacility} submitLabel="Create facility" />
    </div>
  );
}