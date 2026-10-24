import { SITE_NAME, SITE_URL, LOGO_PATH, absoluteUrl } from "@/lib/site";
import { isAllowedImageUrl } from "@/lib/image-url";

type ArticleInput = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
};

export function buildArticleJsonLd(item: ArticleInput, section: "stories" | "journal") {
  const url = absoluteUrl(`/${section}/${item.slug}`);
  const sectionName = section === "stories" ? "Stories" : "Journal";
  const image =
    item.imageUrl && isAllowedImageUrl(item.imageUrl) ? absoluteUrl(item.imageUrl) : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: item.title.slice(0, 110),
        description: item.excerpt,
        image: image ? [image] : undefined,
        datePublished: item.publishedAt?.toISOString(),
        dateModified: item.updatedAt.toISOString(),
        articleSection: item.category,
        inLanguage: "en",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: absoluteUrl(LOGO_PATH) },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: sectionName, item: absoluteUrl(`/${section}`) },
          { "@type": "ListItem", position: 3, name: item.title, item: url },
        ],
      },
    ],
  };
}