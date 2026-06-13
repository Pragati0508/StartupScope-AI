export interface StartupData {
  id: string;
  name: string;
  productName: string;
  tagline: string;
  industry: string;
  problem: string;
  solution: string;
  businessModel: string;
  targetMarket: string;
  revenueModel: string;
  team: string;
  fundingStage: string;
  raisedAmount: string;
  runwayMonths: number;
  
  // Scores
  healthScore: number;
  innovationScore: number;
  marketPotentialScore: number;
  investorReadinessScore: number;
  ipStrengthScore: number;
  commercializationScore: number;

  // Expert panel comments
  panelReviews: {
    vcInvestor: string;
    startupIndiaEvaluator: string;
    patentExaminer: string;
    commercializationExpert: string;
    incubatorMentor: string;
    marketAnalyst: string;
  };

  // TAM/SAM/SOM
  marketSize: {
    tam: number; // in Millions USD
    sam: number;
    som: number;
    growthRate: number; // percentage
    explanation: string;
  };

  // SWOT
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };

  // Competitor analysis
  competitors: {
    name: string;
    marketShare: number; // percentage
    funding: string;
    trl: number;
    features: { [key: string]: boolean | string };
    advantages: string;
    disadvantages: string;
  }[];
  competitorFeaturesList: string[];

  // TRL (1-9)
  trlDetails: {
    level: number;
    title: string;
    status: "completed" | "active" | "pending";
    description: string;
    checklist: { item: string; done: boolean }[];
    evidence: string;
  };

  // MRL (1-10)
  mrlDetails: {
    level: number;
    title: string;
    status: "completed" | "active" | "pending";
    description: string;
    checklist: { item: string; done: boolean }[];
    supplyChainRisk: string;
  };

  // IP Assessment
  ipDetails: {
    patentsFiled: number;
    patentsGranted: number;
    patentStrength: number; // 0-100
    noveltyScore: number; // 0-100
    claimsFilingCountry: string;
    keyPatentTitle: string;
    freedomToOperateStatus: "clear" | "low_risk" | "high_risk";
    detailsText: string;
  };

  // Investment Readiness Checklist
  investmentReadiness: {
    financialModelComplete: boolean;
    capTableClean: boolean;
    pitchDeckReady: boolean;
    dataRoomComplete: boolean;
    valuableCoreIp: boolean;
    recurringRevenue: boolean;
    clearGtm: boolean;
    regulatoryClarity: boolean;
    advisorCommitment: boolean;
    matchingVcs: string[];
  };

  // Government Schemes Recommendations
  governmentSchemes: {
    name: string;
    agency: string;
    grantAmount: string;
    eligibility: string;
    matchPercentage: number;
    reasons: string[];
  }[];

  // Commercialization Roadmap
  roadmap: {
    quarter: string;
    milestone: string;
    targetTrl: number;
    description: string;
    status: "completed" | "in_progress" | "upcoming";
  }[];

  // Risks (0-100)
  risks: {
    technical: number;
    financial: number;
    market: number;
    regulatory: number;
    description: string;
  };
}

