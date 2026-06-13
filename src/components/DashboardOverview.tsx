"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Clock,
  ArrowUpRight,
  Shield,
  Download,
  Trash2
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

// Helper Circular Gauge Component for premium aesthetics
function CircularGauge({ score, title, label, colorClass, gradientId }: { score: number; title: string; label: string; colorClass: string; gradientId: string }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border bg-card/40 backdrop-blur-sm relative hover:border-brand/35 transition-colors duration-200">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full blur-md opacity-20 ${colorClass}`}></div>
        
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-muted fill-none"
            strokeWidth="5"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="fill-none transition-all duration-1000 ease-out"
            stroke={`url(#${gradientId})`}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {gradientId === "grad-health" && (
                <>
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </>
              )}
              {gradientId === "grad-innov" && (
                <>
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </>
              )}
              {gradientId === "grad-market" && (
                <>
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </>
              )}
              {gradientId === "grad-invest" && (
                <>
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </>
              )}
              {gradientId === "grad-ip" && (
                <>
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </>
              )}
              {gradientId === "grad-comm" && (
                <>
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </>
              )}
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute text-sm font-black tracking-tight">{score}</span>
      </div>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-2.5">{title}</p>
      <span className="text-[9px] text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}

export default function DashboardOverview() {
  const {
    selectedStartup,
    startups,
    setSelectedStartupById,
    setActiveTab
  } = useApp();

  // Prepare data for the Recharts Radar chart
  const radarData = [
    { subject: "Innovation", score: selectedStartup?.innovationScore || 70, fullMark: 100 },
    { subject: "Market Size", score: selectedStartup?.marketPotentialScore || 70, fullMark: 100 },
    { subject: "VC Appeal", score: selectedStartup?.investorReadinessScore || 70, fullMark: 100 },
    { subject: "IP Strength", score: selectedStartup?.ipStrengthScore || 70, fullMark: 100 },
    { subject: "TRL / Comm", score: selectedStartup?.commercializationScore || 70, fullMark: 100 },
    { subject: "Health Score", score: selectedStartup?.healthScore || 70, fullMark: 100 },
  ];

  // Helper for risk status styling
  const getRiskColor = (val: number) => {
    if (val >= 80) return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    if (val >= 50) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
  };

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0">
      {/* Top Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            {selectedStartup?.name}
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-2xl">
            {selectedStartup?.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("reports")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-border hover:bg-muted text-xs font-semibold transition-all"
          >
            <Download size={14} />
            <span>Export Report</span>
          </button>
          <button
            onClick={() => setActiveTab("evaluation")}
            className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-semibold shadow-md transition-all glow-brand"
          >
            Evaluate New Startup
          </button>
        </div>
      </div>

      {/* 6 Key Analytics Metric Gauges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <CircularGauge
          score={selectedStartup?.healthScore || 0}
          title="Health Index"
          label="Composite CIBIL Rating"
          colorClass="bg-brand"
          gradientId="grad-health"
        />
        <CircularGauge
          score={selectedStartup?.innovationScore || 0}
          title="Innovation"
          label="Novelty Moat Rank"
          colorClass="bg-purple-500"
          gradientId="grad-innov"
        />
        <CircularGauge
          score={selectedStartup?.marketPotentialScore || 0}
          title="Market Size"
          label="TAM / SOM Outlook"
          colorClass="bg-cyan-500"
          gradientId="grad-market"
        />
        <CircularGauge
          score={selectedStartup?.investorReadinessScore || 0}
          title="VC Readiness"
          label="Fundability Status"
          colorClass="bg-rose-500"
          gradientId="grad-invest"
        />
        <CircularGauge
          score={selectedStartup?.ipStrengthScore || 0}
          title="IP Protection"
          label="Patent Moat Audit"
          colorClass="bg-emerald-500"
          gradientId="grad-ip"
        />
        <CircularGauge
          score={selectedStartup?.commercializationScore || 0}
          title="TRL Scale"
          label="Maturity to Market"
          colorClass="bg-amber-500"
          gradientId="grad-comm"
        />
      </div>

      {/* Main Graph Grid (Radar Chart vs Risk/Roadmap Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recharts Radar Assessment */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm tracking-tight">Venture Intelligence Profile</h3>
            <span className="text-[10px] text-muted-foreground">Radial metric mapping across core dimensions</span>
          </div>

          <div className="w-full h-80 flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="var(--border)" strokeWidth={1} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 700 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 8 }}
                />
                <Radar
                  name={selectedStartup?.name}
                  dataKey="score"
                  stroke="var(--brand)"
                  fill="var(--brand)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Quick Insights Panels (Risks & VC Matcher) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Top Risk Exposure Matrix */}
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-rose-500">
                <AlertTriangle size={15} />
                <span>Top Risk Exposure Audit</span>
              </h3>
              <span className="text-[10px] text-muted-foreground">Expert panel risk index limits (0-100)</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Technical Risk", val: selectedStartup?.risks.technical || 0 },
                { label: "Financial Risk", val: selectedStartup?.risks.financial || 0 },
                { label: "Market Risk", val: selectedStartup?.risks.market || 0 },
                { label: "Regulatory Risk", val: selectedStartup?.risks.regulatory || 0 }
              ].map((risk, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex flex-col gap-1.5 ${getRiskColor(risk.val)}`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wide">{risk.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold">{risk.val}</span>
                    <span className="text-[9px] opacity-70">/100</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-muted-foreground leading-relaxed italic bg-muted/20 p-2.5 rounded-lg">
              * {selectedStartup?.risks.description}
            </p>
          </div>

          {/* Investor Insights block */}
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-3">
            <div>
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-brand">
                <TrendingUp size={15} />
                <span>Investor Readiness Insights</span>
              </h3>
              <span className="text-[10px] text-muted-foreground">Suitability matches for top global VC profiles</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Funding Stage:</span>
                <span className="font-semibold">{selectedStartup?.fundingStage}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Capital Raised:</span>
                <span className="font-semibold text-brand">{selectedStartup?.raisedAmount}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Cash Runway:</span>
                <span className="font-semibold">{selectedStartup?.runwayMonths} Months</span>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Suggested VC Leads:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedStartup?.investmentReadiness.matchingVcs.map((vc, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-semibold bg-brand/5 border border-brand/20 text-brand px-2 py-0.5 rounded-full"
                    >
                      {vc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Panel AI Recommendations vs Commercialization Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Expert Panel Core Recommendations */}
        <div className="lg:col-span-8 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-emerald">
              <Lightbulb size={16} />
              <span>Multi-Disciplinary AI Recommendations</span>
            </h3>
            <span className="text-[10px] text-muted-foreground">Core strategic action items compiled from the expert panel review</span>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { role: "Venture Capitalist", opinion: selectedStartup?.panelReviews.vcInvestor },
              { role: "Patent Examiner", opinion: selectedStartup?.panelReviews.patentExaminer },
              { role: "Tech Commercialization", opinion: selectedStartup?.panelReviews.commercializationExpert }
            ].map((rec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-border/80 bg-background/50 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider">{rec.role}</span>
                  <span className="text-[9px] bg-emerald/10 text-emerald px-1.5 py-0.5 rounded font-medium">Verified Action</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{rec.opinion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Commercialization Roadmap Widget */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-amber-500">
              <Clock size={16} />
              <span>Milestone Roadmap</span>
            </h3>
            <span className="text-[10px] text-muted-foreground">Next 4 quarters commercialization steps</span>
          </div>

          <div className="flex flex-col gap-4 relative pl-4 border-l border-border mt-2">
            {selectedStartup?.roadmap.map((step, sIdx) => (
              <div key={sIdx} className="relative flex flex-col gap-0.5">
                {/* Visual node indicator */}
                <div
                  className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border border-background ${
                    step.status === "completed"
                      ? "bg-emerald"
                      : step.status === "in_progress"
                      ? "bg-brand animate-pulse"
                      : "bg-muted"
                  }`}
                ></div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-foreground">{step.quarter}</span>
                  <span className="text-[8px] bg-muted px-1.5 py-0.5 rounded uppercase font-bold text-muted-foreground">
                    TRL {step.targetTrl} Target
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-brand mt-0.5">{step.milestone}</h5>
                <p className="text-[10px] text-muted-foreground leading-snug">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Recent Evaluations Data Table */}
      <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm tracking-tight">Recent Startup Intelligence Evaluations</h3>
            <span className="text-[10px] text-muted-foreground">Manage and load previously evaluated startups</span>
          </div>
          <span className="text-xs bg-muted px-2.5 py-1 rounded-full font-bold">
            {startups.length} Registered
          </span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-bold">
                <th className="py-2.5 px-3">Startup Name</th>
                <th className="py-2.5 px-3">Industry Vertical</th>
                <th className="py-2.5 px-3">Score Index</th>
                <th className="py-2.5 px-3">Funding Phase</th>
                <th className="py-2.5 px-3">IP Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {startups.map((s) => (
                <tr
                  key={s.id}
                  className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                    s.id === selectedStartup?.id ? "bg-brand/5" : ""
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-foreground flex items-center gap-1.5">
                    {s.name}
                    {s.id === selectedStartup?.id && (
                      <span className="text-[9px] bg-brand text-white px-1.5 py-0.2 rounded font-bold uppercase">Active</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{s.industry}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-black text-sm px-2 py-0.5 rounded ${
                        s.healthScore >= 85
                          ? "text-emerald bg-emerald/5 border border-emerald/10"
                          : s.healthScore >= 70
                          ? "text-amber-500 bg-amber-500/5 border border-amber-500/10"
                          : "text-rose bg-rose/5 border border-rose/10"
                      }`}
                    >
                      {s.healthScore}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{s.fundingStage}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1">
                      <Shield size={12} className={s.ipDetails.patentsFiled > 0 ? "text-emerald" : "text-muted-foreground"} />
                      <span>{s.ipDetails.patentsFiled > 0 ? `${s.ipDetails.patentsFiled} Patents` : "No Patents"}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedStartupById(s.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brand/10 hover:bg-brand/20 text-brand text-[10px] font-bold transition-all"
                    >
                      <span>Load Vitals</span>
                      <ArrowUpRight size={10} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
