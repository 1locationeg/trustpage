// Complete Multi-Profession Ecosystem Presets for R8ESTATE Adaptive Trust Engine

import { PROFESSIONS_DICT } from './professionTemplates';

export const DEFAULT_PROFILE = {
  // Goal & Profession metadata
  selectedGoal: "grow_business",
  professionId: "broker",

  // Identity
  name: "Ahmed Hassan",
  title: "Senior Off-Plan & Investment Specialist",
  company: "Independent Professional",
  companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
  photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
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
    id: "ahmed-hassan", 
    label: "Ahmed Hassan — Sales & Off-Plan Specialist (Cairo)", 
    data: DEFAULT_PROFILE 
  },
  {
    id: "elena-rostova",
    label: "Elena Rostova — Principal Architect & Urban Planner (Dubai)",
    data: {
      ...DEFAULT_PROFILE,
      selectedGoal: "win_partnerships",
      professionId: "architect",
      name: "Elena Rostova",
      title: "Principal Architect & Sustainable Masterplanner",
      company: "Rostova & Associates Studio",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
      locations: ["Dubai", "Riyadh", "London"],
      specializations: ["Sustainable Masterplanning", "Luxury Residential Design", "Commercial Towers", "RIBA Chartered"],
      dealsClosed: 48,
      transactionVolume: "14.2M",
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
      ],
      verifications: [
        { title: "RIBA & AIA Architect Charter", status: "Verified", date: "Jan 2022", source: "Royal Institute of British Architects", confidence: 100 },
        { title: "Dubai Municipality Unlimited License", status: "Verified", date: "Mar 2023", source: "DCA Engineering Council", confidence: 100 }
      ]
    }
  },
  {
    id: "marcus-vance",
    label: "Marcus Vance — Real Estate & Property Lawyer (London & UAE)",
    data: {
      ...DEFAULT_PROFILE,
      selectedGoal: "build_reputation",
      professionId: "lawyer",
      name: "Marcus Vance, KC",
      title: "Senior Partner — Commercial Real Estate & Structuring",
      company: "Vance & Sterling International Legal Counsel",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80",
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
  }
];
