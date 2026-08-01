// Complete Multi-Profession Ecosystem Presets for R8ESTATE Adaptive Trust Engine

import { PROFESSIONS_DICT } from './professionTemplates';

export const DEFAULT_PROFILE = {
  // Goal & Profession metadata
  selectedGoal: "grow_business",
  professionId: "broker",

  // Identity
  name: "Ahmed Hassan",
  title: "Investment Broker",
  company: "Emaar Misr",
  companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
  photo: "/profile_man_ahmed.png",
  locations: ["New Cairo", "North Coast", "Sheikh Zayed"],
  languages: ["English", "Arabic", "French"],
  trustScore: 94,
  buyerConfidenceScore: 94,
  confidenceLevel: "Excellent",
  riskLevel: "Low",
  verificationLevel: "Gold",
  completionPercentage: 96,

  // Outcome Signals
  opportunityScore: 92,
  hiringReadiness: 88,
  referralPotential: "94% (Growing)",
  authorityStatus: "Recognized Specialist",

  // CTAs
  whatsapp: "+201001234567",
  phone: "+201001234567",
  email: "ahmed.hassan@r8estate.com",
  meetingUrl: "https://calendly.com",

  // Expertise
  specializations: ["Off-Plan Specialist", "Luxury Specialist", "Investment Advisor", "Negotiation Expert"],
  expertiseMatrix: [
    { title: "Off-Plan Properties", years: 9, projects: 37, confidence: 98 },
    { title: "Luxury Residential", years: 7, projects: 28, confidence: 95 },
    { title: "Investment Portfolios", years: 8, projects: 42, confidence: 96 },
    { title: "Commercial Leasing", years: 4, projects: 12, confidence: 88 },
  ],

  // Track Record Metrics
  dealsClosed: 142,
  transactionVolume: "$145M+",
  yearsExp: 9,
  projectsSold: 37,
  happyClients: 120,
  developerExpYears: 7,
  repeatClientRate: "44%",
  referralRate: "72%",
  avgResponseTime: "< 12 mins",

  // Results
  results: [
    { metric: "+34% Avg ROI", title: "Investment Capital Appreciation", description: "Delivered 34% average gain on pre-construction off-plan assignments within 24 months.", evidence: "Verified Land Registry Transfers 2022-2025" },
    { metric: "$42M Deployed", title: "Investor Capital Managed", description: "Successfully structured private portfolio acquisitions across prime coastal and urban developments.", evidence: "Audited Escrow Account Statements" },
    { metric: "$3.8M Saved", title: "Negotiated Buyer Savings", description: "Secured below-market pricing, fee waivers, and preferential payment terms for private clients.", evidence: "Contract Price vs Developer List Price Verification" },
    { metric: "8.6% Net Yield", title: "Rental Return Optimization", description: "High-demand rental placement for investor-owned luxury units in top gated communities.", evidence: "Tenant Lease Agreements & Escrow Deposits" },
  ],

  // Proof Items
  proofItems: [
    {
      id: "proof-1",
      title: "Bulk Off-Plan Acquisition — Marassi Coastal Resort",
      type: "Verified Transaction",
      date: "March 2025",
      source: "Land Authority & Developer Escrow",
      confidence: 99,
      evidenceLevel: "Tier 1 — Audited Official Contract",
      details: "Client acquired 6 premium sea-view chalets prior to public launch. Capital value increased by 38% at delivery.",
      verifiedBy: "Government Real Estate Authority & Emaar Misr Audit"
    },
    {
      id: "proof-2",
      title: "Commercial Headquarters Lease & Buyout — New Cairo",
      type: "Verified Deal",
      date: "January 2025",
      source: "Corporate Land Registry & Banking Ledger",
      confidence: 97,
      evidenceLevel: "Tier 1 — Financial Transfer Ledger",
      details: "Negotiated 10-year master lease with corporate buyout option for tech conglomerate.",
      verifiedBy: "Coldwell Banker Commercial Legal Audit"
    }
  ],

  // Reviews & Endorsements
  reviews: [
    {
      id: "rev-1",
      author: "Dr. Karim Al-Fayed",
      role: "Managing Director, Sovereign Capital",
      relationship: "Verified Repeat Investor (4 Transactions)",
      rating: 5,
      date: "February 2025",
      comment: "Ahmed is not a broker who tries to sell you whatever is on his table. He acts like a private wealth advisor who stops you from making bad deals. His proof center gave me complete clarity before wiring $2.4M.",
      badge: "Verified Investor",
      verified: true
    }
  ],

  // Verifications
  verifications: [
    { title: "National Identity & Passport", status: "Verified", date: "Jan 12, 2024", source: "Government ID Auth", confidence: 100 },
    { title: "Real Estate Broker License", status: "Verified", date: "Feb 04, 2024", source: "Regulatory Licensing Board", confidence: 99 },
    { title: "Company Affiliation & Registry", status: "Verified", date: "Mar 18, 2024", source: "Corporate Commercial Register", confidence: 98 },
    { title: "Background Check & AML Clean", status: "Verified", date: "Apr 01, 2024", source: "Global Sanctions & KYC Audit", confidence: 100 }
  ],

  promise: "100% Data-Driven Real Estate Advisory — No Pressure, Only Verified Market Intelligence.",
  methodology: "3-Tier Deal Audit: (1) Developer Financial Health Check, (2) Historical Appreciation Modeling, (3) Contractual Buyer Safeguards.",
  
  awards: [
    { title: "Top 10 Off-Plan Broker of the Year 2024", issuer: "Emaar Misr", year: "2024" },
    { title: "Excellence in Client Trust & Security", issuer: "MENA Real Estate Summit", year: "2024" }
  ],

  memberships: [
    "Royal Institution of Chartered Surveyors (RICS) Candidate",
    "Egyptian Real Estate Brokers Association (EREBA)"
  ]
};

