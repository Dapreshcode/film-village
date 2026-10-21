"use client";

import { useActionState } from "react";
import type { FormState } from "./actions";
import Field, { inputClass } from "@/components/admin/field";
import ImageUploadField from "@/components/admin/image-upload-field";
import MarkdownEditor from "@/components/admin/markdown-editor";

type StoryValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  category: string;
  dateLabel: string | null;
  imageUrl: string | null;
  sortOrder: number;
  featured: boolean;
  published: boolean;
};

export default function StoryForm({
  action,
  values,
  categories,
  submitLabel,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  values?: StoryValues;
  categories: string[];
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

      <Field label="Excerpt (short teaser shown on cards)" name="excerpt" errors={fe.excerpt}>
        <textarea id="excerpt" name="excerpt" defaultValue={values?.excerpt} rows={2} className={inputClass} required />
      </Field>

      <Field label="Story (leave a blank line between paragraphs)" name="content" errors={fe.content}>
       <MarkdownEditor folder="stories" defaultValue={values?.content}  errors={fe.content} />
      </Field>


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Category" name="category" errors={fe.category}>
          <input
            id="category"
            name="category"
            list="story-categories"
            defaultValue={values?.category}
            className={inputClass}
            required
          />
          <datalist id="story-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <Field label="Date label (e.g. March 2026)" name="dateLabel" errors={fe.dateLabel}>
          <input id="dateLabel" name="dateLabel" defaultValue={values?.dateLabel ?? ""} className={inputClass} />
        </Field>
      </div>

      <ImageUploadField
        folder="stories"
        defaultValue={values?.imageUrl}
        errors={fe.imageUrl}
      />

      <Field label="Display order (lower shows first)" name="sortOrder" errors={fe.sortOrder}>
        <input id="sortOrder" name="sortOrder" type="number" min={0} defaultValue={values?.sortOrder ?? 0} className={inputClass} />
      </Field>

      <div className="flex gap-6 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={values?.published ?? false} />
          Published (leave unchecked to keep as a draft)
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