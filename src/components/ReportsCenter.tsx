"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  FileBarChart,
  Printer,
  Shield,
  Download,
  Info,
  Layers,
  Factory
} from "lucide-react";

export default function ReportsCenter() {
  const { selectedStartup } = useApp();

  if (!selectedStartup) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5 print:hidden">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            Venture Intelligence Reports
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Generate printable, investor-grade dossiers containing complete scorecards, IP audits, and panel reviews.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-semibold shadow-md transition-all glow-brand"
        >
          <Printer size={14} />
          <span>Print Executive Summary</span>
        </button>
      </div>

      {/* Main Printable Dossier Container */}
      <div className="p-8 rounded-3xl border border-border bg-card/20 backdrop-blur-sm glass-panel flex flex-col gap-8 print:border-none print:bg-white print:text-black print:p-0 print:shadow-none">
        
        {/* Printable Header */}
        <div className="flex justify-between items-start border-b border-border pb-6">
          <div>
            <span className="text-[10px] font-extrabold text-brand uppercase tracking-widest">StartupScope AI Report Dossier</span>
            <h2 className="text-2xl font-black mt-1 text-foreground print:text-black">{selectedStartup.name}</h2>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-xl">{selectedStartup.tagline}</p>
          </div>
          
          <div className="text-right flex flex-col items-end">
            <span className="text-4xl font-black text-brand print:text-black">{selectedStartup.healthScore}</span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Health Rating Index</span>
            <span className="text-[9px] bg-brand/5 border border-brand/20 text-brand px-2 py-0.5 rounded font-semibold mt-1 uppercase print:text-black">
              {selectedStartup.fundingStage}
            </span>
          </div>
        </div>

        {/* Section 1: Scores breakdown */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
            I. Executive Venture Scorecard
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-2">
            {[
              { label: "Innovation Score", val: selectedStartup.innovationScore },
              { label: "Market Size Score", val: selectedStartup.marketPotentialScore },
              { label: "VC Appeal Score", val: selectedStartup.investorReadinessScore },
              { label: "IP Strength Score", val: selectedStartup.ipStrengthScore },
              { label: "TRL / Mfg Score", val: selectedStartup.commercializationScore }
            ].map((score, i) => (
              <div key={i} className="p-3 border border-border rounded-xl bg-background/40 print:text-black">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">{score.label}</span>
                <p className="text-lg font-extrabold mt-1 text-foreground print:text-black">{score.val}/100</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Core summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem / Solution */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
              II. Venture Hypothesis
            </h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-brand uppercase">Problem Statement</span>
                <p className="text-xs text-muted-foreground leading-relaxed print:text-black">{selectedStartup.problem}</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-emerald uppercase">Product Solution</span>
                <p className="text-xs text-muted-foreground leading-relaxed print:text-black">{selectedStartup.solution}</p>
              </div>
            </div>
          </div>

          {/* Sizing / Model */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
              III. Markets & Revenue
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 border border-border rounded-lg bg-background/20 text-center">
                <span className="text-[8px] font-bold text-muted-foreground uppercase">TAM</span>
                <p className="text-sm font-extrabold mt-0.5 text-foreground print:text-black">${selectedStartup.marketSize.tam}M</p>
              </div>
              <div className="p-2 border border-border rounded-lg bg-background/20 text-center">
                <span className="text-[8px] font-bold text-muted-foreground uppercase">SAM</span>
                <p className="text-sm font-extrabold mt-0.5 text-foreground print:text-black">${selectedStartup.marketSize.sam}M</p>
              </div>
              <div className="p-2 border border-border rounded-lg bg-background/20 text-center">
                <span className="text-[8px] font-bold text-muted-foreground uppercase">SOM</span>
                <p className="text-sm font-extrabold mt-0.5 text-foreground print:text-black">${selectedStartup.marketSize.som}M</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <div className="flex justify-between text-xs border-b border-border/50 pb-1">
                <span className="text-muted-foreground">Business Model:</span>
                <span className="font-semibold text-foreground print:text-black">{selectedStartup.businessModel.substring(0, 50)}...</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Revenue Model:</span>
                <span className="font-semibold text-foreground print:text-black">{selectedStartup.revenueModel.substring(0, 50)}...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Engineering TRL / IP audit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
              IV. Technology Maturity (TRL & MRL)
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold flex items-center gap-1">
                  <Layers size={14} className="text-brand" />
                  <span>TRL level {selectedStartup.trlDetails.level}</span>
                </span>
                <span className="text-muted-foreground">{selectedStartup.trlDetails.title}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-border/50 pt-2">
                <span className="font-semibold flex items-center gap-1">
                  <Factory size={14} className="text-emerald" />
                  <span>MRL level {selectedStartup.mrlDetails.level}</span>
                </span>
                <span className="text-muted-foreground">{selectedStartup.mrlDetails.title}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
              V. Intellectual Property Moat
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Patents Filed:</span>
                <span className="font-semibold text-brand print:text-black">{selectedStartup.ipDetails.patentsFiled} Filed</span>
              </div>
              <div className="flex justify-between text-xs border-t border-border/50 pt-2">
                <span className="text-muted-foreground">Patents Granted:</span>
                <span className="font-semibold text-emerald print:text-black">{selectedStartup.ipDetails.patentsGranted} Granted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: SWOT Factors summary */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
            VI. Venture SWOT Analysis
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 border border-border rounded-xl">
              <span className="text-[8px] font-bold text-emerald uppercase">Strengths</span>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug print:text-black">
                {selectedStartup.swot.strengths[0]}
              </p>
            </div>
            <div className="p-3 border border-border rounded-xl">
              <span className="text-[8px] font-bold text-amber-500 uppercase">Weaknesses</span>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug print:text-black">
                {selectedStartup.swot.weaknesses[0]}
              </p>
            </div>
            <div className="p-3 border border-border rounded-xl">
              <span className="text-[8px] font-bold text-brand uppercase">Opportunities</span>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug print:text-black">
                {selectedStartup.swot.opportunities[0]}
              </p>
            </div>
            <div className="p-3 border border-border rounded-xl">
              <span className="text-[8px] font-bold text-rose uppercase">Threats</span>
              <p className="text-[10px] text-muted-foreground mt-1 leading-snug print:text-black">
                {selectedStartup.swot.threats[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Panel Recommendations */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
            VII. Panel Vetting Remarks
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { role: "Venture Capital Lead", text: selectedStartup.panelReviews.vcInvestor },
              { role: "Patent Examiner", text: selectedStartup.panelReviews.patentExaminer },
              { role: "Startup India Evaluator", text: selectedStartup.panelReviews.startupIndiaEvaluator }
            ].map((p, i) => (
              <div key={i} className="p-3 bg-background/50 border border-border rounded-xl">
                <span className="text-[8px] font-bold text-brand uppercase tracking-wider">{p.role}</span>
                <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5 print:text-black italic">
                  "{p.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* printable footer */}
        <div className="border-t border-border pt-4 text-center text-[8px] text-muted-foreground uppercase tracking-widest mt-4">
          Report dossier compiled automatically by StartupScope AI • Confidentially Vetted.
        </div>
      </div>

      {/* Supporting Documents download lists */}
      <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4 print:hidden">
        <div>
          <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
            <FileBarChart size={16} className="text-brand" />
            <span>Supporting Venture Documents</span>
          </h3>
          <span className="text-[10px] text-muted-foreground">Download submitted file copies locally</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          {[
            { name: "Executive Pitch Deck", type: "PDF File", size: "3.2 MB" },
            { name: "Full Financial Forecasts", type: "Excel File", size: "1.4 MB" },
            { name: "Registered Patent Claims", type: "Zip File", size: "8.9 MB" }
          ].map((doc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/80 bg-background/50 flex items-center justify-between gap-3 hover:border-brand/40 transition-colors"
            >
              <div className="truncate">
                <h5 className="text-xs font-semibold text-foreground truncate">{doc.name}</h5>
                <span className="text-[9px] text-muted-foreground">{doc.type} • {doc.size}</span>
              </div>
              <button className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground">
                <Download size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
