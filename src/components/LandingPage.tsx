"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Compass,
  FileText,
  Mail,
  User,
  MessageSquare
} from "lucide-react";

export default function LandingPage() {
  const { setActiveTab } = useApp();
  const [sliderTrl, setSliderTrl] = useState(5);
  const [sliderPatents, setSliderPatents] = useState(2);
  const [sliderFunding, setSliderFunding] = useState(1); // Seed

  // Simulated score calculation for the hero interactive component
  const simulatedScore = Math.min(
    95,
    Math.round(45 + sliderTrl * 4.5 + sliderPatents * 6 + sliderFunding * 8)
  );

  const getScoreLabel = (score: number) => {
    if (score >= 85) return { text: "Prime Investment Grade", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" };
    if (score >= 70) return { text: "Moderate Venture Viable", color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" };
    return { text: "High Risk / Early Development", color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" };
  };

  const scoreLabel = getScoreLabel(simulatedScore);

  const features = [
    { title: "TRL & MRL Audit", desc: "Evaluate research, engineering benchmarks, and production supply line risks.", icon: Layers },
    { title: "Intellectual Property Valuation", desc: "Deep patent claim novelty scan and freedom-to-operate reviews.", icon: FileText },
    { title: "SWOT & Competitor Maps", desc: "Generate automatic SWOT matrices and quadrant grids relative to incumbents.", icon: Compass },
    { title: "Government Grant Matcher", desc: "Instant matching with local MSME schemes and Startup India funding pools.", icon: Sparkles },
    { title: "Venture Capital Readiness", desc: "Measure metrics alignment with criteria of top global seed & Series A VCs.", icon: TrendingUp },
    { title: "Expert Panel Mentoring", desc: "Interactive AI chatbot representing investor, patent, and legal experts.", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans gradient-bg grid-dots">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand to-emerald flex items-center justify-center font-bold text-white text-sm">
            SS
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            StartupScope AI
          </span>
        </div>
        <button
          onClick={() => setActiveTab("dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand-hover text-xs font-semibold shadow-md transition-colors"
        >
          <span>Launch Platform</span>
          <ArrowRight size={14} />
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand/20 bg-brand/5 text-[11px] font-bold text-brand w-fit">
            <Sparkles size={12} className="animate-pulse" />
            <span>THE CREDIT SCORE FOR STARTUPS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
            Evaluate Startups Like <span className="bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">CIBIL Scores</span>
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
            StartupScope AI uses a simulated multi-expert review panel to score startups on innovation strength, technology readiness (TRL), patents, market sizing, and compliance. Get investor-grade validation summaries instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand text-white hover:bg-brand-hover text-sm font-semibold shadow-lg glow-brand transition-colors"
            >
              <span>Explore Sample Reports</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveTab("evaluation")}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold transition-colors"
            >
              <span>Submit Your Startup</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Calculator Widget */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full p-6 md:p-8 rounded-3xl border border-border glass-panel relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">
                Interactive Score Estimator
              </h3>
              <span className="text-xs bg-muted px-2.5 py-1 rounded-full font-bold">Simulator</span>
            </div>

            {/* Simulated Score Gauge display */}
            <div className="flex flex-col items-center gap-2 py-4 border-b border-border mb-6">
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full border border-border/50 bg-background/50">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black bg-gradient-to-tr from-brand to-emerald bg-clip-text text-transparent">
                    {simulatedScore}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Health Index</span>
                </div>
              </div>
              <div className={`mt-2 px-4 py-1.5 rounded-full border text-xs font-bold text-center ${scoreLabel.bg} ${scoreLabel.color}`}>
                {scoreLabel.text}
              </div>
            </div>

            {/* Slider items */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Technology Readiness (TRL)</span>
                  <span className="text-brand">Level {sliderTrl}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={sliderTrl}
                  onChange={(e) => setSliderTrl(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-brand"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Patents Filed / Granted</span>
                  <span className="text-emerald">{sliderPatents} Active</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={sliderPatents}
                  onChange={(e) => setSliderPatents(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-emerald"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Capital Ingested / Traction</span>
                  <span className="text-muted-foreground">
                    {sliderFunding === 0 ? "Bootstrap" : sliderFunding === 1 ? "Seed" : "Series A+"}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={sliderFunding}
                  onChange={(e) => setSliderFunding(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <button
              onClick={() => setActiveTab("evaluation")}
              className="w-full py-3 rounded-xl bg-card hover:bg-muted border border-border text-xs font-bold text-center mt-6 transition-all"
            >
              Configure Advanced Evaluation Form
            </button>
          </motion.div>
        </div>
      </section>

      {/* Overview Framework Section */}
      <section className="bg-card/50 border-y border-border py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center flex flex-col gap-4 mb-16">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">The 6-Expert Review Panel Framework</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every submission triggers a parallel assessment program simulating key venture building viewpoints, merging them into an absolute index score.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Venture Capitalist", sub: "Liquidity horizon, margins, team capability and scale." },
            { title: "Patent Examiner", sub: "Novelty claim strength, freedom-to-operate and legal moats." },
            { title: "Startup India Evaluator", sub: "Eligibility metrics, scheme suitability and MSME grants." },
            { title: "Tech Commercialization", sub: "TRL milestones, engineering challenges and prototyping." },
            { title: "Incubator Director", sub: "Operational structure, founder advice and scaling bottlenecks." },
            { title: "Market Research Analyst", sub: "TAM/SAM validation, buyer urgency and competitor positioning." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-background flex flex-col gap-2 hover:border-brand/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-brand/5 border border-brand/10 text-brand flex items-center justify-center font-bold text-xs">
                0{i + 1}
              </div>
              <h4 className="font-bold text-sm mt-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col gap-4">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Analytical Intelligence Suite</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Everything VCs and Incubator managers need to audit emerging ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm flex flex-col gap-3 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-brand/5 border border-brand/10 text-brand flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <h4 className="font-bold text-sm">{feat.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-card/50 border-t border-border py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Flexible SaaS Subscriptions</h2>
          <p className="text-sm text-muted-foreground mt-3">Professional analytics for individual founders and institutional investors.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Founder Tier",
              price: "$49",
              period: "/month",
              desc: "Perfect for pre-seed founders looking to clean their pitch profiles and prepare for grants.",
              features: ["1 Active Startup Submission", "Full TRL / MRL Audit", "Government Scheme Recommendations", "AI Mentor Chat Access", "Download PDF Summary Report"]
            },
            {
              name: "Investor & VC Tier",
              price: "$299",
              period: "/month",
              desc: "Designed for angel investors, incubator managers, and venture capital associates vetting incoming deals.",
              features: ["25 Startup Evaluations / mo", "Advanced Competitor Matrix Grid", "IP Freedom to Operate Verification", "Custom VC Criteria Checker", "CSV Data Export & Detailed Reports", "Premium Priority AI Mentor Response"]
            },
            {
              name: "Enterprise Custom",
              price: "Custom",
              period: "",
              desc: "Custom API solutions and portal white-labeling for university incubators and government development arms.",
              features: ["Unlimited Evaluations", "Custom API Integrations", "White-labeled Submissions Portal", "Dedicated Account Analyst Support", "Custom Scorecard Weightings Config"]
            }
          ].map((tier, i) => (
            <div
              key={i}
              className={`p-6 rounded-3xl border flex flex-col justify-between bg-background relative ${
                i === 1 ? "border-brand glow-brand scale-105" : "border-border"
              }`}
            >
              {i === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  Popular Option
                </span>
              )}
              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-extrabold text-sm text-muted-foreground">{tier.name}</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black">{tier.price}</span>
                    <span className="text-xs text-muted-foreground">{tier.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">{tier.desc}</p>
                </div>

                <div className="w-full h-px bg-border my-2"></div>

                <ul className="flex flex-col gap-2.5">
                  {tier.features.map((feat, f) => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 size={14} className="text-brand flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full py-3 rounded-xl text-xs font-bold text-center mt-6 transition-all ${
                  i === 1
                    ? "bg-brand hover:bg-brand-hover text-white shadow-md"
                    : "bg-card hover:bg-muted border border-border text-foreground"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Trusted by Leading Incubators</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { quote: "StartupScope AI cut our initial screening time by 60%. The TRL and IP insights pinpoint issues that usually require days of manual diligence.", author: "Rajiv Menon", role: "Investment Director, Veda Capital" },
            { quote: "Our incubated founders use StartupScope's metrics checklists to audit their engineering readiness before proposing to corporate partners.", author: "Dr. Amanda Chen", role: "Head of CleanTech Hub, Toronto" },
            { quote: "The CIBIL-like health score has simplified our evaluation reports for Startup India seed grants. Highly recommend this premium analytical engine.", author: "Sunita Deshmukh", role: "Coordinator, Maharashtra Incubation Lab" }
          ].map((test, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card/20 backdrop-blur-sm flex flex-col justify-between">
              <p className="text-xs italic text-muted-foreground leading-relaxed">"{test.quote}"</p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                  {test.author[0]}
                </div>
                <div>
                  <h5 className="text-xs font-bold">{test.author}</h5>
                  <p className="text-[10px] text-muted-foreground">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-card/30 border-t border-border py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto rounded-3xl border border-border p-6 md:p-10 glass-panel">
          <div className="text-center mb-8 flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold">Have Questions? Let's Connect</h2>
            <p className="text-xs text-muted-foreground">Get in touch with our institutional partnership managers.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry submitted! We will contact you soon."); }} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Inquiry Type</label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand">
                <option>SaaS Platform Custom Demo</option>
                <option>Incubator / Accelerator Partnership</option>
                <option>Enterprise Integration API</option>
                <option>General Support</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Message</label>
              <textarea
                rows={4}
                required
                placeholder="How can we help your fund or startup?"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand text-white hover:bg-brand-hover text-xs font-semibold shadow-md transition-colors mt-2"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 md:px-12 text-center text-xs text-muted-foreground bg-background">
        <p>© 2026 StartupScope AI. Inspired by PitchBook, Crunchbase, and Gartner. All rights reserved.</p>
      </footer>
    </div>
  );
}
