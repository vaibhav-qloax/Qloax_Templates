"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Diagram, { useInViewProgress } from "@/components/diagrams/Diagram";
import Reveal from "@/components/motion/Reveal";
import { getProject, type Diagram as DiagramData } from "@/content/projects";

type Chapter = {
  slug: string;
  diagram: DiagramData;
  heading: string;
  body: string;
};

/** Four chapters, each built only from PDF content of the project it belongs to. */
function chapters(): Chapter[] {
  const ovi = getProject("ovi-enterprises")!;
  const trace = getProject("traceability-erp")!;
  const privacy = getProject("privacy-os")!;
  return [
    { slug: ovi.slug, diagram: ovi.diagrams![0], heading: ovi.highlights![0].title, body: ovi.headline! },
    { slug: trace.slug, diagram: trace.diagrams![0], heading: trace.highlights![0].title, body: trace.headline! },
    {
      slug: trace.slug,
      diagram: trace.diagrams![1],
      heading: trace.storyTitle!,
      body: "Ask ERP, AI Stock Intelligence and AI Security Hub read the records. Dispatch and stock changes still need a person's sign-off.",
    },
    { slug: privacy.slug, diagram: privacy.diagrams![0], heading: privacy.highlights![2].title, body: privacy.highlights![2].body },
  ];
}

export default function SystemsStory() {
  const list = chapters();
  return (
    <section id="systems" aria-labelledby="systems-title" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">Inside the systems</p>
          <h2 id="systems-title" className="h-section mt-5 max-w-4xl">
            How the work actually flows
          </h2>
        </Reveal>
      </div>
      <div className="mt-10 md:mt-16">
        {list.map((c, i) => (
          <ChapterBlock key={`${c.slug}-${i}`} chapter={c} index={i} total={list.length} />
        ))}
      </div>
    </section>
  );
}

function ChapterBlock({ chapter, index, total }: { chapter: Chapter; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Desktop: the diagram advances with scroll through this chapter.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.5", "end end"] });
  // Small screens: the chapter is short, so the diagram plays once in view instead.
  const inView = useInViewProgress();
  const p = getProject(chapter.slug)!;

  return (
    <div ref={ref} className="lg:h-[150vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
      <div className="container-site grid w-full grid-cols-1 gap-8 border-t border-line py-12 lg:grid-cols-12 lg:items-center lg:gap-16 lg:border-t-0 lg:py-0">
        <div className="relative lg:col-span-5">
          {/* Large faint chapter number behind the text */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-32 hidden select-none lg:block font-display text-[10rem] font-medium leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(42,42,42,0.16)] lg:-top-52 lg:text-[13rem]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="font-mono text-[11px] text-mute">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {p.title}
          </p>
          <h3 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-tighter text-ink">
            {chapter.heading}
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-navy/80 md:text-lg">{chapter.body}</p>
          <Link href={`/work/${p.slug}`} className="link-underline mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-navy">
            Read the case study <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="lg:col-span-7">
          <div className="hidden lg:block">
            <Diagram diagram={chapter.diagram} progress={scrollYProgress} />
          </div>
          <div ref={inView.ref} className="lg:hidden">
            <Diagram diagram={chapter.diagram} progress={inView.progress} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
