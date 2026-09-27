"use client";

import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Smartphone, ShieldCheck, Zap, BarChart3, Layers } from "lucide-react";

interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  impactMetrics: { label: string; value: string }[];
  overview: string;
  mobileArchitecture: string[];
  techStack: string[];
  image: string;
}

const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "teacher-mobile-app",
    number: "01",
    title: "Teacher Mobile App & School Information System",
    subtitle: "EduNexus Institutional Mobile Platform",
    category: "React Native / Expo Mobile App",
    impactMetrics: [
      { label: "SYSTEM UPTIME", value: "99.9%" },
      { label: "ACTIVE USERS", value: "45,000+" },
      { label: "ADMIN EFFICIENCY BOOST", value: "60%" },
      { label: "MODULAR COMPONENTS", value: "120+ Components" },
    ],
    overview:
      "A cross-platform React Native and Expo mobile app built for teachers, administrators, and students. Features offline-first gradebook caching, instant attendance biometric scanning, fee payment gateways, and real-time push notifications.",
    mobileArchitecture: [
      "Offline-first SQLite & WatermelonDB sync kernel",
      "Expo SDK custom native module extensions",
      "Dynamic gradebook math processing engine",
      "Role-based JWT encryption & biometrics",
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "client-mobile-admin-portal",
    number: "02",
    title: "Client Mobile App & Administrative Portal",
    subtitle: "QHR & Society Management System",
    category: "Mobile App + Web Control Portal",
    impactMetrics: [
      { label: "API LATENCY", value: "< 50ms" },
      { label: "COMPLEXES DEPLOYED", value: "85+ Sites" },
      { label: "ANPR VERIFICATION", value: "100% Accuracy" },
      { label: "VISITOR VERIFICATION SPEED", value: "3.5x Faster" },
    ],
    overview:
      "A unified multi-tenant ecosystem featuring a sleek React Native client app for residents/employees and a high-density web admin portal for security guards and managers. Integrates ANPR (Automatic Number Plate Recognition) camera hardware.",
    mobileArchitecture: [
      "Cross-platform shared React component primitive design system",
      "Real-time WebSocket visitor gatepass validation",
      "Automated utility billing webhooks & payment gateways",
      "Granular role-based security access matrices",
    ],
    techStack: ["React Native", "Expo", "Next.js", "TypeScript", "Tailwind CSS", "Redis"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "fake-review-detection",
    number: "03",
    title: "Fake Review Detection & AI Evaluation Engine",
    subtitle: "IntervuAI & RevGen Fraud Analytics",
    category: "AI & Machine Intelligence",
    impactMetrics: [
      { label: "DETECTION ACCURACY", value: "98.4%" },
      { label: "REVIEWS ANALYZED", value: "1.2M+" },
      { label: "SCREENING VELOCITY", value: "4.2x Faster" },
      { label: "CODE EXECUTION", value: "Sub-Second" },
    ],
    overview:
      "An enterprise machine learning evaluation engine and review fraud detection protocol. Analyzes user sentiment patterns, IP telemetry, acoustic voice signals, and sandboxed code execution outputs to eliminate fraudulent reviews and automate candidate interviews.",
    mobileArchitecture: [
      "NLP sentiment analyzer & Transformer model pipelines",
      "Real-time candidate code execution isolation sandbox",
      "Interactive analytics dashboard built with WebGL charts",
      "Automated threat alert webhooks & margin protection rules",
    ],
    techStack: ["Python", "FastAPI", "PyTorch", "React", "TypeScript", "Vector DB"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600",
  },
];

export default function T2WorkMatrix() {
  return (
    <section id="projects" className="bg-[#090D16] text-[#F1F5F9] py-24 border-b border-[#1E293B] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1E293B]">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest block">
              // FEATURED CASE STUDIES & METRICS
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#F1F5F9] uppercase">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-slate-400 text-sm font-sans max-w-md">
            Leading with quantifiable impact metrics upfront—demonstrating real-world performance, component scalability, and deployment success.
          </p>
        </div>

        {/* Project Cards with Upfront Impact Metrics */}
        <div className="space-y-20">
          {FEATURED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#131D31] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl hover:border-[#3B82F6] transition-all duration-300 group"
            >
              {/* TOP METRICS BANNER (UPFRONT IMPACT METRICS) */}
              <div className="bg-[#090D16]/90 border-b border-[#1E293B] p-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {proj.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block">
                      {metric.label}
                    </span>
                    <div className="font-display font-bold text-2xl sm:text-3xl text-[#3B82F6]">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* MAIN CONTENT CONTAINER */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 sm:p-12 items-center">
                
                {/* Details Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded border border-[#3B82F6]/30">
                        PROJECT {proj.number}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {proj.category}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-4xl text-[#F1F5F9] uppercase tracking-tight">
                      {proj.title}
                    </h3>

                    <p className="font-mono text-xs text-slate-300">
                      "{proj.subtitle}"
                    </p>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed font-sans font-light">
                    {proj.overview}
                  </p>

                  {/* Architecture & Highlights */}
                  <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                    <span className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider block font-semibold">
                      TECHNICAL & ARCHITECTURAL HIGHLIGHTS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                      {proj.mobileArchitecture.map((arch, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#3B82F6] shrink-0 mt-0.5" />
                          <span>{arch}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="pt-4 border-t border-[#1E293B] flex flex-wrap items-center gap-1.5 font-mono text-xs">
                    <span className="text-slate-500 uppercase text-[10px] tracking-wider mr-2">
                      STACK:
                    </span>
                    {proj.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#090D16] border border-[#1E293B] text-slate-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Showcase Column */}
                <div
                  className="lg:col-span-5 relative h-72 sm:h-96 rounded-xl overflow-hidden bg-[#090D16] border border-[#1E293B]"
                  data-cursor="explore"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131D31] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-[#090D16]/90 backdrop-blur-md p-3 rounded-lg border border-[#1E293B] flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">EXPO / REACT NATIVE</span>
                    <span className="text-[#3B82F6] flex items-center gap-1">
                      VERIFIED CASE <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
