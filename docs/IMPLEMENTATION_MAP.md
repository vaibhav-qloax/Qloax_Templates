# QLOAX website upgrade: implementation map

Source of truth for facts: `QLOAXPortfolio26.pdf` (18 pages, October 2026).
Source of truth for visuals: the screenshots embedded in that PDF, extracted unmodified into `public/work/<project>/` and `public/brand/`.

## Section-by-section map

| Existing section | Decision | Reason | PDF source | New interaction / animation | Data source | Asset source | Responsive behaviour |
|---|---|---|---|---|---|---|---|
| Navbar (T1Navbar) | **Keep + upgrade (A)** | Structure and compact-on-scroll are good. Links were hidden on mobile with no menu, and pointed at sections being removed. | p.1, p.18 (contact) | Compact-on-scroll, Work mega-menu listing all seven entries, staggered mobile menu, active-section state | `content/site.ts`, `content/projects.ts` | Existing SVG mark | Full-screen menu under 1024px, Escape and focus handling |
| Hero (T1Hero + 159-frame canvas) | **Rework (C)** | Copy was invented ("Engineering intelligence…autonomous robotics"). The 17 MB frame sequence is stock footage in teal/pink neon and forced 450vh of scrolling. | p.1 cover | Ordered entrance: lattice, eyebrow, masked headline lines, text, CTAs. Pointer parallax on the figure. | `site.hero` | `brand/fig-01-lattice.jpg` (PDF cover art) | 100svh, no scroll-jacking, parallax off on touch and reduced motion |
| Big outlined "QLOAX." moment | **Keep (A)** | A strong brand moment from the existing hero. | Brand | Scroll-linked stroke-to-fill reveal, now a short band instead of 450vh | n/a | Type only | Scales with viewport |
| Continuous Story | **Rework (C)** | All four stages were invented claims. | p.2 | Becomes "Who we are": sticky headline, word-by-word reveal | `site.about` | `brand/fig-02-cell.jpg` | Sticky only from lg up |
| Capabilities | **Upgrade (B)** | The selector concept is good. Content and Unsplash images were invented. | p.2 | Keyboard-accessible tablist, image crossfade, related-work links | `site.capabilities` | Matching PDF screenshots | Accordion-like stack on mobile |
| Products (fake ecosystem) | **Remove (C)** | FORGE/INTERVUAI/REVGEN copy and images were invented. | n/a | n/a | n/a | n/a | n/a |
| Selected Work (6 fake case studies) | **Rework (C)** | EduNexus 45,000 students, QChain 2.4M shipments etc. are not in the PDF. | p.3 index | Editorial index of all seven entries, cursor-following screenshot preview on desktop | `content/projects.ts` | PDF screenshots | Inline thumbnails on touch |
| (missing) Systems in motion | **Add (D)** | The PDF's workflows are the best proof of engineering depth. | p.7, p.8, p.9, p.12 | Sticky chapter diagrams: OVI flow, five-station chain, AI guardrails, privacy boundary | `content/projects.ts` | SVG/HTML diagrams | Diagrams inline per chapter on mobile |
| (missing) Industries | **Add (D)** | Six industries listed in the PDF. | p.17 | Hover/focus switches panel with crossfade | `site.industries` | Related PDF screenshots, brand figure fallback | Stacked list on mobile |
| (missing) Why QLOAX | **Add (D)** | Four principles. | p.17 | Numbered editorial rows with line reveal | `site.principles` | Type only | Single column |
| (missing) How we work | **Add (D)** | Five steps and long-term support. | p.16 | Scroll-linked progress through Discover → Support | `site.process` | Type only | Vertical timeline on mobile |
| CTA | **Rework (C)** | Invented email (engineering@), "under 4 hours", "Global / Hybrid". | p.18 | Masked headline, contact grid | `site.contact`, `site.cta` | `brand/fig-04-next-cell.jpg` | Single column |
| Footer | **Upgrade (B)** | Old tagline and dead anchors. | p.1, p.18 | Restrained reveal, link underline hover | `content/*` | SVG mark | Stacked |
| Custom cursor (global, `cursor: none`) | **Remove** | Replaced the system cursor site-wide. Mouse interaction is now limited to the work preview and hero parallax. | n/a | n/a | n/a | n/a | n/a |
| Video splash | **Remove** | Only ran on `/templates/*` routes that no longer exist. | n/a | n/a | n/a | n/a | n/a |
| (missing) Case study pages | **Add (D)** | `/work/[slug]` for six entries with verified material. | p.4–p.15 | Image clip reveals, sticky facts, workflow diagrams, gallery, next project | `content/projects.ts` | PDF screenshots | Single column, sticky facts from lg |

## Asset mapping (PDF page → file)

| Project | Files | PDF page |
|---|---|---|
| School ERP | `admin-dashboard.png` (Fig. A), `admissions-crm.png` (A), `parent-app.png` (B) | p.4, p.5 |
| OVI Enterprises ERP | `admin-dashboard.png` (Fig. A), `enquiries-rfqs.png` (A), `quotation-revisions.png` (B), `approval-tickets.png` (C) | p.6, p.7 |
| Forge 4.0 | **None.** The PDF lists it on the contents page but its pages are missing. | p.3 only |
| Traceability ERP + AI | `gate-verification.png` (Fig. A), `ask-erp.png` (A), `ai-stock-intelligence.png` (B), `ai-security-hub.png` (C) | p.8, p.9 |
| Skillitrix | `overview.png`, `mobile.png`, `choose-track.png` (A), `test-in-progress.png` (B), `results-ai-score.png` (C) | p.10, p.11 |
| Qloax Privacy OS | `compliance-posture.png` (Fig. A), `data-discovery.png` (A), `gap-assessment.png` (C). **Excluded:** the Evidence Ledger screenshot (B) is marked "INTERNAL-ONLY, must never be exposed externally" and shows a "Chain linkage broken" error. | p.12, p.13 |
| Strategically Built Websites | `overview.png` (OVI Enterprises website), `mobile.png`, `vp-construction.png` (A), `ecommerce-store.png` (B), `portfolio-site.png` (C) | p.14, p.15 |
| Brand figures | `fig-01-lattice.jpg`, `fig-02-cell.jpg`, `fig-04-next-cell.jpg`, `qloax-logo.png` | p.1, p.2, p.18 |

## Open items for the QLOAX team

1. Forge 4.0 has no verified detail or screenshots. It is listed with its PDF one-liner and no case-study page.
2. Confirm permission to show the OVI dashboard, which displays order-book figures and a customer name.
3. Confirm "30+ websites", "75+ modules" and "Websites in 7 days" before launch.
4. Confirm VP Construction agreed to be named.
5. The "20-minute conversation with our founder" offer is used with the PDF's exact wording.
