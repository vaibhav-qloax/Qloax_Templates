import Image from "next/image";
import type { Shot } from "@/content/projects";

/**
 * Frames a verified project screenshot without altering it.
 * Desktop shots get a thin window bar; phone shots get a narrow rounded frame.
 */
export default function Screenshot({
  shot,
  sizes,
  priority = false,
  className = "",
}: {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (shot.device === "phone") {
    return (
      <div className={`mx-auto w-full max-w-[17rem] overflow-hidden rounded-[1.6rem] border-[6px] border-ink bg-ink ${className}`}>
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="17rem" priority={priority} className="h-auto w-full rounded-[1.1rem]" />
      </div>
    );
  }
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-navy/[0.06] ${className}`}>
      <div aria-hidden className="flex items-center gap-1.5 border-b border-line bg-mist px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        {shot.label && (
          <span className="ml-3 font-mono text-[10px] uppercase tracking-label text-mute">
            {shot.label}
            {shot.title ? ` · ${shot.title}` : ""}
          </span>
        )}
      </div>
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} priority={priority} className="h-auto w-full" />
    </div>
  );
}
