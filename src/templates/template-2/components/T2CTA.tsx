"use client";

import { useState } from "react";
import { Send, Mail, Github, Linkedin, Twitter, CheckCircle2, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

export default function T2CTA() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#090D16] text-[#F1F5F9] py-24 border-b border-[#1E293B] font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest block font-semibold">
            // CONVERSION & DIRECT INQUIRY
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[#F1F5F9] uppercase">
            LET'S BUILD SOMETHING EXTRAORDINARY.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Have a mobile app project, custom Expo/React Native architecture requirement, or enterprise platform inquiry? Send a message below.
          </p>
        </div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Numbered Contact Form */}
          <div className="lg:col-span-8 bg-[#131D31] border border-[#1E293B] p-8 sm:p-12 rounded-2xl space-y-8 shadow-2xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-[#3B82F6]/20 border border-[#3B82F6] text-[#3B82F6] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#F1F5F9]">
                  MESSAGE RECEIVED
                </h3>
                <p className="text-slate-300 text-sm font-sans max-w-md mx-auto">
                  Thank you for reaching out. We have logged your request and will respond within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="px-6 py-2.5 bg-[#090D16] border border-[#1E293B] hover:border-[#3B82F6] text-xs font-mono text-[#F1F5F9] rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 font-sans">
                
                {/* 01 Your Name */}
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 font-mono text-xs text-slate-400 group-focus-within:text-[#3B82F6] transition-colors">
                    <span className="font-bold text-[#3B82F6]">01</span>
                    <span className="uppercase tracking-wider">YOUR NAME</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#090D16] border border-[#1E293B] rounded-lg px-4 py-3.5 text-sm text-[#F1F5F9] placeholder:text-slate-600 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </div>

                {/* 02 Your Email */}
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 font-mono text-xs text-slate-400 group-focus-within:text-[#3B82F6] transition-colors">
                    <span className="font-bold text-[#3B82F6]">02</span>
                    <span className="uppercase tracking-wider">YOUR EMAIL</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#090D16] border border-[#1E293B] rounded-lg px-4 py-3.5 text-sm text-[#F1F5F9] placeholder:text-slate-600 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </div>

                {/* 03 Your Message */}
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 font-mono text-xs text-slate-400 group-focus-within:text-[#3B82F6] transition-colors">
                    <span className="font-bold text-[#3B82F6]">03</span>
                    <span className="uppercase tracking-wider">YOUR MESSAGE</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project requirements, mobile platform scope, or architecture goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#090D16] border border-[#1E293B] rounded-lg px-4 py-3.5 text-sm text-[#F1F5F9] placeholder:text-slate-600 focus:outline-none focus:border-[#3B82F6] transition-colors resize-none"
                  />
                </div>

                {/* Send Message Button */}
                <MagneticButton
                  type="submit"
                  dataCursor="open"
                  className="w-full py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-sm uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-[#3B82F6]/25 inline-flex items-center justify-center gap-2 font-sans"
                >
                  <Send size={16} />
                  SEND MESSAGE
                </MagneticButton>

              </form>
            )}
          </div>

          {/* Right Column: Direct Contact & Social Links */}
          <div className="lg:col-span-4 space-y-8 font-sans">
            
            {/* Direct Email Card */}
            <div className="bg-[#131D31] border border-[#1E293B] p-6 rounded-2xl space-y-4">
              <div className="p-3 bg-[#090D16] border border-[#1E293B] rounded-lg w-fit text-[#3B82F6]">
                <Mail size={20} />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">
                  DIRECT EMAIL INQUIRIES
                </span>
                <a
                  href="mailto:engineering@qloax.com"
                  className="text-lg font-bold text-[#F1F5F9] hover:text-[#3B82F6] transition-colors font-mono block"
                >
                  engineering@qloax.com
                </a>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                For urgent architecture reviews or RFPs, contact our lead mobile & frontend engineering desk directly.
              </p>
            </div>

            {/* Social Links Card */}
            <div className="bg-[#131D31] border border-[#1E293B] p-6 rounded-2xl space-y-4">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block">
                DEVELOPER PLATFORMS & SOCIALS
              </span>

              <div className="space-y-2 font-mono text-xs">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-[#090D16] border border-[#1E293B] hover:border-[#3B82F6] text-[#F1F5F9] rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-slate-400 group-hover:text-[#3B82F6]" />
                    <span>GitHub Codebases</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-500 group-hover:text-[#3B82F6]" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-[#090D16] border border-[#1E293B] hover:border-[#3B82F6] text-[#F1F5F9] rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-slate-400 group-hover:text-[#3B82F6]" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-500 group-hover:text-[#3B82F6]" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-[#090D16] border border-[#1E293B] hover:border-[#3B82F6] text-[#F1F5F9] rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Twitter size={16} className="text-slate-400 group-hover:text-[#3B82F6]" />
                    <span>Twitter / X Updates</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-500 group-hover:text-[#3B82F6]" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
