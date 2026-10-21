import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/Prisma";
import { requireAdmin } from "@/lib/require-admin";
import DeleteButton from "@/components/admin/delete-button";
import { updateEnquiryStatus, deleteEnquiry } from "../actions";
import { STATUSES, STATUS_LABEL } from "../status";

const SIMPLE_EMAIL = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const enquiry = await prisma.partnerEnquiry.findUnique({ where: { id } });
  if (!enquiry) notFound();

  const canMail = SIMPLE_EMAIL.test(enquiry.email);
  const subject = encodeURIComponent(`Re: your ${enquiry.enquiryType} enquiry`);

  const received = enquiry.createdAt.toLocaleString("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  });

  return (
    <div className="max-w-2xl">
      <Link href="/admin/enquiries" className="text-sm underline">← Back to enquiries</Link>

      <h1 className="mb-1 mt-4 text-2xl font-semibold">{enquiry.name}</h1>
      <p className="mb-6 text-sm opacity-70">Received {received}</p>

      <dl className="mb-6 grid grid-cols-[8rem_1fr] gap-y-2 text-sm">
        <dt className="opacity-70">Email</dt>
        <dd>{enquiry.email}</dd>
        <dt className="opacity-70">Organisation</dt>
        <dd>{enquiry.organization ?? "—"}</dd>
        <dt className="opacity-70">Enquiry type</dt>
        <dd>{enquiry.enquiryType}</dd>
      </dl>

      <h2 className="mb-2 text-sm font-medium">Message</h2>
      <div className="mb-6 whitespace-pre-wrap break-words rounded border p-4 text-sm">
        {enquiry.message}
      </div>

      {canMail && (
        <a
          href={`mailto:${enquiry.email}?subject=${subject}`}
          className="mb-8 inline-block rounded border px-4 py-2 text-sm hover:bg-black/5"
        >
          Reply by email
        </a>
      )}

      <form
        action={updateEnquiryStatus.bind(null, enquiry.id)}
        className="mb-10 flex items-center gap-3"
      >
        <label htmlFor="status" className="text-sm font-medium">Status</label>
        <select
          id="status"
          name="status"
          defaultValue={enquiry.status}
          className="rounded border px-3 py-2 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
        <button type="submit" className="rounded bg-black px-4 py-2 text-sm text-white">
          Update status
        </button>
      </form>

      <div className="border-t pt-6">
        <DeleteButton
          action={deleteEnquiry.bind(null, enquiry.id)}
          label="Delete enquiry"
          confirmText="Delete this enquiry permanently? This cannot be undone."
        />
      </div>
    </div>
  );
}