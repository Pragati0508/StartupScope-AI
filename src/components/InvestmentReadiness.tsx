"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Briefcase,
  DollarSign
} from "lucide-react";

export default function InvestmentReadiness() {
  const { selectedStartup } = useApp();
  
  // Interactive Runway Calculator States
  const [cashBalance, setCashBalance] = useState(1500000); // Default $1.5M
  const [monthlyBurn, setMonthlyBurn] = useState(100000); // Default $100K

  if (!selectedStartup) return null;

  // Runway calculation
  const calculatedRunway = Math.round(cashBalance / monthlyBurn);
  
  const getRunwayWarning = (months: number) => {
    if (months <= 6) return { text: "CRITICAL ALERT: Raise Capital Immediately", color: "text-rose bg-rose/10 border-rose/20", alert: true };
    if (months <= 12) return { text: "URGENT WARNING: Prepare Bridge / Next Round", color: "text-amber-500 bg-amber-500/10 border-amber-500/20", alert: true };
    return { text: "HEALTHY RUNWAY: Focus on Product & GTM Execution", color: "text-emerald bg-emerald/10 border-emerald/20", alert: false };
  };

  const runwayStatus = getRunwayWarning(calculatedRunway);

  const checklistItems = [
    { key: "financialModelComplete", label: "Validated 3-Year Financial Forecast Model" },
    { key: "capTableClean", label: "Clean Capitalization Table (No legacy founder blocks)" },
    { key: "pitchDeckReady", label: "Investor Pitch Deck finalized" },
    { key: "dataRoomComplete", label: "Secure Data Room completed (SOC2 Type II / Financials)" },
    { key: "valuableCoreIp", label: "Defensive Patents/IP portfolio filed" },
    { key: "recurringRevenue", label: "Repeatable subscription or utility revenue stream" },
    { key: "clearGtm", label: "Proven Customer Acquisition Channel (GTM)" },
    { key: "regulatoryClarity", label: "Clear regulatory compliance timeline (FDA, CE, local)" },
    { key: "advisorCommitment", label: "Committed advisors with industry connections" }
  ];

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            Investment Readiness Assessment
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            VC Due Diligence checklists, cash runway forecasting, and investor match parameters.
          </p>
        </div>
      </div>

      {/* Main checklist vs Runway Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Due Diligence Checklist */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <Briefcase size={16} className="text-brand" />
              <span>Venture Capital Diligence Checklist</span>
            </h3>
            <span className="text-[10px] text-muted-foreground">Standard vetting requirements of institutional funds</span>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {checklistItems.map((item, idx) => {
              const val = (selectedStartup.investmentReadiness as any)[item.key];
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-background/50 text-xs"
                >
                  <span className={val ? "text-foreground font-semibold" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                  {val ? (
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-emerald bg-emerald/10 border border-emerald/20 px-2 py-0.5 rounded">
                      <CheckCircle2 size={10} />
                      <span>Ready</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded">
                      <XCircle size={10} />
                      <span>Pending</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Runway Slider Tool & VC comments */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Interactive Runway Calculator */}
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-brand">
                <DollarSign size={16} />
                <span>Interactive Cash Runway Forecast</span>
              </h3>
              <span className="text-[10px] text-muted-foreground">Adjust parameters to simulate runway limits</span>
            </div>

            <div className="flex flex-col gap-4 my-2">
              {/* Cash slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Current Cash Balance</span>
                  <span className="text-brand">${(cashBalance / 1000).toFixed(0)}K</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={cashBalance}
                  onChange={(e) => setCashBalance(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-brand"
                />
              </div>

              {/* Burn slider */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Monthly Burn Rate</span>
                  <span className="text-rose">${(monthlyBurn / 1000).toFixed(0)}K</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="300000"
                  step="5000"
                  value={monthlyBurn}
                  onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-rose"
                />
              </div>

              {/* Dynamic Results Display */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border mt-2">
                <div>
                  <span className="text-3xl font-black text-foreground">{calculatedRunway}</span>
                  <span className="text-xs text-muted-foreground ml-1">Months</span>
                </div>
                <span className="text-[9px] uppercase font-bold text-muted-foreground">Calculated Runway</span>
              </div>

              {/* Urgency warning box */}
              <div className={`p-3 rounded-xl border text-[10px] font-bold text-center ${runwayStatus.color}`}>
                {runwayStatus.text}
              </div>
            </div>
          </div>

          {/* VC Expert Panel Comment */}
          <div className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm flex flex-col gap-3">
            <h4 className="font-bold text-xs">Venture Capital Panel Assessment</h4>
            <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/20 p-4 rounded-xl border border-border/80 mt-1">
              "{selectedStartup.panelReviews.vcInvestor}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
