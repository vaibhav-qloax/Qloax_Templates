import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ImageReveal from "@/components/motion/ImageReveal";
import Reveal from "@/components/motion/Reveal";
import Screenshot from "@/components/work/Screenshot";
import { CASE_STUDIES } from "@/content/projects";

/**
 * "Engineered work": a clean editorial run of the six case studies.
 * Each row pairs the verified screenshot with the PDF's positioning and two build highlights.
 */
export default function SelectedWork() {
  const total = String(CASE_STUDIES.length).padStart(2, "0");

  return (
    <section id="case-studies" aria-labelledby="cases-title" className="border-t border-line bg-mist py-24 md:py-36">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-6 border-b border-line pb-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="eyebrow">Selected case studies</p>
            <h2 id="cases-title" className="h-section mt-5">
              Engineered work.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <p className="text-base leading-relaxed text-mute">
              Own products and client builds, each engineered around how the business actually works.
            </p>
          </Reveal>
        </div>

        <ol>
          {CASE_STUDIES.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={p.slug} className="grid grid-cols-1 gap-10 border-b border-line py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <div className="lg:sticky lg:top-28">
                    <Reveal>
                      <p className="font-mono text-[11px] text-mute">
                        {String(i + 1).padStart(2, "0")} / {total} · {p.tags.join(" · ")}
                      </p>
                      <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.02] tracking-tighter text-ink">
                        {p.title}
                      </h3>
                      <p className="mt-5 text-base leading-relaxed text-navy/80 md:text-lg">{p.headline}</p>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <ul className="mt-8 divide-y divide-line border-y border-line">
                        {(p.highlights ?? []).slice(0, 2).map((h) => (
                          <li key={h.title} className="py-4">
                            <p className="text-sm font-medium text-ink">{h.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-mute">{h.body}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link
                          href={`/work/${p.slug}`}
                          className="group inline-flex items-center gap-2 rounded-full border border-navy px-5 py-3 font-mono text-[11px] uppercase tracking-label text-navy transition-colors hover:bg-navy hover:text-surface"
                        >
                          Read the case study
                          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                        {p.status && <span className="font-mono text-[11px] uppercase tracking-label text-mute">{p.status}</span>}
                      </div>
                    </Reveal>
                  </div>
                </div>

                <div className={`lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
                  <Link href={`/work/${p.slug}`} className="group block" tabIndex={-1} aria-hidden data-cursor="view">
                    <ImageReveal>
                      <div className="transition-transform duration-700 ease-out group-hover:-translate-y-1">
                        <Screenshot shot={p.cover!} sizes="(min-width: 1024px) 55vw, 92vw" />
                      </div>
                    </ImageReveal>
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
