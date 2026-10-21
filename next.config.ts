import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  remotePatterns: [
    // ...your existing entries
    { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
  ],
},
};

export default nextConfig;
