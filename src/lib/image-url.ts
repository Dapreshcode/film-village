const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";
// Add other hosts here only if you also add them to next.config.ts
const EXTRA_HOSTS: string[] = [];

export function isAllowedImageUrl(value: string) {
  if (value === "") return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    return (
      url.hostname.endsWith(BLOB_HOST_SUFFIX) ||
      EXTRA_HOSTS.includes(url.hostname)
    );
  } catch {
    return false;
  }
}