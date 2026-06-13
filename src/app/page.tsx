"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import Sidebar from "@/components/Sidebar";
import LandingPage from "@/components/LandingPage";
import DashboardOverview from "@/components/DashboardOverview";
import EvaluationForm from "@/components/EvaluationForm";
import InnovationAnalysis from "@/components/InnovationAnalysis";
import TrlMrlAssessment from "@/components/TrlMrlAssessment";
import IpAssessment from "@/components/IpAssessment";
import InvestmentReadiness from "@/components/InvestmentReadiness";
import GovSchemes from "@/components/GovSchemes";
import CompetitorAnalysis from "@/components/CompetitorAnalysis";
import AiMentor from "@/components/AiMentor";
import ReportsCenter from "@/components/ReportsCenter";
import Settings from "@/components/Settings";

export default function Page() {
  const { activeTab, setActiveTab } = useApp();

  // If activeTab is landing, show the main website homepage
  if (activeTab === "landing") {
    return <LandingPage />;
  }

  // Render sub-components dynamically based on active tab state
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "evaluation":
        return <EvaluationForm />;
      case "ai-analysis":
        return <InnovationAnalysis />;
      case "trl-mrl":
        return <TrlMrlAssessment />;
      case "ip":
        return <IpAssessment />;
      case "investment":
        return <InvestmentReadiness />;
      case "schemes":
        return <GovSchemes />;
      case "competitors":
        return <CompetitorAnalysis />;
      case "mentor":
        return <AiMentor />;
      case "reports":
        return <ReportsCenter />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground gradient-bg transition-colors duration-300">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto px-4 md:px-8 py-6 max-w-7xl mx-auto w-full md:pl-72 transition-all duration-300">
        <div className="flex-1 flex flex-col gap-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
