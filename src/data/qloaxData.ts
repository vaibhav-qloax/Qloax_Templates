export interface Capability {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  image: string;
}

export interface Product {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  architecture: string[];
  highlights: string[];
  image: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  system: string;
  problem: string;
  engineering: string;
  outcome: string;
  tags: string[];
  image: string;
  year: string;
}

export const QLOAX_BRAND = {
  name: "QLOAX",
  tagline: "ENGINEERING Intelligence, Empowering Industry.",
  description:
    "QLOAX combines deep domain expertise with next-generation technology to architect, deploy, and scale intelligent enterprise systems.",
  themes: [
    "AI & Automation",
    "Data Engineering",
    "Enterprise Systems",
    "Cloud Architecture",
    "System Integration",
    "Industry 4.0",
  ],
};

export const QLOAX_CAPABILITIES: Capability[] = [
  {
    id: "enterprise-solutions",
    number: "01",
    title: "ENTERPRISE SOLUTIONS",
    tagline: "Mission-critical architectures for complex operations.",
    description:
      "We design and build custom enterprise platforms that centralize workflows, eliminate operational silos, and deliver fault-tolerant scalability for large-scale industrial and corporate environments.",
    features: [
      "Microservices Architecture",
      "High-Availability Infrastructure",
      "Role-Based Access & Compliance",
      "Real-time Enterprise Observability",
    ],
    techStack: ["Kubernetes", "Event-Driven Architecture", "gRPC", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "ai-automation",
    number: "02",
    title: "AI & AUTOMATION",
    tagline: "Autonomous workflows powered by custom machine intelligence.",
    description:
      "Transform manual bottlenecks into self-optimizing pipelines. We engineer purpose-built machine learning models, NLP pipelines, and computer vision systems tailored to core operational needs.",
    features: [
      "Predictive Process Automation",
      "Custom Neural Model Deployment",
      "LLM & Agentic Workflow Engines",
      "Edge Computer Vision Systems",
    ],
    techStack: ["PyTorch", "TensorFlow", "FastAPI", "Vector DBs"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "data-engineering",
    number: "03",
    title: "DATA ENGINEERING & ANALYTICS",
    tagline: "Ultra-low latency pipelines and decision intelligence.",
    description:
      "Convert fragmented data streams into unified enterprise intelligence. We build multi-terabyte ingestion pipelines, real-time stream processing, and predictive analytics data warehouses.",
    features: [
      "Stream & Batch Ingestion Engines",
      "Distributed Lakehouse Architecture",
      "Real-time Telemetry Analytics",
      "Automated Data Quality & Governance",
    ],
    techStack: ["Apache Spark", "Kafka", "ClickHouse", "BigQuery"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "cloud-architecture",
    number: "04",
    title: "CLOUD ARCHITECTURE",
    tagline: "Resilient hybrid and multi-cloud infrastructure.",
    description:
      "Architected for security, low latency, and infinite scale. We provision infrastructure-as-code environments that withstand extreme production loads across cloud and edge hardware.",
    features: [
      "Multi-Cloud Orchestration",
      "Zero-Trust Cloud Security",
      "Cost Optimization Pipelines",
      "Disaster Recovery & Redundancy",
    ],
    techStack: ["Terraform", "AWS", "Google Cloud", "Docker"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "system-integration",
    number: "05",
    title: "SYSTEM INTEGRATION",
    tagline: "Bridging legacy industrial systems with cloud intelligence.",
    description:
      "Seamlessly interconnect ERPs, CRMs, IoT sensors, and proprietary legacy databases through custom API gateways and high-throughput messaging buses.",
    features: [
      "Industrial Protocol Translators (MQTT/OPC-UA)",
      "Universal API Gateway Design",
      "Real-time Webhook & Event Fabrics",
      "Bi-directional ERP Sync",
    ],
    techStack: ["Go", "RabbitMQ", "GraphQL", "Redis"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600",
  },
];

export const QLOAX_PRODUCTS: Product[] = [
  {
    id: "forge-4",
    number: "01",
    name: "FORGE 4.0",
    category: "Industrial IoT & Smart Manufacturing",
    tagline: "Real-time industrial telemetry & autonomous machine monitoring.",
    description:
      "FORGE 4.0 connects factory floor machinery directly to cloud neural networks, detecting anomalies, predicting maintenance needs, and optimizing throughput without operational downtime.",
    architecture: [
      "Edge IoT Gateway Sensor Integration",
      "Sub-millisecond Anomaly Detection",
      "Predictive Maintenance Neural Models",
      "3D Digital Twin Factory Dashboard",
    ],
    highlights: [
      "Zero-touch sensor onboarding",
      "Edge ML inference",
      "Industrial SCADA / PLC bridging",
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "intervuai",
    number: "02",
    name: "INTERVUAI",
    category: "AI Talent & Technical Evaluation",
    tagline: "Autonomous multi-modal candidate assessment platform.",
    description:
      "INTERVUAI conducts rigorous, bias-free technical code evaluations, architectural discussions, and practical skills assessments using adaptive conversational AI agents.",
    architecture: [
      "Adaptive Conversational LLM Engine",
      "Live Sandboxed Code Execution Kernel",
      "Biometric Voice & Interaction Analysis",
      "Automated Technical Scoring Rubric",
    ],
    highlights: [
      "Real-time code execution analysis",
      "Domain-specific interview agents",
      "Comprehensive evaluation reports",
    ],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "revgen",
    number: "03",
    name: "REVGEN",
    category: "Revenue & Supply Chain Engine",
    tagline: "Predictive revenue optimization & demand orchestration.",
    description:
      "REVGEN synthesizes market signals, inventory flux, and customer behavioral data to dynamically optimize enterprise pricing strategies and supply chain routing.",
    architecture: [
      "Multi-Variable Dynamic Pricing Model",
      "Inventory & Fulfillment Forecasting",
      "Automated Contract Lifecycle Engine",
      "Executive Financial Intelligence HUD",
    ],
    highlights: [
      "Real-time demand curve modeling",
      "Automated margin protection rules",
      "Enterprise ERP integration",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
  },
];

export const QLOAX_PROJECTS: Project[] = [
  {
    id: "edunexus",
    number: "01",
    title: "EDUNEXUS / SCHOOL ERP",
    subtitle: "Unified Institutional Intelligence System",
    category: "Enterprise System",
    system: "Multi-campus educational management network servicing over 45,000 active students and faculty.",
    problem: "Fragmented legacy student portals, manual fee processing bottlenecks, and unintegrated academic grading records.",
    engineering: "Architected a modular microservices platform with role-based JWT authorization, real-time fee payment webhooks, and automated gradebook generation.",
    outcome: "Unified 12 institutional campuses onto a single cloud control plane with zero system downtime during enrollment peaks.",
    tags: ["Enterprise ERP", "Microservices", "Cloud Infrastructure"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
    year: "2024",
  },
  {
    id: "qchain",
    number: "02",
    title: "QCHAIN",
    subtitle: "Decentralized Supply Chain Verification Protocol",
    category: "Blockchain & Logistics",
    system: "Enterprise cryptographic traceability ledger for international pharmaceutical supply chains.",
    problem: "Counterfeit risk and lack of tamper-proof audit trails across multi-jurisdictional shipping lanes.",
    engineering: "Engineered a high-throughput immutable ledger with zero-knowledge proof verification and smart-contract automated customs release triggers.",
    outcome: "Secured end-to-end provenance verification across 2.4M high-value cargo shipments.",
    tags: ["Decentralized Ledger", "Cryptographic Provenance", "Smart Contracts"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
    year: "2024",
  },
  {
    id: "hydro-flow",
    number: "03",
    title: "HYDRO FLOW",
    subtitle: "Real-Time Industrial Fluid Dynamics & Telemetry",
    category: "Industrial IoT",
    system: "High-frequency telemetry sensing infrastructure deployed across 350+ kilometers of municipal liquid pipelines.",
    problem: "Undetected micro-leaks causing resource loss and catastrophic pressure drops prior to manual inspections.",
    engineering: "Deployed ultra-low-power edge sensing nodes streaming acoustic pressure data to a Kafka pipeline with automated pressure balance algorithms.",
    outcome: "Reduced undetected leak response time from weeks to sub-second automated alert dispatching.",
    tags: ["Industrial Telemetry", "IoT Edge Sensing", "Real-Time Streaming"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600",
    year: "2023",
  },
  {
    id: "qhr",
    number: "04",
    title: "QHR",
    subtitle: "Intelligent Workforce Analytics & Shift Allocation",
    category: "HR & Operational AI",
    system: "Automated workforce scheduling and performance monitoring suite for round-the-clock manufacturing plants.",
    problem: "Suboptimal shift coverage leading to worker fatigue, compliance overruns, and unexpected plant downtime.",
    engineering: "Developed a mathematical constraint-solver algorithm integrated with real-time biometric attendance streams to dynamically balance shift rosters.",
    outcome: "Eliminated scheduling conflicts and improved operational staffing accuracy across 24/7 facility operations.",
    tags: ["Workforce Intelligence", "Constraint Optimization", "Enterprise AI"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600",
    year: "2023",
  },
  {
    id: "society-app",
    number: "05",
    title: "SOCIETY MANAGEMENT APP",
    subtitle: "Smart Urban Living & Infrastructure Operating System",
    category: "PropTech & Infrastructure",
    system: "Digital operating system managing access control, billing, visitor validation, and asset maintenance for high-density residential complexes.",
    problem: "Manual security gate logs, delayed maintenance ticketing, and disconnected resident communication channels.",
    engineering: "Built an end-to-end mobile and web ecosystem featuring ANPR (Automatic Number Plate Recognition) integration, digital visitor gatepasses, and automated utility billing.",
    outcome: "Digitized operations across 85+ gated communities with streamlined security authorization.",
    tags: ["PropTech", "ANPR Integration", "Mobile Ecosystem"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600",
    year: "2024",
  },
  {
    id: "employee-evaluation",
    number: "06",
    title: "EMPLOYEE PERFORMANCE EVALUATION",
    subtitle: "Data-Driven AI Talent Performance & Growth Platform",
    category: "AI & Talent Intelligence",
    system: "Enterprise-wide continuous feedback and skill capability matrix analyzer.",
    problem: "Subjective annual performance reviews lacking quantitative project impact tracking.",
    engineering: "Designed an objective performance scoring engine leveraging Git commit analytics, Jira ticket velocity, peer feedback NLP sentiment, and KPI goal mapping.",
    outcome: "Provided executive leadership with unbiased talent matrix visualizations and personalized growth roadmaps.",
    tags: ["Talent Analytics", "NLP Sentiment", "Performance Matrix"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600",
    year: "2024",
  },
];
