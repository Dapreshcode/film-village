"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUploadField({
  folder,
  name = "imageUrl",
  label = "Image",
  defaultValue,
  errors,
}: {
  folder: "facilities" | "journey" | "stories" | "journal" | "founders";
  name?: string;
  label?: string;
  defaultValue?: string | null;
  errors?: string[];
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow choosing the same file again
    if (!file) return;

    setMessage(null);
    if (!TYPES.includes(file.type)) {
      setMessage("Please choose a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setMessage("That image is larger than 5 MB. Please choose a smaller one.");
      return;
    }

    setBusy(true);
    try {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
      const blob = await upload(`${folder}/${safeName}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        contentType: file.type,
      });
      setUrl(blob.url);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium">{label}</span>

      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="h-36 w-auto rounded border object-cover" />
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded border px-3 py-2 text-sm hover:bg-black/5">
          {busy ? "Uploading..." : url ? "Replace image" : "Upload image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFileChange}
            disabled={busy}
            className="hidden"
          />
        </label>
        {url && (
          <button type="button" onClick={() => setUrl("")} className="text-sm underline">
            Remove
          </button>
        )}
      </div>

      <input
        name={name}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="...or paste an image URL (/images/... or https://...)"
        className="w-full rounded border px-3 py-2 text-sm"
      />

      {message && <p className="text-xs text-red-600">{message}</p>}
      {errors?.map((er) => (
        <p key={er} className="text-xs text-red-600">{er}</p>
      ))}
    </div>
  );
}