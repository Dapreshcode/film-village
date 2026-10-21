"use client";

import { useActionState } from "react";
import type { FormState } from "./actions";
import Field, { inputClass } from "@/components/admin/field";
import ImageUploadField from "@/components/admin/image-upload-field";

type JourneyValues = {
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  dateLabel: string | null;
  imageUrl: string | null;
  status: "COMPLETED" | "IN_PROGRESS" | "UPCOMING";
  sortOrder: number;
  featured: boolean;
  published: boolean;
};

export default function JourneyForm({
  action,
  values,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  values?: JourneyValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {} as FormState);
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {state.error && (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <Field label="Title" name="title" errors={fe.title}>
        <input id="title" name="title" defaultValue={values?.title} className={inputClass} required />
      </Field>

      <Field label="Slug (used in the page URL)" name="slug" errors={fe.slug}>
        <input id="slug" name="slug" defaultValue={values?.slug} className={inputClass} required />
      </Field>

      <Field label="Summary (short, shown on cards)" name="summary" errors={fe.summary}>
        <textarea id="summary" name="summary" defaultValue={values?.summary} rows={2} className={inputClass} required />
      </Field>

      <Field label="Full description" name="description" errors={fe.description}>
        <textarea id="description" name="description" defaultValue={values?.description ?? ""} rows={6} className={inputClass} />
      </Field>

      <Field label="Date label (e.g. Q2 2026, March 2027)" name="dateLabel" errors={fe.dateLabel}>
        <input id="dateLabel" name="dateLabel" defaultValue={values?.dateLabel ?? ""} className={inputClass} />
      </Field>

      <ImageUploadField
        folder="journey"
        defaultValue={values?.imageUrl}
        errors={fe.imageUrl}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Status" name="status" errors={fe.status}>
          <select id="status" name="status" defaultValue={values?.status ?? "UPCOMING"} className={inputClass}>
            <option value="COMPLETED">Completed</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="UPCOMING">Upcoming</option>
          </select>
        </Field>
        <Field label="Display order (lower shows first)" name="sortOrder" errors={fe.sortOrder}>
          <input id="sortOrder" name="sortOrder" type="number" min={0} defaultValue={values?.sortOrder ?? 0} className={inputClass} />
        </Field>
      </div>

      <div className="flex gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={values?.published ?? true} />
          Published
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={values?.featured ?? false} />
          Featured
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}