export const sampleStartups: StartupData[] = [
  {
    id: "aetherfusion",
    name: "AetherFusion Energy",
    productName: "FusionCore Sub-10",
    tagline: "Compact Aneutronic Fusion Reactors for Industrial Grid-Free Power",
    industry: "DeepTech / Clean Energy",
    problem: "Global clean energy requires stable baseload power, but existing nuclear reactors produce high-level toxic waste, wind/solar are intermittent, and battery storage is expensive and mineral-constrained.",
    solution: "AetherFusion builds a truck-sized 10MW helium-3/deuterium aneutronic fusion reactor using advanced high-temperature superconducting (HTS) magnets in a modified field-reversed configuration, emitting zero long-lived radioactive waste.",
    businessModel: "B2B Hardware-as-a-Service (HaaS). Build and lease modular reactors to remote data centers, mining sites, and heavy industrial plants. Charge on a per-MWh power purchase agreement (PPA).",
    targetMarket: "Remote industrial microgrids, hyper-scale data centers, off-grid military bases, and deep-sea mineral processing facilities.",
    revenueModel: "Long-term Power Purchase Agreements ($45/MWh) + remote monitoring and annual magnetic coil servicing contracts.",
    team: "Led by Dr. Marcus Thorne (former Principal Plasma Physicist at Princeton Plasma Physics Lab) and Elena Rostova (former Chief Operations Officer at Rosatom Modular Systems). Team of 12 PhDs in plasma engineering, HTS superconductors, and cryogenic coolant systems.",
    fundingStage: "Series A (Pre-revenue)",
    raisedAmount: "$14.5M",
    runwayMonths: 18,
    
    healthScore: 78,
    innovationScore: 98,
    marketPotentialScore: 89,
    investorReadinessScore: 72,
    ipStrengthScore: 92,
    commercializationScore: 56,

    panelReviews: {
      vcInvestor: "Extremely high capital expenditure profile with a 6-8 year liquidity horizon. If it works, it is a $100B+ company. High valuation markup potential, but needs matching non-dilutive government grants to survive Series B/C stages.",
      startupIndiaEvaluator: "Fits perfectly under the Startup India DeepTech Initiative. Eligible for Special Grants and incubation support through IIT Madras Research Park. Highlighted as a strategic national asset.",
      patentExaminer: "Outstanding IP portfolio. Three core patents granted covering the HTS magnetic coil geometric configuration and magnetic field feedback controller. Novelty is unquestioned; low risk of infringement.",
      commercializationExpert: "Commercialization path is the bottleneck. High-density Helium-3 sourcing is restricted and expensive. Grid integration regulatory compliance takes 3-4 years in most developed markets.",
      incubatorMentor: "Excellent research team, but lacks core business representation. Recommended hiring an experienced Power Grid Industry veteran to navigate utility-scale commercial negotiations.",
      marketAnalyst: "TAM is virtually limitless as global grids seek clean baseload power, but early SOM must be limited to off-grid industrial microgrids in jurisdictions with expedited regulatory loops (e.g., Canada, UAE)."
    },

    marketSize: {
      tam: 420000, // $420 Billion
      sam: 85000,  // $85 Billion
      som: 3200,   // $3.2 Billion
      growthRate: 14.8,
      explanation: "TAM accounts for the global industrial off-grid electricity market. SAM represents high-growth industrial microgrids and remote data centers, while SOM targets off-grid industrial mines and isolated deep-sea centers in Canada and Australia over the next 5 years."
    },

    swot: {
      strengths: [
        "Unrivaled technology advantage in field-reversed confinement geometry.",
        "Zero long-lived nuclear waste generation (aneutronic helium-3 reaction).",
        "HTS magnet technology allows a reactor footprint 20x smaller than ITER."
      ],
      weaknesses: [
        "High capital requirements before hitting commercial TRL 8.",
        "Helium-3 feedstock supply chain is currently narrow and expensive.",
        "Plasma stabilization control requires real-time sub-millisecond AI adjustments."
      ],
      opportunities: [
        "Fast-track regulatory framework for compact reactors in North America.",
        "Explosion of AI data centers requiring dedicated grid-free mega-watts.",
        "Bilateral sovereign funding pools targeting zero-carbon energy transition."
      ],
      shadows: [],
      threats: [
        "Sudden breakthroughs in competing laser-inertial confinement fusion.",
        "Sourcing embargoes on high-temperature superconducting (HTS) tape materials.",
        "Overly cautious civil nuclear regulations classifying aneutronic fusion with traditional fission."
      ]
    } as any,

    competitors: [
      {
        name: "Helion Energy",
        marketShare: 15,
        funding: "$570M",
        trl: 6,
        features: { "Compact Footprint": "Yes", "Aneutronic": "Yes (D-He3)", "HTS Magnets": "No", "PPA Signed": "Yes (Microsoft)" },
        advantages: "Significant funding cushion, backing from Sam Altman, and an active PPA with Microsoft.",
        disadvantages: "Relies on pulsed magnetic compression which creates higher mechanical fatigue compared to AetherFusion's steady-state field."
      },
      {
        name: "Commonwealth Fusion Systems",
        marketShare: 20,
        funding: "$2.0B",
        trl: 5,
        features: { "Compact Footprint": "No (Medium)", "Aneutronic": "No (D-T)", "HTS Magnets": "Yes", "PPA Signed": "No" },
        advantages: "World-class HTS magnets developed in collaboration with MIT; high energy gain path.",
        disadvantages: "Uses Deuterium-Tritium reaction which produces high-energy neutrons, requiring massive concrete shielding and radioactive waste management."
      },
      {
        name: "TAE Technologies",
        marketShare: 12,
        funding: "$1.2B",
        trl: 5,
        features: { "Compact Footprint": "No", "Aneutronic": "Yes (p-B11)", "HTS Magnets": "Yes", "PPA Signed": "No" },
        advantages: "Long operating history, proprietary advanced beam-driven FRC plasma physics.",
        disadvantages: "Requires extreme core temperatures (over 1 billion °C) for proton-boron fusion, delaying commercial feasibility."
      }
    ],
    competitorFeaturesList: ["Compact Footprint", "Aneutronic", "HTS Magnets", "PPA Signed"],

    trlDetails: {
      level: 6,
      title: "System/Subsystem Prototype Demonstration",
      status: "active",
      description: "AetherFusion has demonstrated plasma containment and stable heating at fusion conditions for 10 seconds in a laboratory prototype environment (FusionCore-Prototype 2) under simulated load.",
      checklist: [
        { item: "System prototype validated in laboratory environment", done: true },
        { item: "Superconducting magnet feedback controller calibrated", done: true },
        { item: "Helium-3 injector fuel feed consistency validated", done: true },
        { item: "Thermal output energy extraction conversion tested", done: false },
        { item: "100-hour continuous containment stability audit", done: false }
      ],
      evidence: "Test report TF-092-B: Plasma core stability validated at 80 million °C for 10.2 seconds under 1.2 Tesla magnetic confinement. Coils remained superconducting at 20 Kelvin."
    },

    mrlDetails: {
      level: 4,
      title: "Laboratory manufacturing processes validated",
      status: "active",
      description: "HTS coil winding and cryo-jacket integration have been completed in a precision laboratory shop. High-volume component sourcing and precision assembly tolerances are not yet standardized.",
      checklist: [
        { item: "HTS winding machinery tolerances documented", done: true },
        { item: "Cryogenic plumbing safety standards established", done: true },
        { item: "BOM (Bill of Materials) identified for critical components", done: true },
        { item: "Industrial manufacturing line layout planned", done: false },
        { item: "Quality control criteria for commercial HTS tape finalized", done: false }
      ],
      supplyChainRisk: "High risk. Currently dependent on a single supplier in Japan for high-temperature superconducting (HTS) tape. Sudden tape defects or export restrictions will freeze prototype assembly."
    },

    ipDetails: {
      patentsFiled: 8,
      patentsGranted: 3,
      patentStrength: 92,
      noveltyScore: 95,
      claimsFilingCountry: "United States (USPTO), PCT International",
      keyPatentTitle: "Active Magnetic Confinement Feedback Control in Field-Reversed Superconducting Tokamaks (US-119283-B2)",
      freedomToOperateStatus: "clear",
      detailsText: "Comprehensive freedom-to-operate search completed in Q1 2026. The unique field-reversed arrangement combined with high-temperature superconducting coil geometries avoids all major claims held by TAE and Commonwealth Fusion Systems."
    },

    investmentReadiness: {
      financialModelComplete: true,
      capTableClean: true,
      pitchDeckReady: true,
      dataRoomComplete: false,
      valuableCoreIp: true,
      recurringRevenue: false,
      clearGtm: true,
      regulatoryClarity: false,
      advisorCommitment: true,
      matchingVcs: ["Breakthrough Energy Ventures", "Chevron Technology Ventures", "Khosla Ventures", "DCVC (Data Collective)"]
    },

    governmentSchemes: [
      {
        name: "Deep Tech Startup India Fund",
        agency: "Department of Science & Technology (DST)",
        grantAmount: "₹2.5 Crore ($300K USD)",
        eligibility: "DPIIT-registered startups working on disruptive deep technologies with national strategic significance.",
        matchPercentage: 95,
        reasons: ["Fits strategic defense/energy criteria.", "High TRL academic-backbone startup.", "Registered DPIIT entity."]
      },
      {
        name: "Advanced Energy Projects Grant (ARPA-E)",
        agency: "US Department of Energy",
        grantAmount: "$3.5 Million USD",
        eligibility: "High-risk, high-reward clean energy technologies showing prototype capability.",
        matchPercentage: 88,
        reasons: ["US entity subsidiary established.", "Focus on grid-free nuclear innovation.", "Prototype is ready for scaling."]
      }
    ],

    roadmap: [
      { quarter: "Q3 2026", milestone: "100-Hour Plasma Containment Demonstration", targetTrl: 6, description: "Achieve continuous stable confinement of deuterium plasma at lower density for 100 hours to evaluate wall material stress.", status: "in_progress" },
      { quarter: "Q4 2026", milestone: "Helium-3 Reactor Chamber Integration", targetTrl: 6, description: "Integrate specialized high-pressure helium-3 injectors and evaluate fuel-plasma mixing efficiency.", status: "upcoming" },
      { quarter: "Q2 2027", milestone: "10MW Grid-Coupled Simulation Engine", targetTrl: 7, description: "Assemble the pilot reactor core (FusionCore-Pilot 1) and connect to high-voltage grid simulators.", status: "upcoming" },
      { quarter: "Q4 2027", milestone: "Commercial Commissioning at Canada Mine Pilot", targetTrl: 8, description: "Deploy first physical unit under temporary regulatory license for industrial grid-offsetting at remote lithium mine.", status: "upcoming" }
    ],

    risks: {
      technical: 85,
      financial: 90,
      market: 40,
      regulatory: 95,
      description: "Very high technological risk regarding long-term plasma stability. High regulatory risks due to nuclear licensing delays. Low market risk as clean energy demand is inelastic."
    }
  },
  {
    id: "medvitals",
    name: "MedVitals AI",
    productName: "OncoPredict SaaS",
    tagline: "FDA-Cleared Multi-Organ Cancer Risk Diagnostic Platform",
    industry: "HealthTech / SaaS / AI",
    problem: "Early-stage cancer screening is expensive, localized, and suffers from high false-positive rates, leading to delayed treatments or unnecessary invasive biopsies.",
    solution: "OncoPredict uses deep-learning models trained on 14 million longitudinal patient scans, blood panels, and genetic sequences to flag early multi-organ cancer indicators with 98.4% sensitivity, directly integrating into major hospital EHR networks.",
    businessModel: "Enterprise SaaS. Annual licensing subscriptions to hospital groups, based on diagnostic volumes, plus a B2B2C patient-pay model for premium wellness screenings.",
    targetMarket: "Primary care hospital networks, commercial diagnostic labs, oncology clinics, and private insurance carriers.",
    revenueModel: "SaaS licensing ($12,000/year per oncology terminal) + API utility billing ($15 per scan processed).",
    team: "Co-founded by Dr. Sarah Jenkins (former Director of Bioinformatics at Stanford Health Care) and Rajesh Gupte (former Lead AI Architect at Siemens Healthineers).",
    fundingStage: "Series B (Scaling)",
    raisedAmount: "$28.0M",
    runwayMonths: 24,
    
    healthScore: 88,
    innovationScore: 84,
    marketPotentialScore: 92,
    investorReadinessScore: 95,
    ipStrengthScore: 78,
    commercializationScore: 94,

    panelReviews: {
      vcInvestor: "Very attractive SaaS margins (82% gross margins) with repeatable utility revenue. Extremely clean cap table and a 24-month runway. Highly investable; Series B lead investor terms are in negotiation.",
      startupIndiaEvaluator: "Qualifies under the Digital India healthcare push. High priority for Ayushman Bharat EHR integrations. Eligible for local healthcare tax concessions.",
      patentExaminer: "IP portfolio is moderately defensive. AI models are protected primarily as trade secrets and proprietary data pipelines, but software patents covering the neural-net diagnostic routing are filed. Moderate risk of litigation from legacy PACS vendors.",
      commercializationExpert: "GTM model is sound. Integrating directly into EPIC and Cerner EHR platforms reduces user friction. Sales cycles are long (9-12 months per hospital system) but churn is virtually zero.",
      incubatorMentor: "Excellent product-market fit. Advise expanding clinical trials to tier-2 and tier-3 hospital sites to increase training demographic diversity and validate efficacy globally.",
      marketAnalyst: "Market opportunity is vast. Health insurance carriers are showing interest in subsidizing scans because early cancer detection reduces expensive late-stage therapy costs by 70%."
    },

    marketSize: {
      tam: 18000, // $18 Billion
      sam: 4500,  // $4.5 Billion
      som: 680,   // $680 Million
      growthRate: 22.4,
      explanation: "TAM targets the global oncology diagnostic software market. SAM focuses on US and European primary care networks using EHR integration, and SOM represents the realistic market capture in top-tier US hospital chains within 3 years."
    },

    swot: {
      strengths: [
        "Proprietary dataset of 14M scans annotated by top board-certified oncologists.",
        "Integration into EPIC, Cerner, and Meditech EHR pipelines with zero IT overhead.",
        "98.4% sensitivity and 95.1% specificity on blind multi-site clinical validations."
      ],
      weaknesses: [
        "High reliance on third-party EHR API stability and integration policies.",
        "AI diagnostic explanation (black-box model) remains a barrier for older clinicians.",
        "High cost of clinical data acquisition for training models on rare cancers."
      ],
      opportunities: [
        "Direct insurance reimbursement codes approval (CPT codes fast-tracking).",
        "Expansion into pharmaceutical clinical trial patient matching services.",
        "Partnership with consumer wearable companies to ingest longitudinal biometric data."
      ],
      shadows: [],
      threats: [
        "Changes in HIPAA/GDPR data compliance laws making multi-site training illegal.",
        "A major diagnostic error (false-negative) leading to liability lawsuits.",
        "Tech giants (Google Health, Microsoft Nuance) open-sourcing competing diagnostic layers."
      ]
    } as any,

    competitors: [
      {
        name: "Grail (Galleri)",
        marketShare: 35,
        funding: "$2.0B (Acquired by Illumina)",
        trl: 9,
        features: { "Compact Footprint": "N/A", "Aneutronic": "N/A", "HTS Magnets": "N/A", "PPA Signed": "N/A" },
        advantages: "Leverages liquid biopsy blood testing which is highly accurate at molecular level.",
        disadvantages: "Extremely high cost ($950/test) compared to MedVitals' digital imaging scan analyzer ($15/scan)."
      },
      {
        name: "Tempus AI",
        marketShare: 25,
        funding: "$1.4B (IPO)",
        trl: 9,
        features: { "Compact Footprint": "N/A", "Aneutronic": "N/A", "HTS Magnets": "N/A", "PPA Signed": "N/A" },
        advantages: "Massive clinical database and matching genomic sequencing infrastructure.",
        disadvantages: "Primarily works on post-diagnosis treatment optimization rather than early screening risk flags."
      }
    ],
    competitorFeaturesList: ["EHR Integrated", "Multi-Organ Support", "FDA Cleared", "Patient Portal"],

    trlDetails: {
      level: 8,
      title: "Actual system completed and qualified through test and demonstration",
      status: "completed",
      description: "MedVitals OncoPredict software has completed dual-site clinical trials (N=1,200 patients) demonstrating performance matching or exceeding human board-certified radiologists.",
      checklist: [
        { item: "Clinical trial protocols approved by institutional IRB", done: true },
        { item: "Software code locked and security audited for HIPAA", done: true },
        { item: "Multi-site clinical trial efficacy reports published", done: true },
        { item: "FDA 510(k) de novo clearance submitted", done: true },
        { item: "Real-time production monitoring layer implemented", done: true }
      ],
      evidence: "FDA submission document Ref: K26-10928. Clinical trial results published in The Lancet Digital Health (Jan 2026)."
    },

    mrlDetails: {
      level: 8,
      title: "Pilot line capability demonstrated; Ready for low rate production",
      status: "completed",
      description: "For SaaS, manufacturing refers to server infrastructure scalability, container orchestration, high-availability setups, and security compliance pipelines. MedVitals is deployed in SOC2 Type II HIPAA-compliant AWS clusters.",
      checklist: [
        { item: "SOC2 Type II security certification achieved", done: true },
        { item: "Server load testing to 10,000 requests/sec validated", done: true },
        { item: "CI/CD automated deployment and rollback verified", done: true },
        { item: "ISO 13485 (Medical Device Quality Management) certified", done: true },
        { item: "Disaster recovery multi-region failover tested", done: true }
      ],
      supplyChainRisk: "Low risk. Dependent on cloud infrastructure providers (AWS). Risks mitigated by hosting on multi-cloud configurations (AWS + Azure backup regions)."
    },

    ipDetails: {
      patentsFiled: 5,
      patentsGranted: 1,
      patentStrength: 78,
      noveltyScore: 82,
      claimsFilingCountry: "United States (USPTO), Europe (EPO)",
      keyPatentTitle: "Neural Network Architecture for Predictive Cross-Modal Medical Imaging Registration (US-108271-B1)",
      freedomToOperateStatus: "low_risk",
      detailsText: "Software algorithms are historically difficult to patent, but MedVitals has secured one primary patent for its image alignment routing method. Trade secrets protect the core neural-net weights and pre-processing pipeline."
    },

    investmentReadiness: {
      financialModelComplete: true,
      capTableClean: true,
      pitchDeckReady: true,
      dataRoomComplete: true,
      valuableCoreIp: true,
      recurringRevenue: true,
      clearGtm: true,
      regulatoryClarity: true,
      advisorCommitment: true,
      matchingVcs: ["Oak HC/FT", "F-Prime Capital", "Sequoia Capital (Healthcare Group)", "ARCH Venture Partners"]
    },

    governmentSchemes: [
      {
        name: "Ayushman Bharat Digital Mission sandbox",
        agency: "National Health Authority, India",
        grantAmount: "Pilot Integration Support",
        eligibility: "Digital health startups aligning with Unified Health Interface (UHI) guidelines.",
        matchPercentage: 92,
        reasons: ["Aligned with national digital locker health records.", "HIPAA/ABD-compliant API structure.", "High social wellness impact."]
      },
      {
        name: "Small Business Innovation Research (SBIR) Phase II",
        agency: "National Institutes of Health (NIH), US",
        grantAmount: "$1.5 Million USD",
        eligibility: "Medical technologies showing high feasibility and commercial potential.",
        matchPercentage: 85,
        reasons: ["Phase I completed successfully.", "FDA pre-submission meetings completed.", "High-caliber clinical co-investigators."]
      }
    ],

    roadmap: [
      { quarter: "Q3 2026", milestone: "FDA 510(k) Approval & Clearance", targetTrl: 8, description: "Secure final FDA clearance for multi-organ diagnostic classification modules.", status: "in_progress" },
      { quarter: "Q4 2026", milestone: "Commercial Launch inside EPIC App Orchard", targetTrl: 9, description: "Go live on Epic's EHR marketplace allowing 300+ US hospital systems to deploy with one-click integration.", status: "upcoming" },
      { quarter: "Q1 2027", milestone: "Launch Direct-to-Consumer Diagnostic API", targetTrl: 9, description: "Introduce wellness screening partnerships with corporate executive health packages.", status: "upcoming" },
      { quarter: "Q3 2027", milestone: "Expand Diagnostic AI to Brain and Spine Scans", targetTrl: 8, description: "Integrate specialized neural MRI scans and launch clinical validation trials.", status: "upcoming" }
    ],

    risks: {
      technical: 30,
      financial: 40,
      market: 45,
      regulatory: 88,
      description: "Low technical risk as models are already robustly validated. Moderate market sales cycle risks. High regulatory risk; any delays in FDA processing or changes in patient data laws impact GTM timeline."
    }
  },
  {
    id: "biopack",
    name: "BioPack Technologies",
    productName: "SeaGuard Film",
    tagline: "Seaweed-Based Biodegradable Active Barrier Packaging",
    industry: "CleanTech / Materials Science",
    problem: "Single-use plastic food packaging accounts for 40% of municipal plastic pollution. Existing compostable papers lack moisture barriers and tear easily, leading to faster food spoilage.",
    solution: "BioPack synthesizes a flexible, transparent, food-grade packaging film from red seaweed kelp extracts. The film contains active antioxidant layers that extend fruit/vegetable shelf life by 40% and biodegrades in soil within 21 days without microplastic residues.",
    businessModel: "B2B Manufacturing & Distribution. Partner with major FMCG food brands (e.g. Nestlé, Unilever) to supply rolls of biodegradable film. Direct sales + corporate packaging integration licenses.",
    targetMarket: "Fresh produce distributors, global snack manufacturers, fast-casual restaurant packaging supply chains.",
    revenueModel: "Direct product sales ($1.80 per kg of film, 40% margin at scale) + licensing proprietary extruder manufacturing setups to packaging converters.",
    team: "Co-founded by Dr. Amit Banerjee (former Chief Chemist at ITC Packaging Division) and Chloe Dupont (former Materials Engineering Lead at Veolia Environmental Services).",
    fundingStage: "Seed / Pre-Series A",
    raisedAmount: "$3.2M",
    runwayMonths: 12,
    
    healthScore: 72,
    innovationScore: 79,
    marketPotentialScore: 84,
    investorReadinessScore: 80,
    ipStrengthScore: 85,
    commercializationScore: 78,

    panelReviews: {
      vcInvestor: "Interesting seed stage company. Capital requirements are moderate as they use existing blown-film extrusion equipment. The pricing is currently a 2.5x markup compared to petroleum plastics; they must lower production cost to gain major FMCG volume contracts.",
      startupIndiaEvaluator: "Highly aligned with India's single-use plastic ban. Eligible for clean environment subsidies and manufacturing machinery capital assistance through the MSME sector schemes.",
      patentExaminer: "Strong IP positioning. Two patents granted covering the cross-linking chemical process of seaweed polymer chains which provides water barrier resistance. Strong claims; high defense.",
      commercializationExpert: "Excellent commercialization strategy of using existing plastic extrusion machinery. Allows contract manufacturers to adopt the film with zero capital adjustments, lowering entry friction.",
      incubatorMentor: "Recommend focusing on high-margin segments first, such as organic gourmet foods, before attempting to compete with commodity plastic wrap in supermarkets.",
      marketAnalyst: "Consumer backlash against plastics is at an all-time high. Brands are willing to pay a 20-30% green premium for authentic zero-plastic packaging that maintains food shelf-life."
    },

    marketSize: {
      tam: 12400, // $12.4 Billion
      sam: 3100,  // $3.1 Billion
      som: 450,   // $450 Million
      growthRate: 18.2,
      explanation: "TAM targets the global flexible food packaging market. SAM targets the sustainable and biodegradable packaging subsector, and SOM represents market capture in organic fresh produce packaging in Western Europe and India."
    },

    swot: {
      strengths: [
        "Superior moisture barrier compared to existing PLA and starch-based alternatives.",
        "Uses existing blown-film plastic machinery, requiring zero retrofitting.",
        "Antioxidant properties delay food oxidation, reducing food waste by 40%."
      ],
      weaknesses: [
        "Unit economics: 2.5x more expensive to produce than low-density polyethylene (LDPE).",
        "Raw seaweed supply chains are seasonal and sensitive to ocean temperature spikes.",
        "Tensile strength drops under high humidity storage over 6 months."
      ],
      opportunities: [
        "Government bans on single-use plastic wraps in EU and India.",
        "Co-branding opportunities with major eco-conscious FMCG brands.",
        "Integrating anti-microbial natural extracts to further increase meat shelf-life."
      ],
      shadows: [],
      threats: [
        "Petroleum price drops making virgin plastics extremely cheap.",
        "Large paper packaging companies releasing cheaper cellulose barrier alternatives.",
        "Supply chain disruptions in kelp cultivation regions (e.g. Philippines, Indonesia)."
      ]
    } as any,

    competitors: [
      {
        name: "Notpla",
        marketShare: 18,
        funding: "$15M",
        trl: 8,
        features: { "Compact Footprint": "N/A", "Aneutronic": "N/A", "HTS Magnets": "N/A", "PPA Signed": "N/A" },
        advantages: "First mover brand recognition, winner of Earthshot Prize, strong European distribution.",
        disadvantages: "Primarily focused on rigid coatings and sachets (e.g. water pods) rather than flexible thin films for industrial packaging."
      },
      {
        name: "Loliware",
        marketShare: 10,
        funding: "$8M",
        trl: 7,
        features: { "Compact Footprint": "N/A", "Aneutronic": "N/A", "HTS Magnets": "N/A", "PPA Signed": "N/A" },
        advantages: "Strong US footprint, patented seaweed straws and retail single-use products.",
        disadvantages: "Products are heavier and thicker; less focus on food-grade flexible roll stock."
      }
    ],
    competitorFeaturesList: ["Moisture Barrier", "Compostable < 30 days", "Existing Machinery Fit", "Food Grade Approved"],

    trlDetails: {
      level: 5,
      title: "Component and/or breadboard validation in relevant environment",
      status: "completed",
      description: "BioPack has manufactured rolls of film at a test manufacturing site and packaged fresh berries for 60 days in simulated grocery shelf conditions (humidity, light, temp), proving moisture barrier stability.",
      checklist: [
        { item: "Seaweed extraction chemistry optimized for scalability", done: true },
        { item: "Blown film extruder parameters configured", done: true },
        { item: "Packaged food shelf-life study completed vs plastic", done: true },
        { item: "Pilot production line contract signed", done: false },
        { item: "Biodegradability certification ASTM D6400 achieved", done: false }
      ],
      evidence: "Test report BP-502: Berries packaged in SeaGuard remained mold-free for 14 days at 4°C, matching LDPE performance. Film fully degraded in soil in 19 days."
    },

    mrlDetails: {
      level: 5,
      title: "Capability to produce prototype components in feedback loop",
      status: "completed",
      description: "Extrusion runs of 100kg batches completed successfully. However, yield rates are inconsistent, and raw material moisture content variations lead to occasional film tearing.",
      checklist: [
        { item: "Raw materials specifications standardized", done: true },
        { item: "Initial process cost modeling completed", done: true },
        { item: "Extrusion temperature profile locked", done: true },
        { item: "Consistent roll winding speed established", done: false },
        { item: "Raw material supply chain agreements signed", done: false }
      ],
      supplyChainRisk: "Moderate risk. Seaweed supply depends on kelp farmers in South India. Supply is steady but vulnerable to regional monsoons and sea temperature changes."
    },

    ipDetails: {
      patentsFiled: 4,
      patentsGranted: 2,
      patentStrength: 85,
      noveltyScore: 89,
      claimsFilingCountry: "India (IPO), United States (USPTO)",
      keyPatentTitle: "Method for Synthesizing Water-Resistant Seaweed Polymeric Bioplastic Films (IN-20241109)",
      freedomToOperateStatus: "clear",
      detailsText: "Patent examiner report confirms the polymer cross-linking catalyst used by BioPack is distinct from cellulose and starch formulations. FTO clearance verified for India and EU."
    },

    investmentReadiness: {
      financialModelComplete: true,
      capTableClean: true,
      pitchDeckReady: true,
      dataRoomComplete: true,
      valuableCoreIp: true,
      recurringRevenue: false,
      clearGtm: false,
      regulatoryClarity: true,
      advisorCommitment: true,
      matchingVcs: ["SJF Ventures", "Omnivore Partners", "Closed Loop Partners", "SOSV (IndieBio)"]
    },

    governmentSchemes: [
      {
        name: "Single-Use Plastic Substitution Capital Assistance",
        agency: "Ministry of Environment, Forest and Climate Change (India)",
        grantAmount: "50% Machinery Subsidy (up to ₹1 Crore)",
        eligibility: "Manufacturers setting up machinery to substitute single-use plastics with certified biodegradable options.",
        matchPercentage: 96,
        reasons: ["Direct substitute for thin plastic wrap.", "Employs rural coastal kelp farmers.", "DPIIT MSME registration active."]
      },
      {
        name: "MSME Technology Upgradation Grant",
        agency: "Ministry of MSME, India",
        grantAmount: "₹15 Lakhs capital subsidy",
        eligibility: "Registered MSMEs modernizing production equipment.",
        matchPercentage: 88,
        reasons: ["MSME status verified.", "Adapting standard extrusion lines.", "Eco-friendly energy saving technology."]
      }
    ],

    roadmap: [
      { quarter: "Q3 2026", milestone: "ASTM D6400 Compostable Certification", targetTrl: 6, description: "Submit samples to TUV Austria for certified marine and soil biodegradability stamps.", status: "in_progress" },
      { quarter: "Q4 2026", milestone: "10-Ton Pilot Extrusion Run", targetTrl: 6, description: "Launch industrial-scale contract manufacturing run of 10 tons of film to optimize blown film yield rates.", status: "upcoming" },
      { quarter: "Q1 2027", milestone: "Pilot trial with Organic Berries Brand", targetTrl: 7, description: "Deploy 50,000 SeaGuard food packages in retail stores in collaboration with a premium berry distributor.", status: "upcoming" },
      { quarter: "Q3 2027", milestone: "Commercial Scale Manufacturing", targetTrl: 8, description: "Establish custom high-volume compounding facility to lower unit costs by 40%.", status: "upcoming" }
    ],

    risks: {
      technical: 50,
      financial: 65,
      market: 60,
      regulatory: 30,
      description: "Moderate technical scaling risks regarding film elasticity. High financial risk regarding unit economics and price competitiveness. Very low regulatory risk due to policy pushes banning plastics."
    }
  }
];
