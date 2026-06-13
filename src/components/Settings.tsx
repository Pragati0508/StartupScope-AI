"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Trash2,
  Lock,
  User,
  CheckCircle2,
  RotateCcw
} from "lucide-react";

export default function Settings() {
  const { theme, toggleTheme, startups } = useApp();

  const [username, setUsername] = useState("VentureAnalyst_09");
  const [apiKey, setApiKey] = useState("sk-proj-**********************");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("Preferences saved successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleResetHistory = () => {
    if (confirm("Are you sure you want to clear your custom submitted startups? This will reset the workspace list to the 3 standard default startups.")) {
      localStorage.removeItem("startupscope-startups");
      alert("Custom evaluations cleared. Please refresh the page to reload default states.");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            Settings & Preferences
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Manage your evaluation profile, workspace credentials, and display themes.
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="p-6 md:p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm glass-panel flex flex-col gap-6">
        
        {/* Profile Card */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Venture Analyst Profile</h3>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">Username / ID</label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-border my-1"></div>

        {/* Display Settings */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald">Display & Aesthetics</h3>
          
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 text-xs">
            <div>
              <p className="font-semibold text-foreground">Theme Toggle</p>
              <span className="text-[10px] text-muted-foreground">Select dark or light interface mode</span>
            </div>
            
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:bg-muted text-xs font-bold transition-all"
            >
              {theme === "dark" ? (
                <>
                  <Moon size={14} className="text-brand" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun size={14} className="text-amber-500" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-border my-1"></div>

        {/* API Keys Configuration */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-500">API Integration Keys</h3>
          <p className="text-[10px] text-muted-foreground leading-relaxed -mt-2">
            Add real LLM API keys to enable live, external chat advice features instead of offline heuristic panels.
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase font-bold tracking-wider">Gemini API Key</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand font-mono text-[10px]"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-border my-1"></div>

        {/* Storage Controls */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose">Venture History Cache</h3>
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 text-xs">
            <div>
              <p className="font-semibold text-foreground">Clear Custom Evaluations</p>
              <span className="text-[10px] text-muted-foreground">Removes custom startups from this browser cache</span>
            </div>
            
            <button
              type="button"
              onClick={handleResetHistory}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose/10 hover:bg-rose/20 text-rose text-xs font-semibold transition-all border border-rose/20"
            >
              <RotateCcw size={14} />
              <span>Reset Vitals</span>
            </button>
          </div>
        </div>

        {/* Save button and alerts */}
        <div className="flex justify-between items-center pt-4 border-t border-border mt-2">
          {successMsg ? (
            <span className="flex items-center gap-1 text-xs text-emerald font-semibold animate-fade-in">
              <CheckCircle2 size={14} />
              <span>{successMsg}</span>
            </span>
          ) : (
            <div></div>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold shadow-md transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
