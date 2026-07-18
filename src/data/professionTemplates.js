// Adaptive Trust Engine Dictionary for 16+ Real Estate Ecosystem Professions

export const PROFESSIONS_DICT = {
  broker: {
    id: "broker",
    label: "Sales Consultant / Broker",
    category: "Transactions",
    kpis: [
      { label: "Deals Closed", field: "dealsClosed", unit: "" },
      { label: "Volume Sold", field: "transactionVolume", unit: "" },
      { label: "Years Exp.", field: "yearsExp", unit: "y" },
      { label: "Happy Clients", field: "happyClients", unit: "+" }
    ],
    proofTitle: "Verified Transactions & Escrow Records",
    whyExperience: "Top-performing brokers build instant buyer trust through verified deal volume.",
    whyProof: "Show buyers and developers your audited closing history.",
    whyVerification: "Verified brokers close deals 4x faster.",
    defaultGoal: "Grow My Business"
  },
  architect: {
    id: "architect",
    label: "Architect / Urban Planner",
    category: "Design & Planning",
    kpis: [
      { label: "Projects Designed", field: "dealsClosed", unit: "" },
      { label: "Built Square Feet", field: "transactionVolume", unit: "M sqft" },
      { label: "Design Awards", field: "yearsExp", unit: "" },
      { label: "Client Satisfaction", field: "happyClients", unit: "%" }
    ],
    proofTitle: "Verified Architectural Portfolio & Masterplans",
    whyExperience: "Visionary architects win high-budget commissions by showcasing completed developments.",
    whyProof: "Let developers and private clients inspect your verified blueprint & construction portfolio.",
    whyVerification: "Licensed & RIBA/AIA certified architects attract premium developer clients.",
    defaultGoal: "Win Better Partnerships"
  },
  contractor: {
    id: "contractor",
    label: "Contractor / Construction",
    category: "Build & Delivery",
    kpis: [
      { label: "Projects Delivered", field: "dealsClosed", unit: "" },
      { label: "Contract Value", field: "transactionVolume", unit: "$M+" },
      { label: "On-Time Rate", field: "yearsExp", unit: "%" },
      { label: "Safety Score", field: "happyClients", unit: "%" }
    ],
    proofTitle: "Verified Construction Delivery & Handover Records",
    whyExperience: "Developers hire contractors with proven on-budget and on-time execution records.",
    whyProof: "Show developer executives your verified safety audits and project completions.",
    whyVerification: "ISO & Government-certified contractors win major infrastructure bids.",
    defaultGoal: "Win Better Partnerships"
  },
  lawyer: {
    id: "lawyer",
    label: "Real Estate & Property Lawyer",
    category: "Legal & Compliance",
    kpis: [
      { label: "Deals Advised", field: "dealsClosed", unit: "" },
      { label: "Capital Structured", field: "transactionVolume", unit: "$M+" },
      { label: "Practice Years", field: "yearsExp", unit: "y" },
      { label: "Corporate Clients", field: "happyClients", unit: "+" }
    ],
    proofTitle: "Verified Legal Advisory Cases & Title Deeds",
    whyExperience: "Investors choose legal counsel with deep precedent in land acquisition and dispute resolution.",
    whyProof: "Display verified corporate advisory records and legal bar accreditation.",
    whyVerification: "Bar-certified property lawyers build immediate trust with institutional clients.",
    defaultGoal: "Build My Reputation"
  },
  property_manager: {
    id: "property_manager",
    label: "Property & Facility Manager",
    category: "Asset Management",
    kpis: [
      { label: "Units Managed", field: "dealsClosed", unit: "" },
      { label: "Portfolio Value", field: "transactionVolume", unit: "$M+" },
      { label: "Occupancy Rate", field: "yearsExp", unit: "%" },
      { label: "Retention Rate", field: "happyClients", unit: "%" }
    ],
    proofTitle: "Verified Asset Management & Net Yield Reports",
    whyExperience: "Property owners entrust portfolios to managers who maintain high occupancy and net yield.",
    whyProof: "Show asset owners your verified tenant retention and maintenance audit records.",
    whyVerification: "Certified facility managers secure high-value commercial tower contracts.",
    defaultGoal: "Grow My Business"
  },
  developer_exec: {
    id: "developer_exec",
    label: "Developer Executive",
    category: "Development",
    kpis: [
      { label: "Master Projects", field: "dealsClosed", unit: "" },
      { label: "GDV Executed", field: "transactionVolume", unit: "$M+" },
      { label: "Market Tenure", field: "yearsExp", unit: "y" },
      { label: "Key Partners", field: "happyClients", unit: "+" }
    ],
    proofTitle: "Verified Master Development Milestones",
    whyExperience: "Leading development executives demonstrate strategic GDV growth and urban vision.",
    whyProof: "Show investors and joint venture partners your masterplan delivery milestones.",
    whyVerification: "Verified development leaders command board-level respect and investor confidence.",
    defaultGoal: "Get Hired"
  },
  interior_designer: {
    id: "interior_designer",
    label: "Interior Designer",
    category: "Design & Planning",
    kpis: [
      { label: "Spaces Styled", field: "dealsClosed", unit: "" },
      { label: "Luxury Budget", field: "transactionVolume", unit: "$M+" },
      { label: "Design Awards", field: "yearsExp", unit: "" },
      { label: "5-Star Ratings", field: "happyClients", unit: "+" }
    ],
    proofTitle: "Verified Before & After Interior Transformations",
    whyExperience: "Luxury homeowners and hotel groups hire designers based on verified space transformations.",
    whyProof: "Show high-net-worth clients your verified interior case studies and press features.",
    whyVerification: "Certified interior designers earn 30% higher project fees.",
    defaultGoal: "Showcase My Expertise"
  },
  marketing_bd: {
    id: "marketing_bd",
    label: "Marketing & Business Development",
    category: "Growth & Strategy",
    kpis: [
      { label: "Launches Led", field: "dealsClosed", unit: "" },
      { label: "Sales Generated", field: "transactionVolume", unit: "$M+" },
      { label: "Lead Growth", field: "yearsExp", unit: "%" },
      { label: "Brand Partnerships", field: "happyClients", unit: "+" }
    ],
    proofTitle: "Verified Campaign Growth & Sales Impact",
    whyExperience: "Real estate brands hire growth leaders who deliver measurable revenue velocity.",
    whyProof: "Show developer boards your verified launch campaigns and lead conversion stats.",
    whyVerification: "Verified marketing directors attract top-tier agency and corporate roles.",
    defaultGoal: "Get Hired"
  }
};

export const USER_GOALS = [
  { id: "grow_business", label: "Grow My Business", icon: "📈", description: "Generate qualified client inquiries & high-value contracts." },
  { id: "get_hired", label: "Get Hired / Career Growth", icon: "👔", description: "Attract executive recruiters, developers, and corporate employers." },
  { id: "build_reputation", label: "Build My Reputation", icon: "⭐", description: "Establish undisputed authority in your niche and market." },
  { id: "win_partnerships", label: "Win Better Partnerships", icon: "🤝", description: "Connect with investors, joint ventures, and developer partners." },
  { id: "increase_visibility", label: "Increase My Visibility", icon: "🌍", description: "Stand out across the international real estate ecosystem." },
  { id: "showcase_expertise", label: "Showcase My Expertise", icon: "💼", description: "Turn your years of hard work into an audited proof portfolio." }
];
