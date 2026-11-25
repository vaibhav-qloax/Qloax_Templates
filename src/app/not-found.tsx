import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-paper pt-24">
      <div className="container-site">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-tighter text-ink">
          This page isn&apos;t here.
        </h1>
        <Link href="/" className="link-underline mt-10 inline-block font-mono text-xs uppercase tracking-label text-navy">
          Back to QLOAX →
        </Link>
      </div>
    </section>
  );
}
