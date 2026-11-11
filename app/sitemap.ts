import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "products",
    "products/playtown",
    "products/edunisi",
    "about",
    "contact",
    "privacy",
    "terms",
  ].map((path) => ({
    url: `https://nisimin.com/${path}${path ? "/" : ""}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "products" ? 0.9 : 0.7,
  }));
}
