import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/blog/admin", "/api/blog/", "/api/auth/"],
    },
    sitemap: "https://alcantinez.dev/sitemap.xml",
  };
}
