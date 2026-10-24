import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/json-ld";
import { SITE_NAME, SITE_URL, LOGO_PATH, absoluteUrl } from "@/lib/site";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "CFCV",
  url: SITE_URL,
  logo: absoluteUrl(LOGO_PATH),
  description:
    "A film and creatives village being built in Saakpenwa, Rivers State, Nigeria, as a home for African storytelling.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saakpenwa",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
  sameAs: [] as string[], // add your official social profile addresses
};

// inside the layout's JSX, next to <Navbar />:
<JsonLd data={organization} />

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}