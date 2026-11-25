import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import QloaxGeometricLogo from "@/components/shared/QloaxGeometricLogo";
import { projectHref, type Project } from "@/content/projects";

/** The original showcase card, filled with verified portfolio data. */
export default function ProjectCard({ project: p, priority = false }: { project: Project; priority?: boolean }) {
  const href = projectHref(p);
  const chips = (p.highlights ?? []).slice(0, 2).map((h) => h.title);

  const body = (
    <>
      <div className="relative h-48 w-full overflow-hidden bg-mist sm:h-56">
        {p.cover ? (
          <Image
            src={p.cover.src}
            alt={p.cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
            className="transform-gpu object-cover object-left-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // No verified screenshot exists (Forge 4.0): typographic panel, no invented imagery.
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy to-blue-deep">
            <span className="opacity-90 invert">
              <QloaxGeometricLogo fixed={false} size={72} />
            </span>
            <span className="font-display text-3xl font-semibold uppercase tracking-tight text-white">{p.title}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1 font-mono text-[11px] font-medium text-navy shadow-sm backdrop-blur-md">
          <Sparkles size={12} className="text-pink" />
          <span>{p.type}</span>
        </div>
        <div className="absolute bottom-3 right-3 rounded border border-line bg-surface/90 px-2.5 py-1 font-mono text-[10px] text-navy/70 shadow-sm backdrop-blur-md">
          NO. {p.index}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4 p-6 pt-2">
        <div className="space-y-2">
          <span className="block font-mono text-[11px] font-medium uppercase tracking-wider text-navy">{p.tags.slice(1).join(" · ") || p.tags[0]}</span>
          <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink transition-colors group-hover:text-navy">{p.title}</h3>
          <p className="line-clamp-2 font-mono text-xs text-navy/65">&quot;{p.summary}&quot;</p>
          {p.headline && <p className="line-clamp-2 text-xs leading-relaxed text-navy/80">{p.headline}</p>}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line pt-4 font-mono text-xs">
          <div className="flex flex-wrap gap-1">
            {chips.map((c) => (
              <span key={c} className="rounded border border-line bg-mist px-2 py-0.5 text-[10px] text-navy">
                {c}
              </span>
            ))}
          </div>
          {href && (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-navy transition-transform group-hover:translate-x-1">
              EXPLORE <ArrowUpRight size={14} />
            </span>
          )}
        </div>
      </div>
    </>
  );

  const cls =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-xl shadow-navy/[0.06] backdrop-blur-md transition-colors duration-300 hover:border-navy";

  return href ? (
    <Link href={href} className={cls} data-cursor="open">
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
