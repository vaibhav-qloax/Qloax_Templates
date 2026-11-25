import Link from "next/link";
import Wordmark from "./Wordmark";
import Reveal from "@/components/motion/Reveal";
import { CONTACT, NAV, SITE } from "@/content/site";
import { CASE_STUDIES } from "@/content/projects";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-site py-16 md:py-24">
        {/* Motto: one line, centred, sized to the container */}
        <Reveal>
          <p className="whitespace-nowrap text-center font-display text-[clamp(1.9rem,8.2vw,8.25rem)] font-medium uppercase leading-none tracking-tighter text-navy">
            {SITE.motto}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-12 md:mt-20 md:grid-cols-4 md:gap-x-10">
          <div className="col-span-2 md:col-span-1">
            <Wordmark size={40} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mute">
              Custom ERP, AI-native products, DPDP compliance technology and search-ready websites.
            </p>
          </div>

          <nav aria-label="Case studies">
            <p className="eyebrow">Work</p>
            <ul className="mt-5 space-y-3 text-sm">
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
            <ul className="mt-5 space-y-3 text-sm">
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
            <ul className="mt-5 space-y-3 text-sm text-navy">
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

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 md:mt-20 font-mono text-[11px] uppercase tracking-label text-mute sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} QLOAX · {CONTACT.office}</span>
          <a href="#top" className="link-underline text-navy">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
