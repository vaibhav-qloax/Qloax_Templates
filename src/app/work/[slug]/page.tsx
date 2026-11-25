import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/work/CaseStudy";
import { CASE_STUDIES, getProject } from "@/content/projects";
import { SITE } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p || !p.hasCaseStudy) return {};
  const description = p.seoDescription ?? p.summary;
  return {
    title: p.title,
    description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: "article",
      title: `${p.title} · QLOAX`,
      description,
      url: `/work/${p.slug}`,
      images: p.cover ? [{ url: p.cover.src, width: p.cover.width, height: p.cover.height, alt: p.cover.alt }] : undefined,
    },
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p || !p.hasCaseStudy) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.seoDescription ?? p.summary,
    url: `${SITE.url}/work/${p.slug}`,
    image: p.cover ? `${SITE.url}${p.cover.src}` : undefined,
    creator: { "@type": "Organization", name: "QLOAX", url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy project={p} />
    </>
  );
}
