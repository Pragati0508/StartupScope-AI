"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  FileCheck,
  Scale,
  Compass
} from "lucide-react";

export default function IpAssessment() {
  const { selectedStartup } = useApp();

  if (!selectedStartup) return null;

  const getFtoLabel = (status: "clear" | "low_risk" | "high_risk") => {
    switch (status) {
      case "clear":
        return { text: "Clear FTO Verified", color: "text-emerald bg-emerald/10 border-emerald/20" };
      case "low_risk":
        return { text: "Low Duplication Risk", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
      case "high_risk":
        return { text: "High Litigation Vulnerability", color: "text-rose bg-rose/10 border-rose/20" };
    }
  };

  const fto = getFtoLabel(selectedStartup.ipDetails.freedomToOperateStatus);

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            Intellectual Property Assessment
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Evaluation of proprietary technologies, patents filing strength, and infringement risk exposure.
          </p>
        </div>
      </div>

      {/* Overview stats grids */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Patents Filed */}
        <div className="p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Patents Filed</span>
          <span className="text-3xl font-black mt-2 text-brand">{selectedStartup.ipDetails.patentsFiled}</span>
          <span className="text-[9px] text-muted-foreground mt-1">Total application files logged</span>
        </div>

        {/* Patents Granted */}
        <div className="p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Patents Granted</span>
          <span className="text-3xl font-black mt-2 text-emerald">{selectedStartup.ipDetails.patentsGranted}</span>
          <span className="text-[9px] text-muted-foreground mt-1">DPIIT MSME expedited grants</span>
        </div>

        {/* Patent Moat Strength */}
        <div className="p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Patent Moat Index</span>
          <span className="text-3xl font-black mt-2 text-purple-500">{selectedStartup.ipStrengthScore}/100</span>
          <span className="text-[9px] text-muted-foreground mt-1">Global defensive viability index</span>
        </div>

        {/* Novelty Score */}
        <div className="p-5 rounded-2xl border border-border bg-card/40 backdrop-blur-sm flex flex-col justify-between">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Novelty Score</span>
          <span className="text-3xl font-black mt-2 text-amber-500">{selectedStartup.ipDetails.noveltyScore}/100</span>
          <span className="text-[9px] text-muted-foreground mt-1">Priority claim uniqueness check</span>
        </div>
      </div>

      {/* Main Audit Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Patent Details Card */}
        <div className="lg:col-span-8 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <FileCheck size={16} className="text-brand" />
              <span>Registered Claims Audit</span>
            </h3>
            <span className="text-[10px] text-muted-foreground">Detailed claims and filing summary documentation</span>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Key Patent Title</span>
              <p className="text-xs font-semibold text-foreground">{selectedStartup.ipDetails.keyPatentTitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-1.5">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Filing Jurisdictions</span>
                <p className="text-xs text-foreground font-medium">{selectedStartup.ipDetails.claimsFilingCountry}</p>
              </div>

              <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-1.5">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">Freedom to Operate Status</span>
                <div className={`mt-1 px-3 py-1 rounded-full border text-[10px] font-bold text-center w-fit ${fto.color}`}>
                  {fto.text}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Full Patent / IP Summary</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedStartup.ipDetails.detailsText}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Examiner Panel Review & Moat Assessment */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-brand font-bold text-xs">
              <Scale size={16} />
              <span>Patent Examiner Review</span>
            </div>
            <span className="text-[9px] text-muted-foreground">Official evaluation from the simulated Patent Examiner</span>
            
            <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/20 p-4 rounded-xl border border-border/80 mt-2">
              "{selectedStartup.panelReviews.patentExaminer}"
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-3">
            <h4 className="font-bold text-xs">Venture Defensive Moats</h4>
            <div className="flex flex-col gap-2.5 mt-1">
              {[
                { label: "IP Core Defense", checked: selectedStartup.ipStrengthScore > 80 },
                { label: "Trade Secret Isolation", checked: true },
                { label: "Competitor Barrier", checked: selectedStartup.ipStrengthScore > 70 },
                { label: "FTO Validation", checked: selectedStartup.ipDetails.freedomToOperateStatus === "clear" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2 rounded bg-background/40">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className={`text-[9px] font-bold uppercase ${item.checked ? "text-emerald" : "text-amber-500"}`}>
                    {item.checked ? "Verified" : "Under Review"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
