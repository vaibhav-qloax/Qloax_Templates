/**
 * Portfolio entries. Every fact and caption comes from QLOAXPortfolio26.pdf
 * (contents on p.3, project pages p.4–p.15). Screenshots are the PDF's own images,
 * extracted unmodified into /public/work/<slug>/.
 *
 * Rule: if the PDF does not say it, it does not go here.
 */

export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** PDF figure label, e.g. "A". */
  label?: string;
  title?: string;
  caption?: string;
  /** Phone screenshots are framed differently. */
  device?: "desktop" | "phone";
};

export type Highlight = { title: string; body: string };

export type Extra =
  | { kind: "list"; title: string; items: string[] }
  | { kind: "note"; title: string; body: string; link?: { label: string; href: string } }
  | { kind: "disclaimer"; body: string }
  | { kind: "timeline"; title: string; items: { label: string; value: string }[] }
  | { kind: "quote"; body: string };

export type Diagram =
  | { kind: "flow"; title: string; steps: string[] }
  | { kind: "chain"; title: string; steps: string[]; note: string }
  | { kind: "guardrails"; title: string; items: string[] }
  | { kind: "boundary"; title: string; inside: string[]; outside: string[]; ledger: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** Contents-page line (p.3). */
  summary: string;
  type: "OWN PRODUCT" | "CLIENT" | "CLIENT BUILD" | "B2C PRODUCT" | "SERVICE";
  tags: string[];
  /** Project-page positioning line. */
  headline?: string;
  /** Second-page title, used as the case-study chapter heading. */
  storyTitle?: string;
  highlights?: Highlight[];
  cover?: Shot;
  gallery?: Shot[];
  diagrams?: Diagram[];
  extras?: Extra[];
  link?: { label: string; href: string };
  status?: string;
  /** False when the PDF has no verified material beyond the contents line. */
  hasCaseStudy: boolean;
  seoDescription?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "school-erp",
    index: "01",
    title: "School ERP",
    summary: "Multi-tenant SaaS for schools and school groups",
    type: "OWN PRODUCT",
    tags: ["Own product", "Education"],
    headline:
      "One multi-tenant platform for a single school or a whole group, from first enquiry to payroll.",
    storyTitle: "From enquiry to payroll, on one login",
    highlights: [
      {
        title: "Multi-tenant by design",
        body: "Trust, school and branch levels, with each tenant's data kept separate and admin roles at every level.",
      },
      {
        title: "75+ modules",
        body: "Admissions CRM, student records, attendance, timetable, exams, fees, transport, HR and payroll.",
      },
      {
        title: "Role-based dashboards",
        body: "Purpose-built views for admins, teachers and parents, with an audit log on every action.",
      },
      {
        title: "Parent portal",
        body: "Attendance, fee status, notices, event media and feedback in one place.",
      },
    ],
    cover: {
      src: "/work/school-erp/admin-dashboard.png",
      alt: "School ERP admin dashboard showing top defaulters, enrolment trend, gender ratio and retention",
      width: 1518,
      height: 716,
      label: "Fig. A",
      title: "Admin dashboard",
    },
    gallery: [
      {
        src: "/work/school-erp/admissions-crm.png",
        alt: "School ERP admissions enquiries screen with total enquiries, active leads, filters and CSV export",
        width: 1518,
        height: 712,
        label: "A",
        title: "Admissions CRM",
        caption:
          "Every enquiry captured, assigned to a counsellor and followed up by email and SMS. QR-code forms feed campaigns straight in.",
      },
      {
        src: "/work/school-erp/parent-app.png",
        alt: "School ERP parent app on a phone showing attendance, fees and notices",
        width: 333,
        height: 720,
        label: "B",
        title: "Parent app",
        caption: "Parents see attendance, fees and notices, and send feedback, from their phone.",
        device: "phone",
      },
    ],
    extras: [
      {
        kind: "list",
        title: "Also inside",
        items: [
          "Fees with instalments and GST",
          "Payroll and payslips",
          "Transport routes",
          "Events",
          "Documents",
          "Reports",
        ],
      },
    ],
    hasCaseStudy: true,
    seoDescription:
      "School ERP by QLOAX: one multi-tenant platform for a single school or a whole group, from first enquiry to payroll, with 75+ modules and a parent portal.",
  },
  {
    slug: "ovi-enterprises",
    index: "02",
    title: "OVI Enterprises ERP",
    summary: "Custom ERP for a tool-cutting manufacturer",
    type: "CLIENT",
    tags: ["Client", "Custom ERP", "Manufacturing"],
    headline: "A custom ERP for a tool-cutting manufacturer, designed with the team on their shop floor.",
    storyTitle: "Shaped by the team that uses it",
    highlights: [
      {
        title: "Enquiry to quotation, one flow",
        body: "Enquiries, RFQs and quotations live in one system, and quotations go out as clean PDFs.",
      },
      {
        title: "Revision history",
        body: "Every quotation revision is versioned, with a log of what changed and when.",
      },
      {
        title: "Approval tickets",
        body: "Anything outside the normal flow becomes a role-aware ticket instead of a phone call.",
      },
      {
        title: "Role-based dashboards",
        body: "Admin and team views with quick actions for new enquiries and quotations.",
      },
    ],
    cover: {
      src: "/work/ovi-enterprises/admin-dashboard.png",
      alt: "OVI Enterprises ERP admin dashboard with order book summary and items waiting for approval",
      width: 1342,
      height: 755,
      label: "Fig. A",
      title: "Admin dashboard",
    },
    gallery: [
      {
        src: "/work/ovi-enterprises/enquiries-rfqs.png",
        alt: "OVI Enterprises ERP enquiries and RFQs list with owner and status",
        width: 1151,
        height: 647,
        label: "A",
        title: "Enquiries & RFQs",
        caption:
          "Every enquiry logged with its RFQ, owner and status, and opened in a pop-up without losing your place.",
      },
      {
        src: "/work/ovi-enterprises/quotation-revisions.png",
        alt: "OVI Enterprises ERP quotations list with status, totals including GST and revision history actions",
        width: 1151,
        height: 647,
        label: "B",
        title: "Quotation & revisions",
        caption: "Laid out like the PDF the customer receives, with each revision kept in a log.",
      },
      {
        src: "/work/ovi-enterprises/approval-tickets.png",
        alt: "OVI Enterprises ERP approval tickets routed by role",
        width: 1208,
        height: 680,
        label: "C",
        title: "Approval tickets",
        caption: "Out-of-flow approvals routed to the right role and tracked to closure.",
      },
    ],
    diagrams: [
      {
        kind: "flow",
        title: "Enquiry to order",
        steps: ["Enquiry", "RFQ", "Quotation", "Revision", "Approval", "Order"],
      },
    ],
    hasCaseStudy: true,
    seoDescription:
      "OVI Enterprises ERP: a custom ERP for a tool-cutting manufacturer, built by QLOAX with enquiry-to-quotation flow, revision history and role-aware approval tickets.",
  },
  {
    slug: "forge-4",
    index: "03",
    title: "Forge 4.0",
    summary: "QR-assisted shop-floor ERP for manufacturers",
    type: "OWN PRODUCT",
    tags: ["Own product", "Manufacturing"],
    hasCaseStudy: false,
  },
  {
    slug: "traceability-erp",
    index: "04",
    title: "Traceability ERP + AI",
    summary: "Barcode dispatch control with an AI intelligence layer",
    type: "CLIENT BUILD",
    tags: ["Client build", "Automotive components"],
    headline: "Barcode control for an automotive gasket maker, from the packing line to the security gate.",
    storyTitle: "AI that reads the ERP and leaves decisions to people",
    highlights: [
      {
        title: "One chain, five stations",
        body: "Parts, packing, box, invoice and gate, with each stage locked once it is complete.",
      },
      {
        title: "Gate verification",
        body: "Security scans the invoice and every box. Missing, extra or mismatched boxes are flagged before exit.",
      },
      {
        title: "Role-scoped access",
        body: "Admin, packing, finished goods, invoicing and gate security each see only their station.",
      },
      {
        title: "Audit-ready records",
        body: "Gate-out reports record invoice, vehicle, time, officer and box count for every dispatch.",
      },
    ],
    cover: {
      src: "/work/traceability-erp/gate-verification.png",
      alt: "Traceability ERP admin overview flagging unlocked master boxes, invoices in gate verification and low stock",
      width: 1109,
      height: 714,
      label: "Fig. A",
      title: "Gate verification",
    },
    gallery: [
      {
        src: "/work/traceability-erp/ask-erp.png",
        alt: "Ask ERP assistant suggesting questions about gate passes, invoices and dispatch for the admin role",
        width: 926,
        height: 642,
        label: "A",
        title: "Ask ERP",
        caption:
          "Plain-language questions on stock, invoices and dispatch, answered from ERP records within the user's role.",
      },
      {
        src: "/work/traceability-erp/ai-stock-intelligence.png",
        alt: "AI Stock Intelligence alerting a stock shortage and grouping parts into high, medium and safe risk",
        width: 1055,
        height: 679,
        label: "B",
        title: "AI Stock Intelligence",
        caption:
          "30-day demand forecast from a 90-day baseline and recent trend, plus a 15% buffer, flagging parts at risk.",
      },
      {
        src: "/work/traceability-erp/ai-security-hub.png",
        alt: "AI Security Hub showing anomaly counts and a security log",
        width: 969,
        height: 621,
        label: "C",
        title: "AI Security Hub",
        caption:
          "Flags off-hours dispatch, impossible packing speeds and unusual quantities, with evidence and a next step.",
      },
    ],
    diagrams: [
      {
        kind: "chain",
        title: "One chain, five stations",
        steps: ["Parts", "Packing", "Box", "Invoice", "Gate"],
        note: "Each stage locks once it is complete.",
      },
      {
        kind: "guardrails",
        title: "Every alert shows",
        items: ["What", "Why", "Evidence", "Risk score", "Action"],
      },
    ],
    extras: [
      {
        kind: "list",
        title: "Guardrails",
        items: [
          "Read-only AI",
          "Human sign-off for dispatch and stock changes",
          "Every alert shows what, why, evidence, risk score and action",
        ],
      },
    ],
    hasCaseStudy: true,
    seoDescription:
      "Traceability ERP + AI: barcode dispatch control for an automotive gasket maker, from the packing line to the security gate, with a read-only AI layer.",
  },
  {
    slug: "skillitrix",
    index: "05",
    title: "Skillitrix",
    summary: "AI-native placement preparation for students",
    type: "B2C PRODUCT",
    tags: ["Own product", "B2C", "AI-native"],
    headline:
      "AI-native placement preparation: practise against the real clock and see exactly where marks are lost.",
    storyTitle: "A consumer AI product, built and run end to end",
    highlights: [
      {
        title: "Company-style mock tests",
        body: "Timed rounds in aptitude, reasoning, verbal and coding across six company-style tracks.",
      },
      {
        title: "Instant AI scoring",
        body: "An AI band score and summary on submit, with section-wise strengths and weak areas.",
      },
      {
        title: "Real test conditions",
        body: "Timer, question navigation, answer tracking and auto-save, as on test day.",
      },
      {
        title: "Progress over time",
        body: "Past attempts saved and compared, so improvement is visible round after round.",
      },
    ],
    cover: {
      src: "/work/skillitrix/overview.png",
      alt: "Skillitrix candidate portal showing a recommended assessment and score summary",
      width: 1200,
      height: 615,
    },
    gallery: [
      {
        src: "/work/skillitrix/choose-track.png",
        alt: "Skillitrix track selection with standard practice and company-style tracks",
        width: 1376,
        height: 702,
        label: "A",
        title: "Choose a track",
        caption: "Standard practice or a company-style track, each a timed round with real test rules.",
      },
      {
        src: "/work/skillitrix/test-in-progress.png",
        alt: "Skillitrix test in progress with section timer and question palette",
        width: 1152,
        height: 648,
        label: "B",
        title: "Test in progress",
        caption: "Section timer, question palette and auto-save, so practice feels like the real test.",
      },
      {
        src: "/work/skillitrix/results-ai-score.png",
        alt: "Skillitrix results with score, accuracy, section breakdown and AI summary",
        width: 1330,
        height: 677,
        label: "C",
        title: "Results & AI score",
        caption:
          "Score, accuracy and a section-wise breakdown the moment a round ends, with an AI summary.",
      },
      {
        src: "/work/skillitrix/mobile.png",
        alt: "Skillitrix on a phone",
        width: 303,
        height: 672,
        title: "On mobile",
        device: "phone",
      },
    ],
    extras: [
      {
        kind: "note",
        title: "What it proves",
        body: "QLOAX ships and operates AI products for real users, not only client projects. Free and Pro plans, live at skillitrix.com.",
        link: { label: "skillitrix.com", href: "https://skillitrix.com" },
      },
    ],
    link: { label: "Live at skillitrix.com", href: "https://skillitrix.com" },
    hasCaseStudy: true,
    seoDescription:
      "Skillitrix: AI-native placement preparation built and run by QLOAX. Company-style mock tests, instant AI scoring and progress over time.",
  },
  {
    slug: "privacy-os",
    index: "06",
    title: "Qloax Privacy OS",
    summary: "DPDP compliance management system, V1",
    type: "OWN PRODUCT",
    tags: ["Own product", "DPDP CMS V1"],
    status: "Live · 1 Nov 2026",
    headline:
      "Connect your database on Monday. By Friday, see every place you hold personal data, what the law requires for each, where you are exposed and what it could cost.",
    storyTitle: "From first scan to board report in days",
    highlights: [
      {
        title: "Discover and classify",
        body: "Scans PostgreSQL, MySQL, MongoDB and Amazon S3, classifying personal data with confidence scores and Indian ID checks.",
      },
      {
        title: "Draft, assess, score",
        body: "AI-drafted processing records, a gap assessment with a remediation roadmap, rupee risk exposure and a board-ready score.",
      },
      {
        title: "Private by architecture",
        body: "Personal data stays in an isolated per-tenant worker. Only metadata and salted tokens leave it. Evidence sits in a tamper-evident ledger.",
      },
    ],
    cover: {
      src: "/work/privacy-os/compliance-posture.png",
      alt: "Qloax Privacy OS data source connectors for PostgreSQL, MySQL, MongoDB and Amazon S3, with read-only enforced",
      width: 1920,
      height: 983,
      label: "Fig. A",
      title: "Compliance posture",
    },
    gallery: [
      {
        src: "/work/privacy-os/data-discovery.png",
        alt: "Qloax Privacy OS coverage view showing classified versus discovered data elements and identifier types",
        width: 1728,
        height: 881,
        label: "A",
        title: "Data discovery",
        caption:
          "Tables and buckets scanned, personal-data fields classified, and a published coverage figure for what was scanned.",
      },
      {
        src: "/work/privacy-os/gap-assessment.png",
        alt: "Qloax Privacy OS gap assessment mapping obligations to findings",
        width: 1556,
        height: 792,
        label: "C",
        title: "Gap assessment",
        caption:
          "Obligations mapped to findings, a sequenced remediation roadmap and a rupee figure on each exposure.",
      },
    ],
    diagrams: [
      {
        kind: "boundary",
        title: "Private by architecture",
        inside: ["Personal data", "Isolated per-tenant worker"],
        outside: ["Metadata", "Salted tokens"],
        ledger: "Tamper-evident evidence ledger",
      },
    ],
    extras: [
      {
        kind: "note",
        title: "Records of processing",
        body: "Records of processing drafted from evidence. Business owners confirm or correct them on their phone in minutes.",
      },
      {
        kind: "list",
        title: "Next, 2027",
        items: [
          "Consent capture and preference centre",
          "Data-principal requests",
          "Breach response with statutory clocks",
          "Retention",
        ],
      },
      {
        kind: "disclaimer",
        body: "Technology for DPDP readiness, not legal advice. QLOAX is not a law firm or a government body, and there is no government DPDP certificate.",
      },
    ],
    hasCaseStudy: true,
    seoDescription:
      "Qloax Privacy OS: DPDP compliance management system. Discover and classify personal data, draft processing records, assess gaps and keep tamper-evident evidence.",
  },
  {
    slug: "websites",
    index: "07",
    title: "Strategically Built Websites",
    summary: "E-commerce and portfolio sites, SEO and AI-search ready",
    type: "SERVICE",
    tags: ["Service", "Web"],
    headline: "E-commerce and portfolio websites, built to rank on Google and to be cited by AI search.",
    storyTitle: "Recent websites",
    highlights: [
      {
        title: "SEO-strong",
        body: "Technical SEO, schema markup, fast mobile pages, clean URLs and sitemaps from day one.",
      },
      {
        title: "AI-search ready",
        body: "Clear entities, FAQs and structured answers that ChatGPT, Perplexity and Google AI Overviews can cite.",
      },
      {
        title: "Yours to run",
        body: "Editable content, analytics and enquiry tracking, plus catalogue, cart and payments for stores.",
      },
    ],
    cover: {
      src: "/work/websites/overview.png",
      alt: "Website built by QLOAX for OVI Enterprises, a precision cutting-tool manufacturer in Pune",
      width: 1152,
      height: 587,
    },
    gallery: [
      {
        src: "/work/websites/vp-construction.png",
        alt: "VP Construction corporate website hero about industrial EPC plants and architectural landmarks",
        width: 756,
        height: 420,
        label: "A",
        title: "Corporate website · VP Construction",
        caption: "Custom-built around the client's brand, colours and content, refined together with their team.",
      },
      {
        src: "/work/websites/ecommerce-store.png",
        alt: "Anvika luxury Indian fashion e-commerce store home page",
        width: 768,
        height: 397,
        label: "B",
        title: "E-commerce store",
        caption: "Catalogue, cart and payments, with product schema so listings can surface in search.",
      },
      {
        src: "/work/websites/portfolio-site.png",
        alt: "Vastu Bharrti consultation portfolio website home page",
        width: 758,
        height: 427,
        label: "C",
        title: "Portfolio website",
        caption: "A fast, focused site that turns visitors into enquiries.",
      },
      {
        src: "/work/websites/mobile.png",
        alt: "QLOAX-built website on a phone",
        width: 303,
        height: 672,
        title: "Fast mobile pages",
        device: "phone",
      },
    ],
    extras: [
      {
        kind: "timeline",
        title: "Seven days, brief to launch",
        items: [
          { label: "Day 1", value: "Brief & sitemap" },
          { label: "Day 2–3", value: "Design" },
          { label: "Day 4–5", value: "Build" },
          { label: "Day 6", value: "Content & SEO" },
          { label: "Day 7", value: "Launch" },
        ],
      },
      {
        kind: "list",
        title: "Among 30+ websites, each ships with",
        items: ["Schema markup", "Sitemap and robots", "Mobile speed checks", "Analytics", "Enquiry tracking"],
      },
    ],
    hasCaseStudy: true,
    seoDescription:
      "Strategically Built Websites by QLOAX: e-commerce and portfolio sites built to rank on Google and to be cited by AI search, from brief to launch in seven days.",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

export const CASE_STUDIES = PROJECTS.filter((p) => p.hasCaseStudy);

export const projectHref = (p: Project) => (p.hasCaseStudy ? `/work/${p.slug}` : undefined);

/** Next case study, wrapping around, skipping entries without a page. */
export const nextCaseStudy = (slug: string) => {
  const i = CASE_STUDIES.findIndex((p) => p.slug === slug);
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
};
