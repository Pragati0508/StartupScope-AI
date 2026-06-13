"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  Layers,
  Factory,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info
} from "lucide-react";

export default function TrlMrlAssessment() {
  const { selectedStartup } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<"trl" | "mrl">("trl");

  if (!selectedStartup) return null;

  const trlStages = [
    { lvl: 1, name: "Basic Principles", desc: "Scientific research translated into basic principles." },
    { lvl: 2, name: "Concept Formulated", desc: "Practical application identified, concept formulated." },
    { lvl: 3, name: "Proof of Concept", desc: "Experimental critical functions validated in laboratory." },
    { lvl: 4, name: "Lab Validation", desc: "Component validation in laboratory environment." },
    { lvl: 5, name: "Relevant Validation", desc: "Validation in relevant simulated environment." },
    { lvl: 6, name: "Prototype Demo", desc: "System prototype demonstrated in relevant environment." },
    { lvl: 7, name: "Operational Demo", desc: "Prototype demonstrated in operational environment." },
    { lvl: 8, name: "Qualified System", desc: "Actual system completed and qualified through test." },
    { lvl: 9, name: "Proven Operations", desc: "Successful mission operations and field replication." }
  ];

  const mrlStages = [
    { lvl: 1, name: "Mfg Feasibility", desc: "Manufacturing feasibility identified." },
    { lvl: 2, name: "Concept Formed", desc: "Manufacturing concept formulated." },
    { lvl: 3, name: "Lab Proving", desc: "Manufacturing processes proved in lab." },
    { lvl: 4, name: "Lab Capability", desc: "Lab manufacturing capability demonstrated." },
    { lvl: 5, name: "Relevant Model", desc: "Capability demonstrated in relevant environment." },
    { lvl: 6, name: "Pilot Line", desc: "Pilot line manufacturing capability demonstrated." },
    { lvl: 7, name: "Process Validation", desc: "Processes validated in operational environment." },
    { lvl: 8, name: "LRIP Complete", desc: "Low Rate Initial Production validated." },
    { lvl: 9, name: "FRP Proven", desc: "Full Rate Production demonstrated." },
    { lvl: 10, name: "Lean Production", desc: "Lean production methods proven." }
  ];

  const activeLevel = activeSubTab === "trl" ? selectedStartup.trlDetails.level : selectedStartup.mrlDetails.level;
  const currentDetails = activeSubTab === "trl" ? selectedStartup.trlDetails : selectedStartup.mrlDetails;

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            TRL & MRL Assessment
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Technology Readiness Level (TRL) and Manufacturing Readiness Level (MRL) engineering audit checklists.
          </p>
        </div>

        {/* Toggle subtabs */}
        <div className="flex items-center gap-1.5 p-1 bg-muted rounded-xl border border-border">
          <button
            onClick={() => setActiveSubTab("trl")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === "trl" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers size={14} />
            <span>Technology (TRL)</span>
          </button>
          <button
            onClick={() => setActiveSubTab("mrl")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === "mrl" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Factory size={14} />
            <span>Manufacturing (MRL)</span>
          </button>
        </div>
      </div>

      {/* Main timeline tracker visual */}
      <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-6 overflow-hidden">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm tracking-tight">
              {activeSubTab === "trl" ? "Technology Development Roadmap" : "Manufacturing Operations Scale"}
            </h3>
            <span className="text-[10px] text-muted-foreground">
              Current level marked in active color highlight
            </span>
          </div>
          <span
            className={`text-xs font-black px-2.5 py-1 rounded-full ${
              activeSubTab === "trl"
                ? "bg-brand/10 text-brand border border-brand/20"
                : "bg-emerald/10 text-emerald border border-emerald/20"
            }`}
          >
            Level {activeLevel} of {activeSubTab === "trl" ? 9 : 10}
          </span>
        </div>

        {/* Stepper container */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-start gap-4 min-w-[800px] px-2">
            {(activeSubTab === "trl" ? trlStages : mrlStages).map((stage) => {
              const isCurrent = stage.lvl === activeLevel;
              const isPassed = stage.lvl < activeLevel;
              return (
                <div
                  key={stage.lvl}
                  className={`flex-1 flex flex-col gap-2 p-3 rounded-xl border relative transition-all duration-300 ${
                    isCurrent
                      ? activeSubTab === "trl"
                        ? "border-brand bg-brand/5 scale-105 shadow-md glow-brand"
                        : "border-emerald bg-emerald/5 scale-105 shadow-md glow-emerald"
                      : isPassed
                      ? "border-border/60 bg-muted/20 opacity-70"
                      : "border-border/40 bg-transparent opacity-40"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border ${
                        isCurrent
                          ? activeSubTab === "trl"
                            ? "bg-brand border-brand text-white"
                            : "bg-emerald border-emerald text-white"
                          : isPassed
                          ? "bg-muted text-muted-foreground border-border"
                          : "border-border/60 text-muted-foreground"
                      }`}
                    >
                      {stage.lvl}
                    </span>
                    {isPassed && <CheckCircle2 size={12} className="text-emerald" />}
                  </div>
                  <h4 className="font-bold text-[10px] truncate">{stage.name}</h4>
                  <p className="text-[8px] text-muted-foreground leading-snug line-clamp-3">
                    {stage.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Checklist and Audit section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Checklist */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-sm tracking-tight">Level {activeLevel} Core Requirements Audit</h3>
            <span className="text-[10px] text-muted-foreground">Self-declared and verified engineering validation steps</span>
          </div>

          <div className="flex flex-col gap-2.5 mt-2">
            {currentDetails.checklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl border border-border/80 bg-background/50"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center ${
                    item.done
                      ? activeSubTab === "trl"
                        ? "bg-brand text-white"
                        : "bg-emerald text-white"
                      : "border border-border text-transparent"
                  }`}
                >
                  {item.done && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <span className={`text-xs ${item.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {item.item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical Evidence & Risk analysis */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-3">
            <div>
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                <Info size={16} className="text-brand" />
                <span>Verification & Evidence Logs</span>
              </h3>
              <span className="text-[10px] text-muted-foreground">Submitted documentation files validation</span>
            </div>

            <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-2 mt-2">
              <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Level Description</span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {currentDetails.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-background/50 border border-border flex flex-col gap-2">
              <span className="text-[10px] font-bold text-emerald uppercase tracking-wider">Evidence Audited</span>
              <p className="text-xs text-muted-foreground leading-relaxed font-mono text-[10px]">
                {activeSubTab === "trl"
                  ? (selectedStartup.trlDetails as any).evidence
                  : "Blown film extrusion process logs. Volume metrics validation certified."}
              </p>
            </div>
          </div>

          {/* Supply chain risks warning */}
          {activeSubTab === "mrl" && (
            <div className="p-6 rounded-2xl border border-rose/20 bg-rose/5 flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-rose font-bold text-xs">
                <AlertCircle size={16} />
                <span>Supply Chain Risk Advisory</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedStartup.mrlDetails.supplyChainRisk}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
