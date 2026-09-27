"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <section id="contact" className="bg-[#FFFFFF] text-slate-900 py-24 border-b border-slate-200/80 font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-3"
        >
          <span className="font-mono text-xs text-[#2563EB] uppercase tracking-widest block font-bold">
            // CONVERSION & DIRECT INQUIRY
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-900 uppercase">
            LET'S BUILD SOMETHING EXTRAORDINARY.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Have a mobile app project, custom Expo/React Native architecture requirement, or enterprise platform inquiry? Send a message below.
          </p>
        </motion.div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 bg-white border border-slate-200/90 p-8 sm:p-12 rounded-2xl space-y-8 shadow-[0_15px_35px_rgba(15,23,42,0.06)]"
          >
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-[#2563EB]/10 border border-[#2563EB] text-[#2563EB] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900">
                  MESSAGE RECEIVED
                </h3>
                <p className="text-slate-600 text-sm font-sans max-w-md mx-auto">
                  Thank you for reaching out. We have logged your request and will respond within 4 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="px-6 py-2.5 bg-slate-100 border border-slate-200 hover:border-[#2563EB] text-xs font-mono text-slate-800 rounded-lg transition-colors font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 font-sans">
                
                {/* 01 Your Name */}
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 font-mono text-xs text-slate-500 group-focus-within:text-[#2563EB] transition-colors font-medium">
                    <span className="font-bold text-[#2563EB]">01</span>
                    <span className="uppercase tracking-wider">YOUR NAME</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                  />
                </div>

                {/* 02 Your Email */}
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 font-mono text-xs text-slate-500 group-focus-within:text-[#2563EB] transition-colors font-medium">
                    <span className="font-bold text-[#2563EB]">02</span>
                    <span className="uppercase tracking-wider">YOUR EMAIL</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                  />
                </div>

                {/* 03 Your Message */}
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 font-mono text-xs text-slate-500 group-focus-within:text-[#2563EB] transition-colors font-medium">
                    <span className="font-bold text-[#2563EB]">03</span>
                    <span className="uppercase tracking-wider">YOUR MESSAGE</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project requirements, mobile platform scope, or architecture goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Send Message Button */}
                <MagneticButton
                  type="submit"
                  dataCursor="open"
                  className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-[#2563EB]/25 inline-flex items-center justify-center gap-2 font-sans"
                >
                  <Send size={16} />
                  SEND MESSAGE
                </MagneticButton>

              </form>
            )}
          </motion.div>

          {/* Right Column: Direct Contact & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 space-y-8 font-sans"
          >
            
            {/* Direct Email Card */}
            <div className="bg-white border border-slate-200/90 p-6 rounded-2xl space-y-4 shadow-[0_10px_25px_rgba(15,23,42,0.04)]">
              <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg w-fit text-[#2563EB]">
                <Mail size={20} />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block font-medium">
                  DIRECT EMAIL INQUIRIES
                </span>
                <a
                  href="mailto:engineering@qloax.com"
                  className="text-lg font-bold text-slate-900 hover:text-[#2563EB] transition-colors font-mono block"
                >
                  engineering@qloax.com
                </a>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                For urgent architecture reviews or RFPs, contact our lead mobile & frontend engineering desk directly.
              </p>
            </div>

            {/* Social Links Card */}
            <div className="bg-white border border-slate-200/90 p-6 rounded-2xl space-y-4 shadow-[0_10px_25px_rgba(15,23,42,0.04)]">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block font-medium">
                DEVELOPER PLATFORMS & SOCIALS
              </span>

              <div className="space-y-2 font-mono text-xs">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 hover:border-[#2563EB] text-slate-900 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-slate-500 group-hover:text-[#2563EB]" />
                    <span>GitHub Codebases</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-[#2563EB]" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 hover:border-[#2563EB] text-slate-900 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-slate-500 group-hover:text-[#2563EB]" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-[#2563EB]" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 hover:border-[#2563EB] text-slate-900 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Twitter size={16} className="text-slate-500 group-hover:text-[#2563EB]" />
                    <span>Twitter / X Updates</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-[#2563EB]" />
                </a>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
