"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  Target,
  Check,
  X,
  Compass,
  TrendingUp,
  Award
} from "lucide-react";

export default function CompetitorAnalysis() {
  const { selectedStartup } = useApp();

  if (!selectedStartup) return null;

  // Visual Positioning Quadrant Points
  // Y: Innovation/Technology (0-100), X: Execution/Commercial (0-100)
  const quadrantPoints = [
    { name: selectedStartup.name, x: selectedStartup.commercializationScore, y: selectedStartup.innovationScore, isMain: true },
    ...selectedStartup.competitors.map((comp) => ({
      name: comp.name,
      x: comp.trl * 10,
      y: 50 + comp.marketShare * 1.5,
      isMain: false
    }))
  ];

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            Competitor Analysis & Matrix
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Market gap analysis, feature grid vetting, and competitive positioning grids.
          </p>
        </div>
      </div>

      {/* Grid: Quadrant positioning vs Market Analyst opinions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 2D positioning quadrant grid */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <Compass size={16} className="text-brand" />
              <span>Competitor Positioning Quadrant</span>
            </h3>
            <span className="text-[10px] text-muted-foreground">Plotting Innovation Moat (Y) vs GTM Execution Maturity (X)</span>
          </div>

          {/* Visual Quadrant */}
          <div className="relative w-full aspect-video md:aspect-[2/1] bg-background/50 border border-border/80 rounded-2xl overflow-hidden mt-2 p-4 flex flex-col justify-between">
            {/* Axis labels */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] uppercase font-bold text-muted-foreground">High Technology Moat</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] uppercase font-bold text-muted-foreground">Standard Technology</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] uppercase font-bold text-muted-foreground rotate-270 origin-left">Early Stage</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] uppercase font-bold text-muted-foreground rotate-90 origin-right">High Scale GTM</div>

            {/* Quadrant Lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border/40"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-border/40"></div>

            {/* Quadrant Titles */}
            <div className="absolute top-4 left-4 text-[8px] font-bold text-muted-foreground/30 uppercase">Leaders</div>
            <div className="absolute top-4 right-4 text-[8px] font-bold text-muted-foreground/30 uppercase">Visionaries</div>
            <div className="absolute bottom-4 left-4 text-[8px] font-bold text-muted-foreground/30 uppercase">Niche</div>
            <div className="absolute bottom-4 right-4 text-[8px] font-bold text-muted-foreground/30 uppercase">Challengers</div>

            {/* Rendered points */}
            {quadrantPoints.map((pt, idx) => (
              <div
                key={idx}
                className="absolute flex flex-col items-center group z-10"
                style={{
                  left: `${pt.x}%`,
                  bottom: `${pt.y}%`,
                  transform: "translate(-50%, 50%)"
                }}
              >
                {/* Visual node */}
                <div
                  className={`w-4 h-4 rounded-full border border-background shadow flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:scale-125 ${
                    pt.isMain
                      ? "bg-brand glow-brand animate-pulse scale-110"
                      : "bg-muted-foreground/80"
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>

                {/* Point Label */}
                <span
                  className={`text-[9px] font-bold mt-1 px-2 py-0.5 rounded shadow-sm bg-card border border-border border-border/80 whitespace-nowrap pointer-events-none ${
                    pt.isMain ? "text-brand border-brand/30" : "text-muted-foreground"
                  }`}
                >
                  {pt.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Expert Market Analyst Review */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <Award size={16} className="text-emerald" />
              <span>Market Analyst Advisory</span>
            </h3>
            <span className="text-[10px] text-muted-foreground">Vetting market dynamics and competitor entries</span>
          </div>

          <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-2 my-4">
            <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Market Analysis Comments</span>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "{selectedStartup.panelReviews.marketAnalyst}"
            </p>
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
            <span className="text-[9px] font-bold text-foreground uppercase">Key Takeaway</span>
            <span>Focus operations on niche target SOM segments to avoid direct price wars with capital-flushed incumbents.</span>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-sm tracking-tight">Venture Feature Matrix</h3>
          <span className="text-[10px] text-muted-foreground">Deep comparative review of capabilities against active competitor items</span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-bold">
                <th className="py-2.5 px-3">Startup / Competitor</th>
                {selectedStartup.competitorFeaturesList.map((feat, f) => (
                  <th key={f} className="py-2.5 px-3">{feat}</th>
                ))}
                <th className="py-2.5 px-3">Funding Raised</th>
                <th className="py-2.5 px-3">Technology TRL</th>
              </tr>
            </thead>
            <tbody>
              {/* Main Startup Row */}
              <tr className="border-b border-border bg-brand/5">
                <td className="py-3 px-3 font-semibold text-brand">{selectedStartup.name}</td>
                {selectedStartup.competitorFeaturesList.map((feat, f) => (
                  <td key={f} className="py-3 px-3">
                    <Check size={16} className="text-emerald" />
                  </td>
                ))}
                <td className="py-3 px-3 font-semibold text-foreground">{selectedStartup.raisedAmount}</td>
                <td className="py-3 px-3">
                  <span className="bg-brand/10 text-brand px-2 py-0.5 rounded font-bold">TRL {selectedStartup.trlDetails.level}</span>
                </td>
              </tr>

              {/* Competitors rows */}
              {selectedStartup.competitors.map((comp, cIdx) => (
                <tr key={cIdx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{comp.name}</td>
                  {selectedStartup.competitorFeaturesList.map((feat, f) => {
                    const hasFeat = comp.features[feat];
                    return (
                      <td key={f} className="py-3 px-3">
                        {hasFeat === "Yes" || hasFeat === true ? (
                          <Check size={16} className="text-emerald" />
                        ) : hasFeat === "No" || hasFeat === false ? (
                          <X size={16} className="text-rose" />
                        ) : (
                          <span className="text-[10px] text-muted-foreground">{hasFeat || "N/A"}</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-3 px-3 text-muted-foreground">{comp.funding}</td>
                  <td className="py-3 px-3">
                    <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded font-bold">TRL {comp.trl}</span>
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
