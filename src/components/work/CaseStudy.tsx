import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ImageReveal from "@/components/motion/ImageReveal";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import Screenshot from "./Screenshot";
import InViewDiagram from "./InViewDiagram";
import { nextCaseStudy, type Extra, type Project, type Shot } from "@/content/projects";

export default function CaseStudy({ project: p }: { project: Project }) {
  const next = nextCaseStudy(p.slug);
  const desktopShots = (p.gallery ?? []).filter((s) => s.device !== "phone");
  const phoneShots = (p.gallery ?? []).filter((s) => s.device === "phone");

  return (
    <article>
      {/* 1–2. Introduction and category */}
      <header className="bg-paper pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="container-site">
          <Link href="/#work" className="link-underline inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-navy">
            <ArrowLeft size={14} /> All work
          </Link>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="eyebrow">
                {p.index} · {p.tags.join(" · ")}
              </p>
              <LineReveal
                as="h1"
                trigger="mount"
                lines={[p.title]}
                className="mt-5 font-display text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.92] tracking-tighter text-ink"
              />
              {p.headline && (
                <Reveal delay={0.25}>
                  <p className="mt-8 max-w-3xl font-display text-[clamp(1.25rem,2.2vw,1.9rem)] font-medium leading-snug tracking-tight text-navy">
                    {p.headline}
                  </p>
                </Reveal>
              )}
            </div>
            <Reveal delay={0.35} className="lg:col-span-4 lg:pt-10">
              <dl className="divide-y divide-line border-y border-line text-sm">
                <Fact label="Type" value={p.type.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())} />
                <Fact label="Portfolio line" value={p.summary} />
                {p.status && <Fact label="Status" value={p.status} />}
                {p.link && (
                  <div className="flex justify-between gap-6 py-3">
                    <dt className="text-mute">Live</dt>
                    <dd>
                      <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 text-navy">
                        {p.link.href.replace("https://", "")} <ArrowUpRight size={13} />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>
        </div>
      </header>

      {/* 3. Main verified visual */}
      {p.cover && (
        <div className="bg-paper pb-20">
          <div className="container-site">
            <ImageReveal>
              <Screenshot shot={p.cover} sizes="(min-width: 1408px) 1280px, 92vw" priority />
            </ImageReveal>
          </div>
        </div>
      )}

      {/* 4–6. What was built */}
      {p.highlights && (
        <section aria-labelledby="built-title" className="border-t border-line bg-mist py-20 md:py-28">
          <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">{p.index} · {p.title}</p>
                <h2 id="built-title" className="mt-4 font-display text-3xl font-medium tracking-tighter text-ink md:text-4xl">
                  What was built
                </h2>
              </div>
            </div>
            <ol className="lg:col-span-8">
              {p.highlights.map((h, i) => (
                <Reveal as="li" key={h.title} delay={i * 0.05} className="grid grid-cols-12 gap-x-4 border-t border-line py-7 last:border-b">
                  <span className="col-span-2 font-mono text-[11px] text-blue sm:col-span-1">0{i + 1}</span>
                  <h3 className="col-span-10 font-display text-2xl font-medium tracking-tight text-ink sm:col-span-5">{h.title}</h3>
                  <p className="col-span-10 col-start-3 mt-2 text-base leading-relaxed text-navy/80 sm:col-span-6 sm:col-start-auto sm:mt-0">{h.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 7. Workflow visualisation */}
      {p.diagrams?.length ? (
        <section aria-label="Workflow" className="border-t border-line bg-paper py-20 md:py-28">
          <div className={`container-site grid grid-cols-1 gap-8 ${p.diagrams.length > 1 ? "lg:grid-cols-2" : ""}`}>
            {p.diagrams.map((d) => (
              <InViewDiagram key={d.kind + d.title} diagram={d} />
            ))}
          </div>
        </section>
      ) : null}

      {/* 8. Additional verified screenshots */}
      {desktopShots.length > 0 && (
        <section aria-labelledby="story-title" className="border-t border-line bg-mist py-20 md:py-28">
          <div className="container-site">
            <Reveal>
              <p className="eyebrow">In detail</p>
              <h2 id="story-title" className="h-section mt-4 max-w-4xl">
                {p.storyTitle}
              </h2>
            </Reveal>
            <div className="mt-16 space-y-20 md:space-y-28">
              {desktopShots.map((s, i) => (
                <GalleryRow key={s.src} shot={s} flip={i % 2 === 1} />
              ))}
            </div>
            {phoneShots.length > 0 && (
              <div className="mt-20 grid grid-cols-1 items-center gap-10 border-t border-line pt-16 md:grid-cols-12">
                {phoneShots.map((s) => (
                  <div key={s.src} className="md:col-span-4">
                    <Reveal>
                      <Screenshot shot={s} sizes="17rem" />
                    </Reveal>
                  </div>
                ))}
                <div className="md:col-span-7 md:col-start-6">
                  {phoneShots.map((s) => (
                    <Reveal key={s.src}>
                      {s.label && <p className="font-mono text-[11px] text-blue">{s.label}</p>}
                      <h3 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink">{s.title}</h3>
                      {s.caption && <p className="mt-3 max-w-md text-base leading-relaxed text-navy/80">{s.caption}</p>}
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. Supporting details from the PDF */}
      {p.extras?.length ? (
        <section aria-label="Details" className="border-t border-line bg-paper py-20 md:py-28">
          <div className="container-site grid grid-cols-1 gap-12 md:grid-cols-2">
            {p.extras.map((e, i) => (
              <Reveal key={i} delay={i * 0.05} className={e.kind === "timeline" || e.kind === "disclaimer" ? "md:col-span-2" : ""}>
                <ExtraBlock extra={e} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* 11. Next project */}
      <Link href={`/work/${next.slug}`} className="group block border-t border-line bg-navy text-white">
        <div className="container-site grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <p className="eyebrow text-white/60">Next project · {next.index}</p>
            <p className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.92] tracking-tighter transition-transform duration-700 ease-out group-hover:translate-x-3">
              {next.title}
            </p>
            <p className="mt-4 max-w-md text-white/70">{next.summary}</p>
          </div>
          {next.cover && (
            <div className="overflow-hidden rounded-2xl border border-white/15 md:col-span-5">
              <Image
                src={next.cover.src}
                alt=""
                width={next.cover.width}
                height={next.cover.height}
                sizes="(min-width: 768px) 40vw, 90vw"
                className="h-auto w-full transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-3">
      <dt className="text-mute">{label}</dt>
      <dd className="text-right text-navy">{value}</dd>
    </div>
  );
}

function GalleryRow({ shot, flip }: { shot: Shot; flip: boolean }) {
  return (
    <figure className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-8 ${flip ? "lg:order-2" : ""}`}>
        <ImageReveal>
          <Screenshot shot={shot} sizes="(min-width: 1024px) 60vw, 92vw" />
        </ImageReveal>
      </div>
      <figcaption className={`lg:col-span-4 ${flip ? "lg:order-1" : ""}`}>
        <Reveal>
          {shot.label && <p className="font-mono text-[11px] text-blue">{shot.label}</p>}
          <h3 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink">{shot.title}</h3>
          {shot.caption && <p className="mt-4 text-base leading-relaxed text-navy/80">{shot.caption}</p>}
        </Reveal>
      </figcaption>
    </figure>
  );
}

function ExtraBlock({ extra: e }: { extra: Extra }) {
  switch (e.kind) {
    case "list":
      return (
        <div>
          <p className="eyebrow">{e.title}</p>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {e.items.map((x) => (
              <li key={x} className="py-3 text-base text-navy">
                {x}
              </li>
            ))}
          </ul>
        </div>
      );
    case "note":
      return (
        <div className="border-l-2 border-amber pl-5">
          <p className="eyebrow">{e.title}</p>
          <p className="mt-4 font-display text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">{e.body}</p>
          {e.link && (
            <a href={e.link.href} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-flex items-center gap-1 text-sm text-blue">
              {e.link.label} <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      );
    case "timeline":
      return (
        <div>
          <p className="eyebrow">{e.title}</p>
          <ol className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
            {e.items.map((x) => (
              <li key={x.label} className="bg-surface p-5">
                <span className="font-mono text-[11px] uppercase tracking-label text-blue">{x.label}</span>
                <span className="mt-6 block font-display text-xl font-medium tracking-tight text-ink">{x.value}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "disclaimer":
      return (
        <p role="note" className="rounded-2xl border border-navy/30 bg-surface p-5 text-sm leading-relaxed text-navy">
          {e.body}
        </p>
      );
    case "quote":
      return <blockquote className="font-display text-2xl text-ink">{e.body}</blockquote>;
  }
}
