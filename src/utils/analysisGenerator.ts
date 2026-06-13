import { StartupData } from "../data/sampleStartups";

export function generateStartupAnalysis(form: {
  name: string;
  productName: string;
  industry: string;
  problem: string;
  solution: string;
  businessModel: string;
  targetMarket: string;
  revenueModel: string;
  team: string;
  fundingStage: string;
  trlLevel: number;
  mrlLevel: number;
  patentDetails: string;
}): StartupData {
  const name = form.name || "My Startup";
  const productName = form.productName || "Product X";
  const industry = form.industry || "Software / Tech";
  const trl = Number(form.trlLevel) || 1;
  const mrl = Number(form.mrlLevel) || 1;
  const fundingStage = form.fundingStage || "Bootstrap";

  // Deterministic calculation of scores based on TRL, MRL, and input properties
  const industryLower = industry.toLowerCase();
  const isDeeptech = industryLower.includes("deep") || industryLower.includes("energy") || industryLower.includes("material") || industryLower.includes("hardware");
  const isHealth = industryLower.includes("health") || industryLower.includes("bio") || industryLower.includes("med");
  const hasPatents = form.patentDetails.length > 15 || form.patentDetails.toLowerCase().includes("patent");

  // Scores calculations
  const innovationScore = Math.min(98, Math.max(50, 
    60 + (isDeeptech ? 20 : 5) + (hasPatents ? 15 : 0) + (form.solution.length > 100 ? 5 : 0) - (trl < 3 ? 10 : 0)
  ));
  
  const ipStrengthScore = Math.min(98, Math.max(30, 
    40 + (hasPatents ? 40 : 10) + (isDeeptech ? 10 : 0) + (form.patentDetails.toLowerCase().includes("grant") ? 10 : 0)
  ));

  const commercializationScore = Math.min(98, Math.max(40, 
    45 + trl * 4 + mrl * 2 + (fundingStage.includes("Series") ? 10 : 0) - (isDeeptech ? 10 : 0)
  ));

  const marketPotentialScore = Math.min(98, Math.max(55, 
    65 + (form.targetMarket.length > 80 ? 15 : 5) + (isHealth ? 10 : 5) - (isDeeptech ? 5 : 0)
  ));

  const investorReadinessScore = Math.min(98, Math.max(35, 
    30 + trl * 3 + (fundingStage !== "Bootstrap" ? 15 : 5) + (form.revenueModel.length > 50 ? 10 : 0) + (ipStrengthScore > 75 ? 10 : 0)
  ));

  const healthScore = Math.round(
    (innovationScore * 0.2) + 
    (ipStrengthScore * 0.15) + 
    (commercializationScore * 0.2) + 
    (marketPotentialScore * 0.25) + 
    (investorReadinessScore * 0.2)
  );

  // Generate reasonable TAM / SAM / SOM (in Millions USD) based on industry type
  let tam = 5000;
  if (isDeeptech) tam = 45000;
  else if (isHealth) tam = 12000;
  else if (industryLower.includes("saas") || industryLower.includes("software")) tam = 8000;

  const sam = Math.round(tam * 0.25);
  const som = Math.round(sam * 0.1);
  const growthRate = isDeeptech ? 16.5 : isHealth ? 19.8 : 12.4;

  // Generate SWOT
  const strengths = [
    `Novel solution addressing key limitations in the ${industry} space.`,
    `Direct target alignment with ${form.targetMarket.substring(0, 40)}...`,
    `Founder expertise focused on solving the core problem.`
  ];
  if (hasPatents) strengths.push(`Proprietary intellectual property with patent applications filed/granted.`);
  else strengths.push(`First-mover advantage in localized application markets.`);

  const weaknesses = [
    `Early stage of development (TRL ${trl}) requiring validation.`,
    `Limited runway typical of ${fundingStage} phase startups.`,
    `High dependency on customer trial conversions to validate GTM.`
  ];

  const opportunities = [
    `Growing national demand and regulatory push for innovative ${industry} projects.`,
    `B2B integration potential with larger strategic enterprise partners.`,
    `DPIIT single-use or high-value grants targeting technology level ${trl}+.`
  ];

  const threats = [
    `Rapid entry of cloud-native or foreign competitors with deeper capital reserves.`,
    `Potential shifts in compliance standards in the ${industry} sector.`,
    `Supply chain bottlenecks affecting implementation scaling.`
  ];

  // Competitors matching
  const competitors = [
    {
      name: "Legacy Competitor Inc.",
      marketShare: 45,
      funding: "$150M",
      trl: 9,
      features: { "Feature A": "Yes", "Feature B": "No", "Feature C": "Legacy Only" },
      advantages: "Established global distribution networks, massive sales force.",
      disadvantages: "High pricing, legacy codebase, lack of specialized features."
    },
    {
      name: "Venture-Backed Challenger",
      marketShare: 15,
      funding: "$12M",
      trl: 7,
      features: { "Feature A": "Yes", "Feature B": "Yes", "Feature C": "Partial" },
      advantages: "Fast software iterations, pricing flexibility.",
      disadvantages: "Weak IP moat, small customer success team."
    }
  ];

  // TRL Checklist
  const trlTitles = [
    "",
    "Basic Principles Observed",
    "Technology Concept Formulated",
    "Analytical & Experimental Critical Function Proof of Concept",
    "Component/Validation in Laboratory Environment",
    "Component/Validation in Relevant Environment",
    "System Prototype Demonstration in Relevant Environment",
    "System Prototype Demonstration in Operational Environment",
    "Actual System Completed and Qualified",
    "Actual System Proven through Successful Mission Operations"
  ];
  const trlTitle = trlTitles[trl] || "Prototype Development";

  const trlChecklist = [
    { item: "Concept feasibility study conducted", done: trl >= 2 },
    { item: "Laboratory proof-of-concept testing completed", done: trl >= 3 },
    { item: "Component validation in simulated environment", done: trl >= 5 },
    { item: "System prototype integration completed", done: trl >= 6 },
    { item: "Field testing in customer operational environment", done: trl >= 7 },
    { item: "Full regulatory validation and safety approvals", done: trl >= 8 }
  ];

  // MRL Checklist
  const mrlTitles = [
    "",
    "Manufacturing Feasibility Identified",
    "Manufacturing Concept Formulated",
    "Manufacturing Processes Proved in Laboratory",
    "Laboratory Manufacturing Capability Demonstrated",
    "Manufacturing Capability Demonstrated in Relevant Environment",
    "Pilot Line Manufacturing Capability Demonstrated",
    "Production Processes Validated in Operational Environment",
    "Low Rate Initial Production Validated",
    "Full Rate Production Demonstrated",
    "Lean Production Methods Proven"
  ];
  const mrlTitle = mrlTitles[mrl] || "Production Scaling";

  const mrlChecklist = [
    { item: "Manufacturing risks identified", done: mrl >= 2 },
    { item: "Materials supply sources identified", done: mrl >= 3 },
    { item: "Labor and space requirements documented", done: mrl >= 4 },
    { item: "BOM (Bill of Materials) cost models completed", done: mrl >= 5 },
    { item: "Quality control criteria and parameters locked", done: mrl >= 7 },
    { item: "Production tooling and scaling validated", done: mrl >= 8 }
  ];

  // Investment Checklist
  const investmentReadiness = {
    financialModelComplete: trl >= 4,
    capTableClean: fundingStage !== "Bootstrap",
    pitchDeckReady: true,
    dataRoomComplete: trl >= 6,
    valuableCoreIp: ipStrengthScore > 70,
    recurringRevenue: form.revenueModel.toLowerCase().includes("saas") || form.revenueModel.toLowerCase().includes("sub"),
    clearGtm: form.businessModel.length > 50,
    regulatoryClarity: trl >= 5,
    advisorCommitment: true,
    matchingVcs: isDeeptech 
      ? ["Speciale Invest", "Anicut Capital", "Blume Ventures", "Chiratae Ventures"]
      : ["Sequoia Capital India", "Accel India", "Elevation Capital", "Matrix Partners India"]
  };

  // Government schemes recommendations
  const governmentSchemes = [
    {
      name: "Startup India Seed Fund Scheme (SISFS)",
      agency: "DPIIT, Ministry of Commerce and Industry",
      grantAmount: "Up to ₹50 Lakhs ($60,000 USD)",
      eligibility: "DPIIT-registered startups within 2 years of incorporation working on innovative ideas.",
      matchPercentage: trl >= 3 ? 95 : 70,
      reasons: ["DPIIT registration support.", "High innovation score fits criteria.", "Suits early seed/proof-of-concept stages."]
    }
  ];

  if (isDeeptech || hasPatents) {
    governmentSchemes.push({
      name: "Deep Tech & Defence Innovation Scheme (IDEX)",
      agency: "Ministry of Defence / DST",
      grantAmount: "Up to ₹1.5 Crore ($180,000 USD)",
      eligibility: "Startups developing products for national security, aerospace, or advanced energy physics.",
      matchPercentage: 90,
      reasons: ["Strategic technology categorization.", "Patented/Proprietary structure identified.", "High R&D ratio."]
    });
  } else {
    governmentSchemes.push({
      name: "MSME Business Incubator Grant",
      agency: "Ministry of Micro, Small and Medium Enterprises",
      grantAmount: "Up to ₹15 Lakhs ($18,000 USD)",
      eligibility: "MSME-registered startups showing viable commercial potential using standard business frameworks.",
      matchPercentage: 85,
      reasons: ["Low capital expenditure fit.", "Excellent commercial scalability.", "Suits localized product distribution."]
    });
  }

  // Panel Reviews
  const panelReviews = {
    vcInvestor: `The business model shows a reasonable structure with ${form.revenueModel.substring(0, 30)}. At TRL ${trl}, this represents a ${fundingStage} investment profile. Risk index is moderate. We would like to see a fully finalized GTM strategy and pilot conversion logs before leading a seed round.`,
    
    startupIndiaEvaluator: `Fits comfortably under DPIIT requirements. High potential for matching Seed Fund Schemes. Technical benchmarks at TRL ${trl} are well-documented. Recommend formalizing MSME registrations and seeking regional incubator linkages.`,
    
    patentExaminer: hasPatents 
      ? `The patent details provided (${form.patentDetails.substring(0, 40)}...) indicate active novelty claims. The filing coverage represents a good regional barrier. Recommend completing a thorough PCT international filing to block US/EU copycats.`
      : `No clear patent claims identified. The technology relies on trade secrets and software execution speed. High risk of copycats; recommend immediately seeking design registrations or trademark locks.`,
    
    commercializationExpert: `Commercialization potential is currently marked at ${commercializationScore}/100. Product-market fit looks promising. Recommending using existing infrastructure converters rather than building proprietary fabrication lines to keep CAPEX low.`,
    
    incubatorMentor: `Solid founding hypothesis. The team structure seems technically capable. Recommended addition of a dedicated Sales/Marketing Lead to expedite B2B client acquisition cycles which are currently long.`,
    
    marketAnalyst: `TAM/SAM metrics indicate a strong baseline market. Target segment of ${form.targetMarket.substring(0, 30)} represents high initial contract value. Competing legacy players are slow to innovate, creating a viable gap.`
  };

  // Q-Quarters roadmap
  const roadmap = [
    { quarter: "Q3 2026", milestone: "Complete validation audit", targetTrl: Math.min(9, trl + 1), description: "Establish structured feedback loops with early alpha users to refine UI/UX or core product outputs.", status: "in_progress" as const },
    { quarter: "Q4 2026", milestone: "Initiate pilot trials", targetTrl: Math.min(9, trl + 1), description: "Deploy localized test units under beta agreements in 3 target customer environments.", status: "upcoming" as const },
    { quarter: "Q1 2027", milestone: "Raise bridge capital", targetTrl: Math.min(9, trl + 1), description: "Open a convertible note or pre-Series A round targeting strategic angel investors.", status: "upcoming" as const },
    { quarter: "Q2 2027", milestone: "Scale commercial production", targetTrl: Math.min(9, trl + 2), description: "Automate delivery systems or scale outsourcing manufacturing to double quarterly capacity.", status: "upcoming" as const }
  ];

  return {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    name,
    productName,
    tagline: `Innovative solutions in the ${industry} space`,
    industry,
    problem: form.problem,
    solution: form.solution,
    businessModel: form.businessModel,
    targetMarket: form.targetMarket,
    revenueModel: form.revenueModel,
    team: form.team,
    fundingStage,
    raisedAmount: fundingStage === "Bootstrap" ? "$0" : "$250K",
    runwayMonths: 12,
    healthScore,
    innovationScore,
    marketPotentialScore,
    investorReadinessScore,
    ipStrengthScore,
    commercializationScore,
    panelReviews,
    marketSize: {
      tam,
      sam,
      som,
      growthRate,
      explanation: `Calculated values based on standard ${industry} sizing and user-provided target market definitions.`
    },
    swot: {
      strengths,
      weaknesses,
      opportunities,
      threats
    },
    competitors,
    competitorFeaturesList: ["Feature A", "Feature B", "Feature C"],
    trlDetails: {
      level: trl,
      title: trlTitle,
      status: "active",
      description: `The technology has attained Level ${trl}. Core functions have been established, and prototype integrations are underway.`,
      checklist: trlChecklist,
      evidence: `Verification checklist calibrated based on user declaration of TRL ${trl}.`
    },
    mrlDetails: {
      level: mrl,
      title: mrlTitle,
      status: "active",
      description: `Manufacturing operations are set to Level ${mrl}. Initial feasibility is completed, and process models are being formulated.`,
      checklist: mrlChecklist,
      supplyChainRisk: isDeeptech ? "High risk on critical component imports." : "Low risk; cloud-hosted architecture."
    },
    ipDetails: {
      patentsFiled: hasPatents ? 2 : 0,
      patentsGranted: form.patentDetails.toLowerCase().includes("grant") ? 1 : 0,
      patentStrength: ipStrengthScore,
      noveltyScore: innovationScore - 5,
      claimsFilingCountry: "India / International",
      keyPatentTitle: hasPatents ? "Proprietary System & Methods for Product Execution" : "None Filed",
      freedomToOperateStatus: hasPatents ? "low_risk" : "clear",
      detailsText: form.patentDetails || "No patent details provided by the founder."
    },
    investmentReadiness,
    governmentSchemes,
    roadmap,
    risks: {
      technical: isDeeptech ? 75 : 40,
      financial: fundingStage === "Bootstrap" ? 70 : 50,
      market: 55,
      regulatory: isHealth ? 80 : 35,
      description: `Risks reflect TRL ${trl} and ${industry} industry benchmarks.`
    }
  };
}
