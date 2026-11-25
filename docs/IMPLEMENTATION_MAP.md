# QLOAX website: implementation map (final)

Source of truth for facts: `QLOAXPortfolio26.pdf`.
Source of truth for visuals: the PDF's own screenshots, extracted unmodified into `public/work/<project>/`.
All copy lives in `src/content/site.ts` and `src/content/projects.ts`; components only render it.

## Homepage, top to bottom

| Section | Component | Content (PDF page) | Motion and interaction | Mobile |
|---|---|---|---|---|
| Navbar | `site/Navbar.tsx` | Nav, contact CTA | Compacts on scroll; Work mega-menu; full-screen menu with focus trap | Menu button |
| Hero | `home/Hero.tsx`, `hero/LatticeFigure.tsx` | Cover copy (p.1), Fig. 01 drawn in code | Lattice builds cube by cube; pins show Problems / Workload / Technology / Chaos, then hide; hover lifts nearby cubes; drag any cube, it springs back | Figure dimmed behind copy; no drag |
| Brand band | `home/BrandBand.tsx` | Outlined QLOAX wordmark | Scroll-linked fill | Same |
| Who we are | `home/WhoWeAre.tsx`, `iso/FormedCell.tsx` | p.2 positioning, Fig. 02 | Pinned scroll assembles the cell; labels settle onto pins | Plays once in view |
| Capabilities | `home/Capabilities.tsx` | Four capabilities (p.2) | Hover / click / arrow keys switch the framed screenshot | Stacked |
| Portfolio | `home/ProductShowcase.tsx`, `home/ProjectCard.tsx` | All seven entries (p.3) | Original scroll showcase: cards replace in place, text line flows behind | Stacked cards |
| How the work flows | `home/SystemsStory.tsx`, `diagrams/Diagram.tsx` | OVI flow, five-station chain, AI guardrails, privacy boundary (p.7–p.13) | Pinned chapters; diagrams advance with scroll | Play once in view |
| Industries | `home/Industries.tsx` | Six industries (p.17) | Hover/focus switches related work and screenshot | Stacked |
| Why QLOAX | `home/Principles.tsx` | Four principles (p.17) | Line and text reveals | Same |
| How we work | `home/Process.tsx`, `iso/ProcessSketch.tsx` | Five steps + support (p.16) | Scroll fills the step line; a sketch draws for each step | Vertical timeline |
| Next step | `home/CTA.tsx`, `iso/NextCell.tsx` | p.18 layout, Fig. 04 | Static cell; faint lines flow along the grid to the button from every side; tap the background to start one; button rings on arrival | Stacked |
| Footer | `site/Footer.tsx` | Motto, links, contact | Reveal | Two columns |

## Case-study pages (`/work/[slug]`)

Six pages: School ERP, OVI Enterprises ERP, Traceability ERP + AI, Skillitrix, Qloax Privacy OS, Strategically Built Websites.
Each has: intro and facts, main screenshot, what was built, workflow diagram where the PDF has one, gallery with PDF captions, PDF extras (also inside, guardrails, roadmap, disclaimer, seven-day plan), next project.

## Screenshot coverage

All 24 project screenshots in the PDF are used. One is excluded on purpose: the Privacy OS Evidence Ledger screen, labelled "INTERNAL-ONLY, must never be exposed externally" and showing an error.

## Open items for the QLOAX team

1. Forge 4.0 has no detail or screenshots in the PDF; it appears as a card with no case-study page.
2. Confirm permission to show the OVI screenshots, which include order values and customer names.
3. Confirm "30+ websites", "75+ modules", "Websites in 7 days", and naming VP Construction.
4. Unused legacy files still to delete (deletion was blocked by tool permissions): `src/templates/`, `src/data/`, `src/components/hero/HeroFrameSequence.tsx`, `src/components/shared/{GradientBlinds,InitialVideoSplash,LiquidEther}.tsx`, `public/frames/`, `FRAMES/`, `public/video/`, `public/brand/fig-02-cell.jpg`. After that, the `three`, `ogl` and `@types/three` dependencies can be uninstalled.
