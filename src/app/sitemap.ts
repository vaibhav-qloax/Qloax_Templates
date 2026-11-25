import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/content/projects";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...CASE_STUDIES.map((p) => ({
      url: `${SITE.url}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
