"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import {
  Bot,
  Send,
  User,
  Scale,
  Building,
  TrendingUp,
  Award,
  Factory
} from "lucide-react";

interface Message {
  sender: "user" | "mentor";
  text: string;
  time: string;
}

export default function AiMentor() {
  const { selectedStartup } = useApp();

  const mentors = [
    { id: "vcInvestor", name: "David Vance", title: "Venture Capital Lead", icon: TrendingUp, color: "text-brand border-brand/20 bg-brand/5" },
    { id: "patentExaminer", name: "Dr. Clara Croft", title: "IP & Patent Examiner", icon: Scale, color: "text-purple-500 border-purple-500/20 bg-purple-500/5" },
    { id: "startupIndiaEvaluator", name: "Rajesh Sharma", title: "Govt Schemes Expert", icon: Building, color: "text-emerald border-emerald/20 bg-emerald/5" },
    { id: "commercializationExpert", name: "Prof. Alan Turing", title: "TRL & Scale Advisor", icon: Factory, color: "text-amber-500 border-amber-500/20 bg-amber-500/5" },
    { id: "incubatorMentor", name: "Sunita Reddy", title: "Incubator Director", icon: Award, color: "text-cyan-500 border-cyan-500/20 bg-cyan-500/5" },
    { id: "marketAnalyst", name: "Chloe Mercer", title: "Market Research Lead", icon: Bot, color: "text-rose border-rose/20 bg-rose/5" }
  ];

  const [selectedMentorId, setSelectedMentorId] = useState<string>("vcInvestor");
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMentor = mentors.find(m => m.id === selectedMentorId) || mentors[0];

  // Initialize welcome messages for each mentor
  useEffect(() => {
    if (!selectedStartup) return;
    
    const welcomes: { [key: string]: Message[] } = {};
    mentors.forEach((m) => {
      let welcomeText = "";
      switch (m.id) {
        case "vcInvestor":
          welcomeText = `Hello, I'm David. I've reviewed your ${selectedStartup.fundingStage} profile for ${selectedStartup.name}. With an investor readiness score of ${selectedStartup.investorReadinessScore}/100, we need to talk about capital runways, GTM channels, or financial modeling. What can I clarify for you?`;
          break;
        case "patentExaminer":
          welcomeText = `Welcome, I am Clara. I analyzed your patent portfolio for ${selectedStartup.name}. Your IP Moat is at ${selectedStartup.ipStrengthScore}/100. Let's discuss patent claims defense, novelty risks, or PCT international filings.`;
          break;
        case "startupIndiaEvaluator":
          welcomeText = `Namaste, I am Rajesh. Regarding government subsidies under Startup India, I am evaluating eligibility criteria for ${selectedStartup.name}. We have matched you with ${selectedStartup.governmentSchemes.length} schemes. Ask me about how to apply or documentation requirements.`;
          break;
        case "commercializationExpert":
          welcomeText = `Greetings, I am Prof. Alan. I audited your technology path. Your startup sits at TRL Level ${selectedStartup.trlDetails.level} and MRL Level ${selectedStartup.mrlDetails.level}. What questions do you have regarding validation tests, manufacturing protocols, or scaling milestones?`;
          break;
        case "incubatorMentor":
          welcomeText = `Hi there! I am Sunita. I'm looking at operational structure, co-founder dynamics, and strategic bottlenecks for ${selectedStartup.name}. I suggest reviewing our mentor recommendations in the workspace. Let me know what operational advice you need.`;
          break;
        case "marketAnalyst":
          welcomeText = `Hello, I'm Chloe. I surveyed your target market sizing and competitor positioning. Your TAM is evaluated at $${(selectedStartup.marketSize.tam / 1000).toFixed(1)}B. Ask me about competitor moats or how to optimize your market capture.`;
          break;
      }

      welcomes[m.id] = [
        {
          sender: "mentor",
          text: welcomeText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
    });

    setMessages(welcomes);
  }, [selectedStartup]);

  // Scroll to bottom helper
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages with user input
    setMessages((prev) => ({
      ...prev,
      [selectedMentorId]: [...(prev[selectedMentorId] || []), userMessage]
    }));

    const query = inputText.toLowerCase();
    setInputText("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let responseText = "";

      // Smart Heuristics parser based on query keywords
      if (selectedMentorId === "vcInvestor") {
        if (query.includes("runway") || query.includes("burn") || query.includes("cash")) {
          responseText = `With your current configuration, your estimated runway is ${selectedStartup.runwayMonths} months. To appeal to lead Series A VCs, I recommend extending this to 18-24 months by closing pre-committed seed notes or optimizing engineering capital expenditures.`;
        } else if (query.includes("ready") || query.includes("score") || query.includes("valuation")) {
          responseText = `Your Investor Readiness Score is ${selectedStartup.investorReadinessScore}/100. We marked you down slightly because of ${selectedStartup.swot.weaknesses[0]}. VCs seek a locked data room, clear cap tables, and a finalized financial forecast model.`;
        } else {
          responseText = `Excellent query. For ${selectedStartup.name}, VCs are prioritizing the GTM scalability metrics. I recommend checking the investment checklist under the 'Investment Readiness' tab to ensure all core assets are prepared.`;
        }
      } else if (selectedMentorId === "patentExaminer") {
        if (query.includes("patent") || query.includes("filed") || query.includes("grant")) {
          responseText = `Your key patent claims are covering '${selectedStartup.ipDetails.keyPatentTitle}'. The novelty score is evaluated at ${selectedStartup.ipDetails.noveltyScore}/100. I advise completing PCT international entries within 12 months to secure global defense.`;
        } else if (query.includes("infringe") || query.includes("risk") || query.includes("operate")) {
          responseText = `Freedom to Operate status is rated as '${selectedStartup.ipDetails.freedomToOperateStatus.replace("_", " ")}'. The examiner panel has verified that your specific crossing methods are clear of known patents from competitors like ${selectedStartup.competitors[0]?.name || "legacy players"}.`;
        } else {
          responseText = `For IP defense, ensure all core engineering assets and software repositories are protected under formal developer IP assignment agreements. This is the first thing patent auditors check during VC diligence.`;
        }
      } else if (selectedMentorId === "startupIndiaEvaluator") {
        if (query.includes("grants") || query.includes("scheme") || query.includes("money")) {
          responseText = `Based on your sector, the '${selectedStartup.governmentSchemes[0]?.name || "SISFS"}' scheme offers up to ${selectedStartup.governmentSchemes[0]?.grantAmount}. Your match percentage is ${selectedStartup.governmentSchemes[0]?.matchPercentage}%. I suggest applying immediately via the DPIIT portal.`;
        } else {
          responseText = `To lock in Startup India benefits, verify that your DPIIT registration details are complete and that your certificate matches the company's legal name. Let me know if you need guidelines on MSME registration.`;
        }
      } else if (selectedMentorId === "commercializationExpert") {
        if (query.includes("trl") || query.includes("ready") || query.includes("prototype")) {
          responseText = `You are currently at TRL Level ${selectedStartup.trlDetails.level} (${selectedStartup.trlDetails.title}). To hit TRL ${selectedStartup.trlDetails.level + 1}, you must finalize '${selectedStartup.trlDetails.checklist.find(c => !c.done)?.item || "field validation tests"}'.`;
        } else if (query.includes("mrl") || query.includes("factory") || query.includes("manufacturing")) {
          responseText = `Your manufacturing index sits at MRL Level ${selectedStartup.mrlDetails.level}. The largest supply chain risk is marked as: '${selectedStartup.mrlDetails.supplyChainRisk || "inconsistent raw feed yields"}'. Focus on localizing alternate suppliers.`;
        } else {
          responseText = `Technology commercialization is a stepwise pipeline. Refer to the Q-milestones roadmap under the 'Dashboard' view to track quarterly goals and align your engineering teams.`;
        }
      } else if (selectedMentorId === "incubatorMentor") {
        if (query.includes("team") || query.includes("hire") || query.includes("founder")) {
          responseText = `The panel has highlighted a business leadership deficit. I suggest recruiting a Chief Business Officer (CBO) or senior sales director with 10+ years of grid or medical systems experience to handle enterprise negotiations.`;
        } else {
          responseText = `Remember, operations scaling requires a balance between technical R&D and business development. I suggest allocating at least 30% of your seed budget to GTM tests and customer feedback acquisition loops.`;
        }
      } else {
        // Market research analyst fallback
        if (query.includes("tam") || query.includes("market") || query.includes("som")) {
          responseText = `Your TAM is $${(selectedStartup.marketSize.tam / 1000).toFixed(1)}B, while your SOM represents $${selectedStartup.marketSize.som}M. This represents a highly viable initial market capture opportunity, assuming a YoY growth rate of ${selectedStartup.marketSize.growthRate}%.`;
        } else if (query.includes("competitor") || query.includes("rival") || query.includes("grail")) {
          responseText = `Your direct competitor is ${selectedStartup.competitors[0]?.name || "Legacy players"}. Their key advantage is '${selectedStartup.competitors[0]?.advantages || "distribution networks"}', but they suffer from '${selectedStartup.competitors[0]?.disadvantages}'. Focus on leveraging your unique HTS/AI technologies.`;
        } else {
          responseText = `To optimize your market positioning, refer to the positioning quadrant in the 'Competitor Analysis' workspace and identify unaddressed user demographics in tier-2 zones.`;
        }
      }

      const mentorMessage: Message = {
        sender: "mentor",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => ({
        ...prev,
        [selectedMentorId]: [...(prev[selectedMentorId] || []), mentorMessage]
      }));

      setIsTyping(false);
    }, 1200);
  };

  const activeMessages = messages[selectedMentorId] || [];

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full pt-16 md:pt-0 h-[calc(100vh-120px)] min-h-[500px]">
      {/* Left Column: Mentors Selection Grid */}
      <div className="w-full md:w-80 flex flex-col gap-4 border-r border-border md:pr-6 overflow-y-auto">
        <div>
          <h2 className="text-lg font-black tracking-tight bg-gradient-to-r from-brand to-emerald bg-clip-text text-transparent">
            AI Advisory Panel
          </h2>
          <span className="text-[10px] text-muted-foreground">Select a panel expert mentor to chat with</span>
        </div>

        <div className="flex flex-col gap-2.5 mt-2">
          {mentors.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMentorId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMentorId(m.id)}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                  isSelected
                    ? "border-brand bg-brand/5 shadow-sm scale-102"
                    : "border-border hover:bg-muted bg-card/20"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.color}`}>
                  <Icon size={16} />
                </div>
                <div className="truncate">
                  <h4 className={`text-xs font-semibold ${isSelected ? "text-brand" : "text-foreground"}`}>
                    {m.name}
                  </h4>
                  <p className="text-[9px] text-muted-foreground truncate">{m.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Chat Box */}
      <div className="flex-1 flex flex-col border border-border bg-card/30 backdrop-blur-sm rounded-2xl overflow-hidden glass-panel h-full">
        {/* Chat Header */}
        <div className="px-5 py-4 border-b border-border bg-card/50 flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeMentor.color}`}>
            {React.createElement(activeMentor.icon, { size: 16 })}
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">{activeMentor.name}</h4>
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
              {activeMentor.title} • Online
            </span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {activeMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[80%] ${
                msg.sender === "user" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-brand text-white rounded-tr-none shadow-md"
                    : "bg-muted text-foreground rounded-tl-none border border-border/80"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[8px] text-muted-foreground mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="self-start flex flex-col items-start max-w-[80%]">
              <div className="p-3 rounded-2xl bg-muted text-muted-foreground rounded-tl-none border border-border flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card/50 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask ${activeMentor.name.split(" ")[0]} about ${selectedStartup?.name}...`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:border-brand"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-brand text-white hover:bg-brand-hover shadow-md transition-colors"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
