"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  Info
} from "lucide-react";

export default function InnovationAnalysis() {
  const { selectedStartup, setActiveTab } = useApp();

  if (!selectedStartup) return null;

  // Helper to get score styling
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 70) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-rose-500 bg-rose-500/10 border-rose-500/20";
  };

  // Helper to format market size in Millions/Billions
  const formatMarketSize = (num: number) => {
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}B`;
    }
    return `$${num}M`;
  };

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            AI Innovation & Market Analysis
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Quantitative assessment of technology novelty, proprietary patents, and market viability.
          </p>
        </div>
      </div>

      {/* Score overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col justify-between hover:border-brand/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Novelty Score</span>
            <Sparkles size={16} className="text-brand" />
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-black">{selectedStartup.innovationScore}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
            Reflects academic backing, tech uniqueness, and product differentiation factors.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col justify-between hover:border-brand/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Uniqueness Rating</span>
            <Award size={16} className="text-emerald" />
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-black">{Math.round(selectedStartup.innovationScore * 0.95)}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
            Evaluates defense boundaries against legacy players and low-barrier clone copycats.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col justify-between hover:border-brand/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Market CAGR Forecast</span>
            <TrendingUp size={16} className="text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-4xl font-black text-amber-500">+{selectedStartup.marketSize.growthRate}%</span>
            <span className="text-xs text-muted-foreground">YoY</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
            Annualized expansion velocity of the target industrial segments over the next 5 years.
          </p>
        </div>
      </div>

      {/* Market Sizing TAM/SAM/SOM Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: TAM/SAM/SOM concentric grids */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <TrendingUp size={16} className="text-brand" />
              <span>Concentric Market Opportunity Sizing</span>
            </h3>
            <span className="text-[10px] text-muted-foreground">TAM vs SAM vs SOM obtaining calculations</span>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {/* TAM Block */}
            <div className="p-4 rounded-xl border border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-brand"></div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider">Total Addressable Market (TAM)</h5>
                <p className="text-[10px] text-muted-foreground mt-1 max-w-md">
                  Global market size representing the absolute total revenue opportunity in this space.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-foreground">{formatMarketSize(selectedStartup.marketSize.tam)}</span>
                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">100% Volume</p>
              </div>
            </div>

            {/* SAM Block */}
            <div className="p-4 rounded-xl border border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-cyan-500"></div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider">Serviceable Addressable Market (SAM)</h5>
                <p className="text-[10px] text-muted-foreground mt-1 max-w-md">
                  The subset of TAM targeted by your specific product, technology, and regional distribution.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-cyan-500">{formatMarketSize(selectedStartup.marketSize.sam)}</span>
                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                  {Math.round((selectedStartup.marketSize.sam / selectedStartup.marketSize.tam) * 100)}% of TAM
                </p>
              </div>
            </div>

            {/* SOM Block */}
            <div className="p-4 rounded-xl border border-border bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-emerald-500"></div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider">Serviceable Obtainable Market (SOM)</h5>
                <p className="text-[10px] text-muted-foreground mt-1 max-w-md">
                  The realistic portion of SAM that the startup expects to capture within the next 3-5 years.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-500">{formatMarketSize(selectedStartup.marketSize.som)}</span>
                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                  {Math.round((selectedStartup.marketSize.som / selectedStartup.marketSize.sam) * 100)}% of SAM
                </p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground leading-relaxed italic bg-muted/20 p-3 rounded-lg mt-2 flex items-start gap-1.5">
            <Info size={14} className="text-brand flex-shrink-0 mt-0.5" />
            <span>{selectedStartup.marketSize.explanation}</span>
          </p>
        </div>

        {/* Right Column: Technology Advantage audit comments */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <BookOpen size={16} className="text-emerald" />
              <span>Technology Advantage Audit</span>
            </h3>
            <span className="text-[10px] text-muted-foreground">Review from the Technology Commercialization Expert</span>
          </div>

          <div className="flex flex-col gap-4 my-4">
            <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-2">
              <span className="text-[10px] font-bold text-emerald uppercase tracking-wider">Core Novelty</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedStartup.solution}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-2">
              <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Expert Opinion</span>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                "{selectedStartup.panelReviews.commercializationExpert}"
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("trl-mrl")}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand/10 hover:bg-brand/20 text-brand text-xs font-semibold transition-all"
          >
            <span>Review Full TRL / MRL Maturity</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* SWOT Quadrant Assessment */}
      <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-sm tracking-tight">Venture SWOT Assessment</h3>
          <span className="text-[10px] text-muted-foreground">Detailed matrix mapping internal capability vs external context</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {/* Strengths */}
          <div className="p-4 rounded-2xl border border-emerald/20 bg-emerald/5 flex flex-col gap-2.5">
            <span className="text-xs font-extrabold text-emerald uppercase tracking-wider flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald"></div>
              <span>Strengths</span>
            </span>
            <ul className="flex flex-col gap-1.5 list-disc pl-4 text-xs text-muted-foreground leading-relaxed">
              {selectedStartup.swot.strengths.map((str, i) => (
                <li key={i}>{str}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex flex-col gap-2.5">
            <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span>Weaknesses</span>
            </span>
            <ul className="flex flex-col gap-1.5 list-disc pl-4 text-xs text-muted-foreground leading-relaxed">
              {selectedStartup.swot.weaknesses.map((weak, i) => (
                <li key={i}>{weak}</li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="p-4 rounded-2xl border border-brand/20 bg-brand/5 flex flex-col gap-2.5">
            <span className="text-xs font-extrabold text-brand uppercase tracking-wider flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
              <span>Opportunities</span>
            </span>
            <ul className="flex flex-col gap-1.5 list-disc pl-4 text-xs text-muted-foreground leading-relaxed">
              {selectedStartup.swot.opportunities.map((opp, i) => (
                <li key={i}>{opp}</li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="p-4 rounded-2xl border border-rose/20 bg-rose/5 flex flex-col gap-2.5">
            <span className="text-xs font-extrabold text-rose uppercase tracking-wider flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-rose"></div>
              <span>Threats</span>
            </span>
            <ul className="flex flex-col gap-1.5 list-disc pl-4 text-xs text-muted-foreground leading-relaxed">
              {selectedStartup.swot.threats.map((thr, i) => (
                <li key={i}>{thr}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
