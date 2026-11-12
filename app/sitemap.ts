import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "products",
    "products/playtown",
    "products/edunisi",
    "about",
    "contact",
    // Draft legal pages are noindex until reviewed and finalized.
  ].map((path) => ({
    url: absoluteUrl(`/${path}${path ? "/" : ""}`),
  }));
}
