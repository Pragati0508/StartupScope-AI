"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { generateStartupAnalysis } from "@/utils/analysisGenerator";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  FileText,
  HelpCircle,
  FileCheck2,
  Image as ImageIcon
} from "lucide-react";

export default function EvaluationForm() {
  const { addStartup, setActiveTab } = useApp();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [productName, setProductName] = useState("");
  const [industry, setIndustry] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [revenueModel, setRevenueModel] = useState("");
  const [team, setTeam] = useState("");
  const [fundingStage, setFundingStage] = useState("Bootstrap");
  const [trlLevel, setTrlLevel] = useState(3);
  const [mrlLevel, setMrlLevel] = useState(2);
  const [patentDetails, setPatentDetails] = useState("");

  // Upload mock states
  const [files, setFiles] = useState<{
    pdf: string | null;
    ppt: string | null;
    patent: string | null;
    image: string | null;
  }>({ pdf: null, ppt: null, patent: null, image: null });

  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleMockUpload = (type: "pdf" | "ppt" | "patent" | "image", fileName: string) => {
    setUploadProgress(prev => ({ ...prev, [type]: 5 }));
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const curr = prev[type] || 0;
        if (curr >= 100) {
          clearInterval(interval);
          setFiles(f => ({ ...f, [type]: fileName }));
          return prev;
        }
        return { ...prev, [type]: curr + 25 };
      });
    }, 300);
  };

  // Helper to load presets
  const loadPreset = (type: "ai_saas" | "clean_material") => {
    if (type === "ai_saas") {
      setName("AgriAI Solutions");
      setProductName("CropPredict Pro");
      setIndustry("AgriTech / AI SaaS");
      setProblem("Smallholder farmers lose 30% of crop yields to unpredictable pests and micro-climate failures because they lack affordable predictive crop intelligence.");
      setSolution("CropPredict Pro ingests drone spectral imagery and ground sensor moisture readings, processing them through localized AI crop models to alert farmers of pest infestations 7 days in advance via SMS.");
      setBusinessModel("B2B2C licensing through regional farming cooperatives. Cooperative pay model based on acreage, with premium advisor chat features.");
      setTargetMarket("Cooperative farming systems in South Asia and East Africa, targeting 1.2M crop acres.");
      setRevenueModel("SaaS subscription fee of $2 per acre per season, paid by the cooperative grid.");
      setTeam("Founded by Nitin Rao (ex-ICAR researcher) and Sarah Patel (Data scientist).");
      setFundingStage("Seed");
      setTrlLevel(7);
      setMrlLevel(6);
      setPatentDetails("Utility software patent pending covering multi-modal sensor crop neural mapping (IN-202519283-A).");
    } else {
      setName("HydroVoltaics");
      setProductName("NanoHydro Core");
      setIndustry("DeepTech / Materials Science");
      setProblem("Existing micro-hydro generators require large, fast-flowing rivers, which prevents high-density installation in municipal wastewater networks.");
      setSolution("NanoHydro Core utilizes hyper-structured nano-composite turbines that generate electricity from low-velocity indoor pipe flows and water drainage networks.");
      setBusinessModel("B2B direct commercial sales to municipal water boards and heavy commercial builders.");
      setTargetMarket("Municipal wastewater utility networks and eco-certified corporate smart complexes.");
      setRevenueModel("Direct hardware unit purchase + performance contract sharing 15% of offset energy costs over 5 years.");
      setTeam("Founded by Dr. Victor Vance (Material physics PhD) and Maya Lin (ex-Siemens industrial designer).");
      setFundingStage("Pre-Series A");
      setTrlLevel(5);
      setMrlLevel(4);
      setPatentDetails("Three utility patents granted covering key nano-structured turbine blade coatings (US-910283-B1).");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate multi-panel evaluation calculations
    setTimeout(() => {
      const generated = generateStartupAnalysis({
        name,
        productName,
        industry,
        problem,
        solution,
        businessModel,
        targetMarket,
        revenueModel,
        team,
        fundingStage,
        trlLevel,
        mrlLevel,
        patentDetails
      });

      addStartup(generated);
      setLoading(false);
      setActiveTab("dashboard");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full pt-16 md:pt-0 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            Startup Evaluation Engine
          </h1>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            Fill out your pitch details below to run our simulated panel review.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadPreset("ai_saas")}
            className="px-3 py-1.5 rounded-lg border border-brand/20 bg-brand/5 text-[10px] font-bold text-brand hover:bg-brand/10 transition-colors"
          >
            Load AgriTech SaaS Preset
          </button>
          <button
            onClick={() => loadPreset("clean_material")}
            className="px-3 py-1.5 rounded-lg border border-emerald/20 bg-emerald/5 text-[10px] font-bold text-emerald hover:bg-emerald/10 transition-colors"
          >
            Load DeepTech Preset
          </button>
        </div>
      </div>

      {/* Progress Wizard Bar */}
      <div className="flex items-center justify-between px-2 py-4">
        {[
          { label: "Core Profile", stepNo: 1 },
          { label: "Markets & Model", stepNo: 2 },
          { label: "TRL & Intellectual Property", stepNo: 3 }
        ].map((s) => (
          <div key={s.stepNo} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border transition-colors ${
                step >= s.stepNo
                  ? "bg-brand border-brand text-white shadow-md glow-brand"
                  : "border-border text-muted-foreground"
              }`}
            >
              {s.stepNo}
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                step >= s.stepNo ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Wizard Container */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-sm glass-panel flex flex-col gap-6">
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Startup Corporate Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AetherFusion Energy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Commercial Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FusionCore Sub-10"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Industry Classification</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DeepTech / Materials Science"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Funding Stage</label>
                <select
                  value={fundingStage}
                  onChange={(e) => setFundingStage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
                >
                  <option>Bootstrap</option>
                  <option>Angel / Seed</option>
                  <option>Pre-Series A</option>
                  <option>Series A</option>
                  <option>Series B</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Founding Team Summary</label>
              <textarea
                rows={3}
                required
                placeholder="List key founders, academic backgrounds, and industry accomplishments..."
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">The Problem Statement</label>
              <textarea
                rows={3}
                required
                placeholder="Describe the target friction point or market gap you are addressing..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Your Solution & Technology Advantage</label>
              <textarea
                rows={3}
                required
                placeholder="What is your product and what makes it unique compared to incumbents?"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Target Market Segment</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Remote industrial microgrids in Canada"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Revenue Model Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. $12,000/year license + $15 per scan"
                  value={revenueModel}
                  onChange={(e) => setRevenueModel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Business Model / GTM Strategy</label>
              <textarea
                rows={2}
                required
                placeholder="How do you acquire users and close contracts?"
                value={businessModel}
                onChange={(e) => setBusinessModel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Tech Readiness Level (TRL)</label>
                  <span className="text-xs text-brand font-bold">Level {trlLevel}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={trlLevel}
                  onChange={(e) => setTrlLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-brand my-3"
                />
                <span className="text-[9px] text-muted-foreground">
                  TRL 1: Principles observed | TRL 5: Lab validation | TRL 9: Mission proven.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Mfg Readiness Level (MRL)</label>
                  <span className="text-xs text-emerald font-bold">Level {mrlLevel}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={mrlLevel}
                  onChange={(e) => setMrlLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-emerald my-3"
                />
                <span className="text-[9px] text-muted-foreground">
                  MRL 1: Concept | MRL 5: Relevant prototype | MRL 10: Lean manufacturing.
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Patent & Intellectual Property Details</label>
              <textarea
                rows={2}
                placeholder="e.g. Utility patents filed at USPTO, design claims, or software code trade secrets..."
                value={patentDetails}
                onChange={(e) => setPatentDetails(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand resize-none"
              ></textarea>
            </div>

            {/* Document Upload grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {/* PDF Pitch */}
              <div className="flex flex-col items-center justify-center p-4 border border-dashed border-border rounded-2xl bg-background/50 hover:bg-muted/30 transition-colors relative">
                {files.pdf ? (
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <FileCheck2 size={24} className="text-emerald" />
                    <span className="text-[9px] font-semibold truncate max-w-[80px]">{files.pdf}</span>
                    <span className="text-[8px] bg-emerald/10 text-emerald px-1 rounded uppercase font-bold">Ready</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMockUpload("pdf", "PitchDeck.pdf")}
                    className="flex flex-col items-center text-center gap-1 cursor-pointer"
                  >
                    <UploadCloud size={24} className="text-muted-foreground" />
                    <span className="text-[9px] font-bold">Pitch Deck PDF</span>
                    {uploadProgress.pdf !== undefined && uploadProgress.pdf < 100 && (
                      <div className="w-16 h-1 bg-border rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-brand" style={{ width: `${uploadProgress.pdf}%` }}></div>
                      </div>
                    )}
                  </button>
                )}
              </div>

              {/* PPT Pitch */}
              <div className="flex flex-col items-center justify-center p-4 border border-dashed border-border rounded-2xl bg-background/50 hover:bg-muted/30 transition-colors relative">
                {files.ppt ? (
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <FileCheck2 size={24} className="text-emerald" />
                    <span className="text-[9px] font-semibold truncate max-w-[80px]">{files.ppt}</span>
                    <span className="text-[8px] bg-emerald/10 text-emerald px-1 rounded uppercase font-bold">Ready</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMockUpload("ppt", "BusinessPlan.pptx")}
                    className="flex flex-col items-center text-center gap-1 cursor-pointer"
                  >
                    <UploadCloud size={24} className="text-muted-foreground" />
                    <span className="text-[9px] font-bold">Business Plan PPT</span>
                    {uploadProgress.ppt !== undefined && uploadProgress.ppt < 100 && (
                      <div className="w-16 h-1 bg-border rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-brand" style={{ width: `${uploadProgress.ppt}%` }}></div>
                      </div>
                    )}
                  </button>
                )}
              </div>

              {/* Patents Document */}
              <div className="flex flex-col items-center justify-center p-4 border border-dashed border-border rounded-2xl bg-background/50 hover:bg-muted/30 transition-colors relative">
                {files.patent ? (
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <FileCheck2 size={24} className="text-emerald" />
                    <span className="text-[9px] font-semibold truncate max-w-[80px]">{files.patent}</span>
                    <span className="text-[8px] bg-emerald/10 text-emerald px-1 rounded uppercase font-bold">Ready</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMockUpload("patent", "PatentSearch.pdf")}
                    className="flex flex-col items-center text-center gap-1 cursor-pointer"
                  >
                    <UploadCloud size={24} className="text-muted-foreground" />
                    <span className="text-[9px] font-bold">Patent Certificate</span>
                    {uploadProgress.patent !== undefined && uploadProgress.patent < 100 && (
                      <div className="w-16 h-1 bg-border rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-brand" style={{ width: `${uploadProgress.patent}%` }}></div>
                      </div>
                    )}
                  </button>
                )}
              </div>

              {/* Product Images */}
              <div className="flex flex-col items-center justify-center p-4 border border-dashed border-border rounded-2xl bg-background/50 hover:bg-muted/30 transition-colors relative">
                {files.image ? (
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <FileCheck2 size={24} className="text-emerald" />
                    <span className="text-[9px] font-semibold truncate max-w-[80px]">{files.image}</span>
                    <span className="text-[8px] bg-emerald/10 text-emerald px-1 rounded uppercase font-bold">Ready</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleMockUpload("image", "ProductMock.jpg")}
                    className="flex flex-col items-center text-center gap-1 cursor-pointer"
                  >
                    <UploadCloud size={24} className="text-muted-foreground" />
                    <span className="text-[9px] font-bold">Product Schematic</span>
                    {uploadProgress.image !== undefined && uploadProgress.image < 100 && (
                      <div className="w-16 h-1 bg-border rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-brand" style={{ width: `${uploadProgress.image}%` }}></div>
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex justify-between items-center pt-4 border-t border-border mt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand-hover text-xs font-semibold shadow-md transition-colors"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white hover:bg-brand-hover disabled:bg-brand/50 text-xs font-bold shadow-lg glow-brand transition-all"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Evaluating Venture Vitals...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="animate-pulse" />
                  <span>Execute Analysis Report</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
