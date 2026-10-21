"use client";

import { useActionState } from "react";
import type { FormState } from "./actions";
import ImageUploadField from "@/components/admin/image-upload-field";

type FacilityValues = {
  name: string;
  slug: string;
  summary: string;
  description: string | null;
  category: string | null;
  imageUrl: string | null;
  features: string[];
  status: "PLANNED" | "IN_DEVELOPMENT" | "COMING_SOON";
  sortOrder: number;
  featured: boolean;
  published: boolean;
};

const input = "w-full rounded border px-3 py-2 text-sm";

function Field({
  label,
  name,
  errors,
  children,
}: {
  label: string;
  name: string;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
      {errors?.map((e) => (
        <span key={e} className="mt-1 block text-xs text-red-600">{e}</span>
      ))}
    </label>
  );
}

export default function FacilityForm({
  action,
  values,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  values?: FacilityValues;
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

      <Field label="Name" name="name" errors={fe.name}>
        <input id="name" name="name" defaultValue={values?.name} className={input} required />
      </Field>

      <Field label="Slug (used in the page URL)" name="slug" errors={fe.slug}>
        <input id="slug" name="slug" defaultValue={values?.slug} className={input} required />
      </Field>

      <Field label="Summary (short, shown on cards)" name="summary" errors={fe.summary}>
        <textarea id="summary" name="summary" defaultValue={values?.summary} rows={2} className={input} required />
      </Field>

      <Field label="Full description" name="description" errors={fe.description}>
        <textarea id="description" name="description" defaultValue={values?.description ?? ""} rows={6} className={input} />
      </Field>

      <Field label="Category" name="category" errors={fe.category}>
        <input id="category" name="category" defaultValue={values?.category ?? ""} className={input} />
      </Field>

      <Field label="Image URL" name="imageUrl" errors={fe.imageUrl}>
       <ImageUploadField folder="facilities" defaultValue={values?.imageUrl}   errors={fe.imageUrl}
/>
  
      </Field>

      <Field label="Features (one per line)" name="features" errors={fe.features}>
        <textarea id="features" name="features" defaultValue={values?.features.join("\n")} rows={5} className={input} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Status" name="status" errors={fe.status}>
          <select id="status" name="status" defaultValue={values?.status ?? "PLANNED"} className={input}>
            <option value="PLANNED">Planned</option>
            <option value="IN_DEVELOPMENT">In development</option>
            <option value="COMING_SOON">Coming soon</option>
          </select>
        </Field>
        <Field label="Display order (lower shows first)" name="sortOrder" errors={fe.sortOrder}>
          <input id="sortOrder" name="sortOrder" type="number" min={0} defaultValue={values?.sortOrder ?? 0} className={input} />
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