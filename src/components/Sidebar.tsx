"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  LayoutDashboard,
  ClipboardCheck,
  Sparkles,
  Milestone,
  FileCheck,
  TrendingUp,
  Award,
  Target,
  Bot,
  FileBarChart,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ArrowLeft
} from "lucide-react";

export default function Sidebar() {
  const {
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    selectedStartup,
    setSelectedStartupById,
    startups
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "evaluation", label: "Startup Evaluation", icon: ClipboardCheck },
    { id: "ai-analysis", label: "AI Analysis", icon: Sparkles },
    { id: "trl-mrl", label: "TRL & MRL", icon: Milestone },
    { id: "ip", label: "IP Assessment", icon: FileCheck },
    { id: "investment", label: "Investment Readiness", icon: TrendingUp },
    { id: "schemes", label: "Government Schemes", icon: Award },
    { id: "competitors", label: "Competitor Analysis", icon: Target },
    { id: "mentor", label: "AI Mentor", icon: Bot },
    { id: "reports", label: "Reports Center", icon: FileBarChart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Helper to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-500 border-emerald-500/30 bg-emerald-500/5";
    if (score >= 70) return "text-amber-500 border-amber-500/30 bg-amber-500/5";
    return "text-rose-500 border-rose-500/30 bg-rose-500/5";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card/90 backdrop-blur-md border-b border-border z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand to-emerald flex items-center justify-center font-bold text-white text-sm">
            SS
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none">StartupScope</h1>
            <span className="text-[10px] text-muted-foreground">AI Scorecard</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-card/95 backdrop-blur-md border-r border-border z-50 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand to-emerald flex items-center justify-center font-extrabold text-white text-lg shadow-md glow-brand">
              SS
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
                StartupScope AI
              </h1>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1 block">
                Venture Intelligence
              </span>
            </div>
          </div>

          {/* Active Startup Dropdown */}
          <div className="relative mb-5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1.5 ml-1">
              Active Evaluation
            </label>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-left text-sm transition-colors duration-200"
            >
              <div className="truncate">
                <p className="font-semibold truncate text-xs">{selectedStartup?.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{selectedStartup?.industry}</p>
              </div>
              <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1.5 py-1 bg-card border border-border rounded-xl shadow-xl z-55 max-h-60 overflow-y-auto glass-panel">
                {startups.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStartupById(s.id);
                      setShowDropdown(false);
                      if (activeTab === "landing") {
                        setActiveTab("dashboard");
                      }
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-muted/80 flex flex-col gap-0.5 transition-colors ${
                      selectedStartup?.id === s.id ? "bg-muted font-semibold border-l-2 border-brand" : ""
                    }`}
                  >
                    <span className="truncate">{s.name}</span>
                    <span className="text-[9px] text-muted-foreground truncate">{s.industry}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Live CIBIL Score Card */}
          <div className={`p-3 rounded-xl border mb-6 flex flex-col gap-1.5 glass-panel ${getScoreColor(selectedStartup?.healthScore)}`}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-wider">Startup Health Index</span>
              <span className="text-[10px] font-semibold">{selectedStartup?.fundingStage}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black">{selectedStartup?.healthScore}</span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
            {/* Simple visual bar */}
            <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mt-1">
              <div
                className={`h-full rounded-full ${getScoreBg(selectedStartup?.healthScore)}`}
                style={{ width: `${selectedStartup?.healthScore}%` }}
              ></div>
            </div>
            <span className="text-[9px] text-muted-foreground mt-0.5">
              Reflects technology, IP, market fit & VC appeal.
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1 ml-1">
              Workspace
            </span>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-brand text-white shadow-md glow-brand font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border flex flex-col gap-3 bg-muted/20">
          <button
            onClick={() => setActiveTab("landing")}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted text-xs font-semibold transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={14} />
            <span>Exit to Landing</span>
          </button>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">© StartupScope AI</span>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-45 md:hidden"
        />
      )}
    </>
  );
}
