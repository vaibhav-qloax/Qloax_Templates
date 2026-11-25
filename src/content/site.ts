/**
 * Site-wide copy. Every string here comes from QLOAXPortfolio26.pdf.
 * Page references are noted so future edits can be checked against the source.
 */

export const SITE = {
  name: "QLOAX",
  url: "https://www.qloax.com",
  motto: "Forge the unseen", // p.1, p.18
  title: "QLOAX: Systems that run the business",
  description:
    "QLOAX builds custom ERP, AI-native products, DPDP compliance technology and search-ready websites, engineered around how each business actually works. Pune, India.",
} as const;

export const CONTACT = {
  email: "contact@qloax.com",
  phone: "+91 90677 34333",
  phoneHref: "tel:+919067734333",
  web: "www.qloax.com",
  office: "Pune, India",
} as const;

/** p.1 cover */
export const HERO = {
  eyebrow: "QLOAX · Forge the unseen",
  headline: ["Systems that run", "the business"],
  body: "Custom ERP, AI-native products, DPDP compliance technology and search-ready websites, engineered around how each business actually works.",
} as const;

/** p.2 */
export const ABOUT = {
  eyebrow: "Who we are",
  headline: ["Business problem first.", "Technology second."],
  body: "QLOAX is an innovative digital studio, IT, AI and cloud company. We digitise operations for growing businesses: the ERP a factory runs on, the platform a school group runs on, and the compliance system a clinic needs under India's DPDP Act.",
} as const;

export type Capability = {
  id: string;
  index: string;
  title: string;
  body: string;
  /** Portfolio entries that demonstrate this capability. */
  projects: string[];
  /** Screenshot shown with the capability. */
  image: { src: string; alt: string; width: number; height: number };
};

/** p.2 */
export const CAPABILITIES: Capability[] = [
  {
    id: "custom-software",
    index: "01",
    title: "Custom software & ERP",
    body: "Multi-tenant platforms, industry ERPs, portals and workflow systems.",
    projects: ["school-erp", "ovi-enterprises", "forge-4", "traceability-erp"],
    image: {
      src: "/work/school-erp/admin-dashboard.png",
      alt: "School ERP admin dashboard with dues, enrolment trend and retention widgets",
      width: 1518,
      height: 716,
    },
  },
  {
    id: "ai-automation",
    index: "02",
    title: "AI & automation",
    body: "Assistants, forecasting and anomaly detection grounded in your own data.",
    projects: ["traceability-erp", "skillitrix"],
    image: {
      src: "/work/traceability-erp/ask-erp.png",
      alt: "Ask ERP assistant panel suggesting role-aware questions about dispatch and stock",
      width: 926,
      height: 642,
    },
  },
  {
    id: "compliance",
    index: "03",
    title: "Compliance technology",
    body: "Find personal data, map what the DPDP Act requires, close the gaps, keep the evidence.",
    projects: ["privacy-os"],
    image: {
      src: "/work/privacy-os/compliance-posture.png",
      alt: "Qloax Privacy OS data source connectors for PostgreSQL, MySQL, MongoDB and Amazon S3",
      width: 1920,
      height: 983,
    },
  },
  {
    id: "websites",
    index: "04",
    title: "Strategically Built Websites",
    body: "E-commerce and portfolio sites built for Google and for AI search.",
    projects: ["websites"],
    image: {
      src: "/work/websites/overview.png",
      alt: "Website built by QLOAX for OVI Enterprises, a cutting-tool manufacturer",
      width: 1152,
      height: 587,
    },
  },
];

export type Industry = {
  id: string;
  name: string;
  /** Portfolio entries in this industry, only where the PDF supports it. */
  projects: string[];
};

/** p.17 "We build for" */
export const INDUSTRIES: Industry[] = [
  { id: "manufacturing", name: "Manufacturing", projects: ["ovi-enterprises", "forge-4", "traceability-erp"] },
  { id: "education", name: "Education", projects: ["school-erp", "skillitrix"] },
  { id: "healthcare", name: "Healthcare & labs", projects: ["privacy-os"] },
  { id: "lending", name: "Lending & insurance", projects: [] },
  { id: "real-estate", name: "Real estate", projects: [] },
  { id: "retail", name: "Retail & e-commerce", projects: ["websites"] },
];

/** p.17 "Why QLOAX" */
export const PRINCIPLES = [
  {
    index: "01",
    title: "Business problem first",
    body: "We design on the shop floor, at the front desk and at the gate, not only from a requirements document.",
  },
  {
    index: "02",
    title: "AI with guardrails",
    body: "Our AI reads your data, explains every finding and leaves the decision to a person.",
  },
  {
    index: "03",
    title: "Privacy by design",
    body: "We build compliance products for India's DPDP Act and design our own systems so personal data stays isolated.",
  },
  {
    index: "04",
    title: "Fast, phased delivery",
    body: "Websites in 7 days. Larger systems ship in phases, so value shows up early.",
  },
] as const;

/** p.16 "How we work" */
export const PROCESS = {
  title: "Five steps, one accountable team",
  steps: [
    { index: "01", title: "Discover", body: "A visit or call to see how work really flows: people, paper, data and pain points." },
    { index: "02", title: "Design", body: "We map the workflow, agree the scope and share a fixed quote." },
    { index: "03", title: "Build", body: "Delivered in phases, so the first module is in use early and feedback shapes the rest." },
    { index: "04", title: "Deploy", body: "Data migration, setup with your item codes and approval chains, and on-site or online training." },
    { index: "05", title: "Support", body: "Bug fixes, security updates, performance work and new features as you grow." },
  ],
  support:
    "Long-term support and upgrades for every system we build, with a direct line to the team that built it.",
} as const;

/** p.18 */
export const CTA = {
  eyebrow: "Next step",
  headline: ["Let's map", "your process"],
  body: "A 20-minute conversation with our founder, at your office or online. You leave knowing what to digitise first and what it would cost.",
} as const;

export const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Industries", href: "/#industries" },
  { label: "Process", href: "/#process" },
] as const;
