"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  Award,
  Building,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileCheck2
} from "lucide-react";

export default function GovSchemes() {
  const { selectedStartup } = useApp();

  if (!selectedStartup) return null;

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            Government Scheme Recommendations
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Intellectual matcher linking technology readiness benchmarks with local and national grant channels.
          </p>
        </div>
      </div>

      {/* Main Grid: Recommended list vs Evaluator Panel Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recommended schemes matching cards */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm tracking-tight">Vetted Grant Programs</h3>
            <span className="text-xs bg-muted px-2.5 py-1 rounded-full font-bold">
              {selectedStartup.governmentSchemes.length} Match Programs
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {selectedStartup.governmentSchemes.map((scheme, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand/45 transition-all"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold bg-brand/5 border border-brand/20 text-brand px-2.5 py-0.5 rounded-full uppercase">
                      {scheme.agency}
                    </span>
                    <span className="text-[9px] font-bold bg-emerald/5 border border-emerald/20 text-emerald px-2.5 py-0.5 rounded-full uppercase">
                      {scheme.grantAmount}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground mt-1">{scheme.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {scheme.eligibility}
                  </p>

                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Matching Reasons:</span>
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {scheme.reasons.map((reason, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[9px] font-semibold bg-background border border-border text-muted-foreground px-2 py-0.5 rounded"
                        >
                          ✓ {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 border border-border/80 bg-background/50 rounded-xl min-w-[120px] text-center">
                  <span className="text-2xl font-black text-brand">{scheme.matchPercentage}%</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Match Index</span>
                  <div className="w-full h-1 bg-border rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-brand" style={{ width: `${scheme.matchPercentage}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Startup India Evaluator Review */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-emerald font-bold text-xs">
              <Building size={16} />
              <span>Startup India Panel Review</span>
            </div>
            <span className="text-[9px] text-muted-foreground">Expert advisory comment regarding compliance validation</span>

            <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/20 p-4 rounded-xl border border-border/80 mt-2">
              "{selectedStartup.panelReviews.startupIndiaEvaluator}"
            </p>
          </div>

          {/* Quick tips panel */}
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-3">
            <h4 className="font-bold text-xs">Grant Application Guidelines</h4>
            <ul className="flex flex-col gap-2 mt-1">
              {[
                { title: "DPIIT Registration", note: "Ensure registration certificate is active." },
                { title: "TRL Documentation", note: "Submit test report certificates as evidence." },
                { title: "Utilization Reports", note: "Track milestones carefully for batch payments." }
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 size={12} className="text-emerald mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">{tip.title}:</span>
                    <span className="text-muted-foreground ml-1">{tip.note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