export const MOCK_PRESETS = [
  {
    id: "build-authority",
    label: "Build Authority",
    data: {
      ...DEFAULT_PROFILE,
      selectedGoal: "build_reputation",
      professionId: "lawyer",
      name: "Maged Shaker",
      title: "Property Lawyer",
      company: "Shaker Law",
      photo: "/profile_man_marcus.png",
      locations: ["London", "DIFC Dubai", "Riyadh"],
      specializations: ["Cross-Border Land Acquisitions", "Escrow & Title Protection", "Joint Venture Structuring"],
      dealsClosed: 310,
      transactionVolume: "$650M+",
      yearsExp: 18,
      happyClients: 150,
      trustScore: 99,
      buyerConfidenceScore: 99,
      confidenceLevel: "Undisputed Authority",
      verificationLevel: "Elite",
      opportunityScore: 99,
      hiringReadiness: 96,
      authorityStatus: "Senior Legal Counsel",
      promise: "Safeguarding institutional real estate capital with zero-flaw legal structures and title protection.",
      methodology: "Due Diligence Audit + Multi-Jurisdictional Escrow Structuring + Title Defect Indemnity.",
      proofItems: [
        {
          id: "law-1",
          title: "DIFC Commercial Tower $140M Acquisition Counsel",
          type: "Verified Legal Advisory",
          date: "January 2025",
          source: "DIFC Courts & Land Registry Audit",
          confidence: 100,
          evidenceLevel: "Tier 1 — Recorded Land Registry Deed",
          details: "Advised European pension fund on full ownership transfer and master lease structuring.",
          verifiedBy: "DIFC Regulatory Authority & Bar Council"
        }
      ]
    }
  },
  {
    id: "more-opportunities",
    label: "More Opportunities",
    data: {
      ...DEFAULT_PROFILE,
      selectedGoal: "get_hired",
      professionId: "developer_exec",
      name: "Sarah Refaat",
      title: "Project Developer",
      company: "Apex Holdings",
      photo: "/profile_woman_elena.png",
      locations: ["Cairo", "Dubai"],
      specializations: ["Mixed-Use Developments", "GDV Growth Strategy", "Feasibility Modeling"],
      dealsClosed: 12,
      transactionVolume: "$320M+",
      yearsExp: 11,
      happyClients: 85,
      trustScore: 95,
      buyerConfidenceScore: 95,
      confidenceLevel: "Excellent",
      verificationLevel: "Gold",
      opportunityScore: 96,
      hiringReadiness: 95,
      authorityStatus: "VP Level Executive",
      promise: "Driving high-GDV real estate portfolios from concept to 100% exit velocity.",
      methodology: "Risk-Adjusted Masterplanning + Strategic JV Sourcing + Cost-Efficiency Auditing.",
      proofItems: [
        {
          id: "dev-1",
          title: "New Cairo Mixed-Use District Master Delivery",
          type: "Verified Development Milestone",
          date: "November 2024",
          source: "Ministry of Housing & Urban Audit",
          confidence: 98,
          evidenceLevel: "Tier 1 — Delivery & Handover Certificate",
          details: "Led development of a 45-acre retail and residential hub with 98% pre-completion sales.",
          verifiedBy: "GCP Engineering Consultants & Project Audit"
        }
      ]
    }
  },
  {
    id: "stronger-partnerships",
    label: "Stronger Partnerships",
    data: {
      ...DEFAULT_PROFILE,
      selectedGoal: "win_partnerships",
      professionId: "architect",
      name: "Layla Rostom",
      title: "Master Architect",
      company: "Rostom Studio",
      photo: "/profile_woman_elena.png",
      locations: ["Dubai", "Riyadh", "London"],
      specializations: ["Sustainable Masterplanning", "Luxury Residential Design", "Commercial Towers", "RIBA Chartered"],
      dealsClosed: 48,
      transactionVolume: "$214M+",
      yearsExp: 14,
      happyClients: 98,
      trustScore: 98,
      buyerConfidenceScore: 98,
      confidenceLevel: "Legendary",
      verificationLevel: "Elite",
      opportunityScore: 97,
      hiringReadiness: 94,
      authorityStatus: "Global Design Authority",
      promise: "Designing net-zero, high-yield iconic architectural assets that appreciate across generations.",
      methodology: "Biophilic Design Principles + BREEAM Platinum Structural Certification + Cost-Optima Tech.",
      proofItems: [
        {
          id: "arch-1",
          title: "Palm Jumeirah Ultra-Luxury Waterfront Villa Masterplan",
          type: "Verified Blueprint & Construction",
          date: "December 2024",
          source: "Dubai Municipality & Civil Engineering Audit",
          confidence: 100,
          evidenceLevel: "Tier 1 — Official Building Permit & Handover",
          details: "22,000 sq ft private estate featuring solar kinetic facade and subterranean wellness spa.",
          verifiedBy: "Dubai Development Authority & Client Signoff"
        }
      ]
    }
  },
  {
    id: "client-confidence",
    label: "Client Confidence",
    data: DEFAULT_PROFILE
  },
  {
    id: "proven-experience",
    label: "Proven Experience",
    data: {
      ...DEFAULT_PROFILE,
      selectedGoal: "showcase_expertise",
      professionId: "interior_designer",
      name: "Kareem Salem",
      title: "Interior Designer",
      company: "Salem Design",
      photo: "/profile_man_ahmed.png",
      locations: ["Cairo", "London"],
      specializations: ["High-End Hospitality Design", "Corporate Office Styling", "Custom Yacht Interiors"],
      dealsClosed: 88,
      transactionVolume: "$45M+",
      yearsExp: 10,
      happyClients: 76,
      trustScore: 93,
      buyerConfidenceScore: 93,
      confidenceLevel: "Excellent",
      verificationLevel: "Gold",
      opportunityScore: 92,
      hiringReadiness: 89,
      authorityStatus: "Award-Winning Designer",
      promise: "Crafting highly bespoke, functional spaces that maximize commercial value and aesthetic impact.",
      methodology: "Spatial Optimization + Verified Materials Sourcing + Detailed Acoustic Modeling.",
      proofItems: [
        {
          id: "design-1",
          title: "Boutique Hotel Lobby & Lounge Redesign",
          type: "Verified Portfolio Handover",
          date: "October 2024",
          source: "Hotel Group Operations Ledger",
          confidence: 96,
          evidenceLevel: "Tier 1 — Handover Protocol & Quality Signoff",
          details: "Redesigned 8,000 sq ft main lobby, increasing guest satisfaction ratings by 24%.",
          verifiedBy: "Accor Group Design Audit"
        }
      ]
    }
  },
  {
    id: "stand-out",
    label: "Stand Out",
    data: {
      ...DEFAULT_PROFILE,
      selectedGoal: "increase_visibility",
      professionId: "property_manager",
      name: "Ziad El-Masry",
      title: "Property Manager",
      company: "Masry Mgmt",
      photo: "/profile_man_ahmed.png",
      locations: ["Cairo", "Alexandria"],
      specializations: ["Residential Portfolio Maximization", "Smart Building Technology", "Operational Cost Reduction"],
      dealsClosed: 520,
      transactionVolume: "$180M+",
      yearsExp: 12,
      happyClients: 450,
      trustScore: 96,
      buyerConfidenceScore: 96,
      confidenceLevel: "Exceptional",
      verificationLevel: "Gold",
      opportunityScore: 94,
      hiringReadiness: 90,
      authorityStatus: "Senior Asset Manager",
      promise: "Optimizing real estate yield through automated operations, energy efficiency, and high tenant retention.",
      methodology: "IoT Integration + Dynamic Rent Pricing + Preventive Maintenance Lifecycle Planning.",
      proofItems: [
        {
          id: "pm-1",
          title: "IoT Upgrade & Cost Optimization for 120-Unit Complex",
          type: "Verified Asset Management",
          date: "August 2024",
          source: "Property Management Annual Audit Report",
          confidence: 99,
          evidenceLevel: "Tier 1 — Audited Expense Ledger",
          details: "Implemented smart building management system, reducing utility costs by 18% in 12 months.",
          verifiedBy: "Middle East Energy Audits & Vanguard Finance"
        }
      ]
    }
  }
];

export function getFallbackPhoto(name) {
  if (!name) return "/profile_man_ahmed.png";
  const lower = name.toLowerCase();
  const femaleKeywords = [
    'elena', 'elene', 'rostova', 'maria', 'mary', 'jane', 'jessica', 'linda', 
    'emily', 'sarah', 'sara', 'fatima', 'yasmin', 'amina', 'nour', 'layla',
    'anna', 'anne', 'hannah', 'chloe', 'zoe', 'sofia', 'sophie', 'olivia',
    'isabella', 'mia', 'charlotte', 'amelia', 'harper', 'evelyn', 'abigail',
    'rose', 'lily', 'grace', 'diana', 'lucy', 'luna', 'stella', 'victoria',
    'architect' // elena's profession
  ];
  const isFemale = femaleKeywords.some(keyword => lower.includes(keyword));
  return isFemale ? "/profile_woman_elena.png" : "/profile_man_ahmed.png";
}

