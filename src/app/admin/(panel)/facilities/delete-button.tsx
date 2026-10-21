"use client";

import { deleteFacility } from "./actions";

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteFacility.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-sm text-red-600 underline">
        Delete facility
      </button>
    </form>
  );
}