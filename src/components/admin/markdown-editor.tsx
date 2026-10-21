"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import MarkdownContent from "@/components/markdown-content";

const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function MarkdownEditor({
  folder,
  name = "content",
  label = "Story",
  defaultValue,
  errors,
}: {
  folder: "facilities" | "journey" | "stories" | "journal" | "founders";
  name?: string;
  label?: string;
  defaultValue?: string | null;
  errors?: string[];
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);

  function apply(next: string, selStart: number, selEnd: number) {
    setValue(next);
    requestAnimationFrame(() => {
      const ta = ref.current;
      if (!ta) return;
      ta.focus();
      ta.setSelectionRange(selStart, selEnd);
    });
  }

  function wrap(before: string, after: string, placeholder: string) {
    const ta = ref.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const e = ta.selectionEnd;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    apply(next, s + before.length, s + before.length + selected.length);
  }

  function linePrefix(prefix: string) {
    const ta = ref.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const e = ta.selectionEnd;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    apply(next, s + prefix.length, e + prefix.length);
  }

  async function onImageChosen(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    ev.target.value = "";
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

    const alt =
      window.prompt("Short description of the image (helps accessibility):", "") ?? "";

    setBusy(true);
    try {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
      const blob = await upload(`${folder}/${safeName}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        contentType: file.type,
      });

      const ta = ref.current;
      const pos = ta ? ta.selectionEnd : value.length;
      const cleanAlt = alt.replace(/[\[\]\n]/g, " ").trim() || "Image";
      const snippet = `\n\n![${cleanAlt}](${blob.url})\n\n`;
      apply(value.slice(0, pos) + snippet + value.slice(pos), pos + snippet.length, pos + snippet.length);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const tool = "rounded border px-2 py-1 text-xs hover:bg-black/5";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex gap-1 text-xs">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={`rounded px-2 py-1 ${tab === "write" ? "bg-black text-white" : "border"}`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`rounded px-2 py-1 ${tab === "preview" ? "bg-black text-white" : "border"}`}
          >
            Preview
          </button>
        </div>
      </div>

      {tab === "write" && (
        <>
          <div className="flex flex-wrap gap-1">
            <button type="button" className={tool} onClick={() => linePrefix("## ")}>Heading</button>
            <button type="button" className={tool} onClick={() => linePrefix("### ")}>Subheading</button>
            <button type="button" className={`${tool} font-bold`} onClick={() => wrap("**", "**", "bold text")}>B</button>
            <button type="button" className={`${tool} italic`} onClick={() => wrap("*", "*", "italic text")}>I</button>
            <button type="button" className={tool} onClick={() => wrap("[", "](https://)", "link text")}>Link</button>
            <button type="button" className={tool} onClick={() => linePrefix("- ")}>List</button>
            <button type="button" className={tool} onClick={() => linePrefix("> ")}>Quote</button>
            <label className={`${tool} cursor-pointer`}>
              {busy ? "Uploading..." : "Insert image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onImageChosen}
                disabled={busy}
                className="hidden"
              />
            </label>
          </div>

          <textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={18}
            className="w-full rounded border px-3 py-2 font-mono text-sm"
          />
          <p className="text-xs opacity-70">
            Leave a blank line between paragraphs. Place the cursor where you want a picture, then press
            Insert image.
          </p>
        </>
      )}

      {tab === "preview" && (
        <div className="min-h-[20rem] rounded border p-4">
          {value.trim() ? (
            <MarkdownContent source={value} />
          ) : (
            <p className="text-sm opacity-70">Nothing to preview yet.</p>
          )}
        </div>
      )}

      {/* The value that gets submitted. Kept outside the tabs so it is sent from either view. */}
      <input type="hidden" name={name} value={value} />

      {message && <p className="text-xs text-red-600">{message}</p>}
      {errors?.map((er) => (
        <p key={er} className="text-xs text-red-600">{er}</p>
      ))}
    </div>
  );
}