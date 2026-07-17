// Complete Data Models & Pre-populated Profiles for R8ESTATE Trust Page & Intelligence Engine

export const DEFAULT_PROFILE = {
  // Step 1 & 2: Identity
  name: "Ahmed Hassan",
  title: "Senior Off-Plan & Investment Specialist",
  company: "Independent Professional",
  companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80",
  photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  photoSource: "Verified Professional Studio",
  locations: ["New Cairo", "North Coast", "Sheikh Zayed"],
  languages: ["English", "Arabic", "French"],
  trustScore: 94,
  buyerConfidenceScore: 94,
  confidenceLevel: "Excellent",
  riskLevel: "Low",
  verificationLevel: "Gold",
  completionPercentage: 96,

  // CTAs
  whatsapp: "+201001234567",
  phone: "+201001234567",
  email: "ahmed.hassan@r8estate.com",
  meetingUrl: "https://calendly.com",

  // Step 3: Expertise
  specializations: ["Off-Plan Specialist", "Luxury Specialist", "Investment Advisor", "Negotiation Expert"],
  expertiseMatrix: [
    { title: "Off-Plan Properties", years: 9, projects: 37, confidence: 98 },
    { title: "Luxury Residential", years: 7, projects: 28, confidence: 95 },
    { title: "Investment Portfolios", years: 8, projects: 42, confidence: 96 },
    { title: "Commercial Leasing", years: 4, projects: 12, confidence: 88 },
  ],

  // Step 4: Track Record Metrics
  dealsClosed: 142,
  transactionVolume: "$145M+",
  yearsExp: 9,
  projectsSold: 37,
  happyClients: 120,
  developerExpYears: 7,
  repeatClientRate: "44%",
  referralRate: "72%",
  avgResponseTime: "< 12 mins",

  // Step 5: Measurable Results
  results: [
    { metric: "+34% Avg ROI", title: "Investment Capital Appreciation", description: "Delivered 34% average gain on pre-construction off-plan assignments within 24 months.", evidence: "Verified Land Registry Transfers 2022-2025" },
    { metric: "$42M Deployed", title: "Investor Capital Managed", description: "Successfully structured private portfolio acquisitions across prime coastal and urban developments.", evidence: "Audited Escrow Account Statements" },
    { metric: "$3.8M Saved", title: "Negotiated Buyer Savings", description: "Secured below-market pricing, fee waivers, and preferential payment terms for private clients.", evidence: "Contract Price vs Developer List Price Verification" },
    { metric: "8.6% Net Yield", title: "Rental Return Optimization", description: "High-demand rental placement for investor-owned luxury units in top gated communities.", evidence: "Tenant Lease Agreements & Escrow Deposits" },
  ],

  // Step 6: Proof Center Items
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
    },
    {
      id: "proof-3",
      title: "Luxury Villa Private Resale — Palm Hills",
      type: "Verified Case Study",
      date: "November 2024",
      source: "Title Deed & Escrow Wire Confirmation",
      confidence: 98,
      evidenceLevel: "Tier 1 — Bank Wire & Title Deed",
      details: "Represented overseas investor; closed transaction within 9 days without buyer flying in.",
      verifiedBy: "Palm Hills Advisory & Title Office"
    }
  ],

  // Step 7: Reviews & Endorsements
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
    },
    {
      id: "rev-2",
      author: "Mariam & Tarek Mansour",
      role: "First-Time Luxury Homebuyers",
      relationship: "Verified Homeowner Buyer",
      rating: 5,
      date: "January 2025",
      comment: "We saved over $120k on developer processing fees and secured an extended 8-year payment plan thanks to Ahmed's direct developer relations. Absolute professional.",
      badge: "Verified Buyer",
      verified: true
    },
    {
      id: "rev-3",
      author: "Hisham El-Nazer",
      role: "VP of Sales, Mountain View",
      relationship: "Verified Developer Executive",
      rating: 5,
      date: "December 2024",
      comment: "Ahmed Hassan consistently ranks among our top 1% accredited partners. His client preparation and transaction integrity are unmatched in the region.",
      badge: "Verified Developer Partner",
      verified: true
    }
  ],

  // Step 2: Verification Center Checklist
  verifications: [
    { title: "National Identity & Passport", status: "Verified", date: "Jan 12, 2024", source: "Government ID Auth", confidence: 100 },
    { title: "Phone & WhatsApp Business", status: "Verified", date: "Jan 12, 2024", source: "Telecom Direct API", confidence: 100 },
    { title: "Professional Email Address", status: "Verified", date: "Jan 12, 2024", source: "Domain & DKIM Check", confidence: 100 },
    { title: "Real Estate Broker License", status: "Verified", date: "Feb 04, 2024", source: "Regulatory Licensing Board", confidence: 99 },
    { title: "Company Affiliation & Registry", status: "Verified", date: "Mar 18, 2024", source: "Corporate Commercial Register", confidence: 98 },
    { title: "Background Check & AML Clean", status: "Verified", date: "Apr 01, 2024", source: "Global Sanctions & KYC Audit", confidence: 100 },
    { title: "LinkedIn & Public Media Audit", status: "Verified", date: "May 10, 2024", source: "Social Identity Graph", confidence: 95 },
  ],

  // Step 8: Differentiation & Promise
  promise: "100% Data-Driven Real Estate Advisory — No Pressure, Only Verified Market Intelligence.",
  methodology: "3-Tier Deal Audit: (1) Developer Financial Health Check, (2) Historical Appreciation Modeling, (3) Contractual Buyer Safeguards.",
  idealClients: "High Net Worth Individuals, Overseas Investors, & Families seeking prime capital growth with capital preservation.",
  decisionStyle: "Analytical, Transparent, Direct Developer Escalation",
  communicationStyle: "Instant WhatsApp updates, bi-weekly video briefings, formal PDF investment memos.",

  // Step 9: Recognition & Memberships
  awards: [
    { title: "Top 10 Off-Plan Broker of the Year 2024", issuer: "Emaar Misr", year: "2024" },
    { title: "Excellence in Client Trust & Security", issuer: "MENA Real Estate Summit", year: "2024" },
    { title: "Platinum Partner Award", issuer: "Mountain View Developments", year: "2023" }
  ],

  memberships: [
    "Royal Institution of Chartered Surveyors (RICS) Candidate",
    "Egyptian Real Estate Brokers Association (EREBA)",
    "Certified International Property Specialist (CIPS)"
  ],

  mediaMentions: [
    { title: "Featured Expert: Navigating Coastal Off-Plan Investments", outlet: "Business Today MENA", year: "2024" },
    { title: "Keynote Speaker: Real Estate Technology & Buyer Confidence", outlet: "PropTech Arabia Conference", year: "2024" }
  ],

  // Step 10: Intelligence Layer Scores
  intelligenceScores: {
    trustScore: 94,
    buyerConfidence: 94,
    riskLevel: "Low",
    authorityScore: 96,
    visibilityScore: 91,
    marketExpertiseScore: 98,
    negotiationScore: 95,
    topStrengths: ["Off-Plan Strategy & Developer Direct Access", "Audited Financial Yield Modeling"],
    weakSignals: ["High demand — client intake limited to 5 new investors per month"],
    bestFitFor: ["First-Time Buyers", "Luxury Residential", "Off-Plan Capital Growth", "Overseas Investors"]
  }
};

export const MOCK_PRESETS = [
  { id: "ahmed-hassan", label: "Ahmed Hassan (Off-Plan Specialist - Cairo)", data: DEFAULT_PROFILE },
  {
    id: "sarah-mansoor",
    label: "Sarah Al-Mansoor (Luxury & Commercial - Dubai)",
    data: {
      ...DEFAULT_PROFILE,
      name: "Sarah Al-Mansoor",
      title: "Private Office Wealth & Commercial Advisor",
      company: "Coldwell Banker Commercial",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
      locations: ["Dubai Marina", "Palm Jumeirah", "Downtown Dubai", "DIFC"],
      dealsClosed: 210,
      transactionVolume: "$340M+",
      trustScore: 97,
      buyerConfidenceScore: 97,
      confidenceLevel: "Legendary",
      verificationLevel: "Elite",
      specializations: ["Luxury Specialist", "Commercial Specialist", "Private Wealth Advisor"],
      promise: "Preserving and expanding family office wealth through prime institutional UAE real estate assets."
    }
  }
];
