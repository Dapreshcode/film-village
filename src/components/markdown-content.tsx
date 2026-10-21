import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { isAllowedImageUrl } from "@/lib/image-url";

const components: Components = {
  // The page title is the h1, so body headings start at h2
  h1: ({ children }) => (
    <h2 className="mb-4 mt-10 text-3xl font-semibold">{children}</h2>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 text-3xl font-semibold">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-2xl font-semibold">{children}</h3>
  ),
  p: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="my-4 list-disc space-y-1 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 list-decimal space-y-1 pl-6">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 pl-4 italic opacity-80">{children}</blockquote>
  ),
  hr: () => <hr className="my-8" />,
  a: ({ href, children }) => {
    const ok =
      typeof href === "string" &&
      (/^(https?:|mailto:)/i.test(href) || href.startsWith("/") || href.startsWith("#"));
    if (!ok) return <span>{children}</span>;
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className="underline"
        {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    if (typeof src !== "string" || src === "" || !isAllowedImageUrl(src)) return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt ?? ""} loading="lazy" className="my-8 h-auto w-full rounded-lg" />
    );
  },
};

export default function MarkdownContent({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  );
}