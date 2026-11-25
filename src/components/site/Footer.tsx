import Link from "next/link";
import Wordmark from "./Wordmark";
import Reveal from "@/components/motion/Reveal";
import { CONTACT, NAV, SITE } from "@/content/site";
import { CASE_STUDIES } from "@/content/projects";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-site py-16 md:py-24">
        <Reveal>
          <p className="font-display text-[clamp(2.5rem,8vw,7.5rem)] font-medium uppercase leading-[0.9] tracking-tighter text-navy">
            {SITE.motto}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Wordmark size={40} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
              Custom ERP, AI-native products, DPDP compliance technology and search-ready websites.
            </p>
          </div>

          <nav aria-label="Case studies">
            <p className="eyebrow">Work</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CASE_STUDIES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`} className="link-underline text-navy">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="eyebrow">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-navy">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#contact" className="link-underline text-navy">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-navy">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-underline">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="link-underline">
                  {CONTACT.phone}
                </a>
              </li>
              <li>{CONTACT.office}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-label text-mute sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} QLOAX · {CONTACT.office}</span>
          <a href="#top" className="link-underline text-navy">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
