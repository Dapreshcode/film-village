export const inputClass = "w-full rounded border px-3 py-2 text-sm";

export default function Field({
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