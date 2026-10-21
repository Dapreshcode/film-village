"use client";

import { useActionState } from "react";
import type { FormState } from "./actions";
import Field, { inputClass } from "@/components/admin/field";
import ImageUploadField from "@/components/admin/image-upload-field";

type QuoteValues = {
  text: string;
  imageUrl: string;
  sortOrder: number;
  published: boolean;
};

export default function FounderQuoteForm({
  action,
  values,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  values?: QuoteValues;
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

      <Field label="Quote" name="text" errors={fe.text}>
        <textarea
          id="text"
          name="text"
          defaultValue={values?.text}
          rows={6}
          maxLength={1200}
          className={inputClass}
          required
        />
      </Field>

      <ImageUploadField
        folder="founders"
        label="Founder photo"
        defaultValue={values?.imageUrl}
        errors={fe.imageUrl}
      />

      <Field label="Display order (lower shows first)" name="sortOrder" errors={fe.sortOrder}>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={values?.sortOrder ?? 0}
          className={inputClass}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={values?.published ?? true} />
        Published
      </label>

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