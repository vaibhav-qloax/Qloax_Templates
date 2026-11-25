"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Wordmark from "./Wordmark";
import { NAV } from "@/content/site";
import { PROJECTS, projectHref } from "@/content/projects";
import { getLenis } from "@/components/shared/LenisProvider";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setWorkOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Mobile menu: lock scroll, focus the first link, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    menuPanel.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && menuPanel.current) {
        const items = menuPanel.current.querySelectorAll<HTMLElement>("a,button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!workOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWorkOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [workOpen]);

  const openWork = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setWorkOpen(true);
  }, []);
  const closeWorkSoon = useCallback(() => {
    closeTimer.current = window.setTimeout(() => setWorkOpen(false), 140);
  }, []);

  const onWorkPage = pathname?.startsWith("/work");
  const solid = scrolled || workOpen || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ease-out ${
        solid ? "border-b border-line bg-paper/90 py-2.5 backdrop-blur-md" : "border-b border-transparent py-5"
      }`}
    >
      <div className="container-site flex items-center justify-between">
        <Link href="/" aria-label="QLOAX home" className="-ml-2 rounded-sm">
          <Wordmark size={solid ? 38 : 44} />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <div onPointerEnter={openWork} onPointerLeave={closeWorkSoon}>
            <button
              type="button"
              aria-expanded={workOpen}
              aria-controls="work-menu"
              onClick={() => setWorkOpen((v) => !v)}
              className={`link-underline font-mono text-[11px] uppercase tracking-label ${
                onWorkPage ? "text-blue" : "text-navy"
              }`}
            >
              Work
            </button>
            {/* Desktop Work mega-menu */}
            <AnimatePresence>
              {workOpen && (
                <motion.div
                  id="work-menu"
                  onPointerEnter={openWork}
                  onPointerLeave={closeWorkSoon}
                  initial={reduce ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-x-0 top-full hidden border-b border-line bg-paper lg:block"
                >
                  <ul className="container-site grid grid-cols-4 gap-x-8 py-8">
                    {PROJECTS.map((p, i) => {
                      const href = projectHref(p);
                      const inner = (
                        <>
                          <span className="font-mono text-[11px] text-mute">{p.index}</span>
                          <span className="mt-2 block font-display text-lg font-medium tracking-tight text-ink">{p.title}</span>
                          <span className="mt-1 block text-sm leading-snug text-mute">{p.summary}</span>
                        </>
                      );
                      return (
                        <motion.li
                          key={p.slug}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: EASE, delay: 0.03 * i }}
                          className="border-t border-line py-4"
                        >
                          {href ? (
                            <Link href={href} className="group block" onClick={() => setWorkOpen(false)}>
                              {inner}
                            </Link>
                          ) : (
                            <div>{inner}</div>
                          )}
                        </motion.li>
                      );
                    })}
                    <li className="border-t border-line py-4">
                      <Link href="/#work" onClick={() => setWorkOpen(false)} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-blue">
                        The full portfolio <ArrowUpRight size={14} />
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {NAV.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="link-underline font-mono text-[11px] uppercase tracking-label text-navy">
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 font-mono text-[11px] uppercase tracking-label text-white transition-colors hover:bg-blue"
          >
            Let&apos;s talk
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={menuButton}
          type="button"
          className="relative z-[60] -mr-2 flex h-11 items-center gap-3 px-2 font-mono text-[11px] uppercase tracking-label text-navy lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
          <span aria-hidden className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-navy transition-transform duration-300 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-px w-5 bg-navy transition-transform duration-300 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuPanel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] overflow-y-auto bg-paper pt-24 lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="container-site pb-12">
              <ul>
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <Link href={item.href} onClick={() => setMenuOpen(false)} className="flex items-baseline justify-between py-4 font-display text-4xl font-medium tracking-tight text-ink">
                      {item.label}
                      <span className="font-mono text-[11px] text-mute">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="eyebrow mt-10">Case studies</p>
              <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {PROJECTS.filter((p) => p.hasCaseStudy).map((p) => (
                  <li key={p.slug} className="border-b border-line">
                    <Link href={`/work/${p.slug}`} onClick={() => setMenuOpen(false)} className="block py-3 text-base text-navy">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/#contact" onClick={() => setMenuOpen(false)} className="mt-10 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-4 font-mono text-xs uppercase tracking-label text-white">
                Let&apos;s map your process <ArrowUpRight size={14} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
