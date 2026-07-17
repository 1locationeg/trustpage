import React, { useState } from 'react';
import { 
  ShieldCheck, Award, MapPin, Briefcase, Star, CheckCircle2, 
  TrendingUp, Share2, Download, ExternalLink, Phone, Mail, MessageSquare, 
  Calendar, Check, Lock, ChevronRight, Sparkles, AlertCircle, Eye, FileText, 
  Video, Layers, Zap, ArrowUpRight, Copy, QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import ProofModal from './ProofModal';

export default function PublicTrustPage({ profile, onBackToBuilder }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProof, setSelectedProof] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    name = "Ahmed Hassan",
    title = "Senior Off-Plan & Investment Specialist",
    company = "Independent Professional",
    photo,
    specializations = [],
    locations = [],
    languages = [],
    trustScore = 94,
    buyerConfidenceScore = 94,
    confidenceLevel = "Excellent",
    riskLevel = "Low",
    dealsClosed = 142,
    transactionVolume = "$145M+",
    yearsExp = 9,
    projectsSold = 37,
    happyClients = 120,
    avgResponseTime = "< 12 mins",
    whatsapp = "+201001234567",
    phone = "+201001234567",
    email = "ahmed.hassan@r8estate.com",
    promise,
    methodology,
    verifications = [],
    expertiseMatrix = [],
    results = [],
    proofItems = [],
    reviews = [],
    awards = [],
    memberships = [],
    mediaMentions = [],
    intelligenceScores = {}
  } = profile;

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 pb-24 selection:bg-[#D4AF37]/30 selection:text-[#F3C66B]">
      
      {/* Sticky Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#0E1422]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 font-bold text-[#D4AF37] font-heading text-lg">
              <ShieldCheck className="w-5 h-5" />
              <span>R8ESTATE</span>
            </div>
            <span className="hidden sm:inline text-xs text-slate-500 border-l border-slate-700 pl-3">
              Decision Infrastructure Profile
            </span>
          </div>

          {/* Nav Section Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-semibold">
            {[
              { id: 'screen-1', label: 'Overview' },
              { id: 'screen-2', label: 'Trust' },
              { id: 'screen-3', label: 'Expertise' },
              { id: 'screen-4', label: 'Track Record' },
              { id: 'screen-6', label: 'Proof Center' },
              { id: 'screen-7', label: 'Reviews' },
              { id: 'screen-10', label: 'Intelligence' },
              { id: 'screen-11', label: 'Contact' },
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="px-3 py-1.5 text-slate-300 hover:text-[#F3C66B] transition-all rounded-lg hover:bg-slate-800/60"
              >
                {tab.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={onBackToBuilder}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-all"
            >
              Edit in Builder
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="px-3 py-1.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-[#F3C66B] transition-all shadow-md flex items-center gap-1 font-heading"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Page</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-12">

        {/* ==================== SCREEN 1: HERO ==================== */}
        <section id="screen-1" className="glass-card-gold rounded-3xl p-6 md:p-10 border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Avatar Column */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-tr from-[#D4AF37] via-[#F3C66B] to-[#1E293B] shadow-2xl">
                  <img
                    src={photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                    alt={name}
                    className="w-full h-full rounded-full object-cover border-4 border-[#0A0D14]"
                  />
                </div>
                <div className="absolute -bottom-2 -right-1 bg-[#0A0D14] p-1.5 rounded-full shadow-lg">
                  <div className="bg-[#D4AF37] text-slate-950 px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 font-heading">
                    <Award className="w-3.5 h-3.5" />
                    <span>GOLD VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              {languages.length > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <span>Languages:</span>
                  <span className="text-slate-200 font-semibold">{languages.join(", ")}</span>
                </div>
              )}
            </div>

            {/* Identity Info Column */}
            <div className="md:col-span-8 space-y-4">
              
              {/* Microcopy Pill */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Verified Professional
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Trusted by Real Clients
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#F3C66B] border border-[#D4AF37]/40 font-semibold">
                  Buyer Confidence High ({buyerConfidenceScore}/100)
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
                {name}
              </h1>

              <p className="text-base text-[#F3C66B] font-semibold">
                {title}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                  {company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  {locations.join(" • ")}
                </span>
              </div>

              {/* Specializations Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {specializations.map((s) => (
                  <span key={s} className="px-3 py-1 bg-slate-900/80 text-slate-200 text-xs rounded-lg border border-slate-800 font-medium">
                    {s}
                  </span>
                ))}
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 font-heading transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Directly</span>
                </a>
                <a
                  href="#screen-11"
                  className="px-5 py-3 bg-gradient-to-r from-[#D4AF37] via-[#F3C66B] to-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 font-heading transition-all hover:brightness-110"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Strategy Call</span>
                </a>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== SCREEN 2: VERIFICATION CENTER ==================== */}
        <section id="screen-2" className="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 2 • VERIFICATION CENTER</span>
              <h2 className="text-2xl font-bold text-white font-heading mt-0.5">Why should I trust this person?</h2>
              <p className="text-xs text-slate-400">Multi-source independent verification audit records.</p>
            </div>
            <div className="mt-2 md:mt-0 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl font-heading">
              VERIFIED STATUS: {verificationLevel.toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifications.map((v, i) => (
              <div key={i} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-start justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold text-white text-sm">{v.title}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] pl-6">Source: <strong className="text-slate-300">{v.source}</strong></div>
                  <div className="text-slate-500 text-[10px] pl-6">Verified: {v.date}</div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                  {v.confidence}% Confidence
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SCREEN 3: EXPERTISE MATRIX ==================== */}
        <section id="screen-3" className="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 3 • EXPERTISE MATRIX</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-0.5">Is this person qualified?</h2>
            <p className="text-xs text-slate-400">Core market focus and property specialization breakdown.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {expertiseMatrix.map((exp, i) => (
              <div key={i} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white text-sm font-heading">{exp.title}</h3>
                  <span className="text-xs font-bold text-[#F3C66B]">{exp.confidence}% Score</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Experience: <strong className="text-slate-200">{exp.years} Years</strong></span>
                  <span>Projects: <strong className="text-slate-200">{exp.projects} Completed</strong></span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-[#D4AF37] to-[#F3C66B] h-1.5 rounded-full" style={{ width: `${exp.confidence}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SCREEN 4: TRACK RECORD ==================== */}
        <section id="screen-4" className="glass-card-gold rounded-3xl p-6 md:p-8 border border-[#D4AF37]/30 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 4 • TRACK RECORD</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-0.5">Has this person actually done this?</h2>
            <p className="text-xs text-slate-400">Verified transaction metrics and developer relationship stats.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold text-white font-heading">{dealsClosed}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Deals Closed</div>
              <div className="text-[10px] text-emerald-400 mt-1">Verified Escrow</div>
            </div>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold text-[#F3C66B] font-heading">{transactionVolume}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Transaction Volume</div>
              <div className="text-[10px] text-emerald-400 mt-1">Audited Volume</div>
            </div>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold text-white font-heading">{yearsExp} Yrs</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Market Experience</div>
              <div className="text-[10px] text-slate-400 mt-1">Continuous Active</div>
            </div>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold text-emerald-400 font-heading">{avgResponseTime}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Avg Response Time</div>
              <div className="text-[10px] text-emerald-400 mt-1">Instant Direct SLA</div>
            </div>
          </div>
        </section>

        {/* ==================== SCREEN 5: RESULTS ==================== */}
        <section id="screen-5" className="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 5 • MEASURABLE RESULTS</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-0.5">Did clients actually benefit?</h2>
            <p className="text-xs text-slate-400">Outcome-focused metrics detailing tangible financial gains for buyers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((res, i) => (
              <div key={i} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-extrabold text-[#F3C66B] font-heading">{res.metric}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">Verified Outcome</span>
                </div>
                <h3 className="font-bold text-white text-sm">{res.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{res.description}</p>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#D4AF37]" />
                  Evidence: {res.evidence}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SCREEN 6: PROOF CENTER (MOAT Differentiator) ==================== */}
        <section id="screen-6" className="glass-card-gold rounded-3xl p-6 md:p-8 border border-[#D4AF37]/50 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>SCREEN 6 • PROOF CENTER (BIGGEST DIFFERENTIATOR)</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-heading">Can I verify those results?</h2>
              <p className="text-xs text-slate-300">Click any transaction to open the audited evidence record.</p>
            </div>
            <div className="mt-2 md:mt-0 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F3C66B] text-xs font-bold rounded-xl font-heading">
              3 AUDITED PROOF RECORDS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proofItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProof(item)}
                className="group p-5 bg-[#0E1422] rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer space-y-3 relative overflow-hidden"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#F3C66B] bg-[#D4AF37]/10 px-2 py-0.5 rounded-md border border-[#D4AF37]/30 uppercase">
                    {item.type}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400">{item.confidence}% Match</span>
                </div>

                <h3 className="font-bold text-white text-sm font-heading group-hover:text-[#F3C66B] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">{item.details}</p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[#D4AF37] font-semibold border-t border-slate-800">
                  <span>View Verified Record</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SCREEN 7: REVIEWS ==================== */}
        <section id="screen-7" className="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 7 • REVIEWS & TESTIMONIALS</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-0.5">What do other people say?</h2>
            <p className="text-xs text-slate-400">Independent investor, homebuyer, and developer executive endorsements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-sm font-heading">{rev.author}</h3>
                    <p className="text-[11px] text-slate-400">{rev.role}</p>
                  </div>
                  <span className="text-[#D4AF37] text-xs font-bold">★★★★★</span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">"{rev.comment}"</p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {rev.badge}
                  </span>
                  <span className="text-slate-500">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SCREEN 8: DIFFERENTIATION ==================== */}
        <section id="screen-8" className="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 8 • DIFFERENTIATION</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-0.5">Why choose this professional?</h2>
            <p className="text-xs text-slate-400">Core advisory philosophy, methodology, and client commitment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-sm font-heading text-[#F3C66B]">Advisory Promise</h3>
              <p className="text-slate-300 leading-relaxed">{promise}</p>
            </div>
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-sm font-heading text-[#F3C66B]">3-Tier Audit Methodology</h3>
              <p className="text-slate-300 leading-relaxed">{methodology}</p>
            </div>
          </div>
        </section>

        {/* ==================== SCREEN 9: RECOGNITION ==================== */}
        <section id="screen-9" className="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 9 • RECOGNITION & MEMBERSHIPS</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-0.5">Industry Standing & Credentials</h2>
            <p className="text-xs text-slate-400">Awards, official association memberships, and media commentary.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awards.map((aw, i) => (
              <div key={i} className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl flex items-center space-x-3 text-xs">
                <Award className="w-6 h-6 text-[#D4AF37] shrink-0" />
                <div>
                  <div className="font-bold text-white text-sm">{aw.title}</div>
                  <div className="text-slate-400 text-[11px]">{aw.issuer} • {aw.year}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SCREEN 10: INTELLIGENCE LAYER ==================== */}
        <section id="screen-10" className="glass-card-gold rounded-3xl p-6 md:p-10 border border-[#D4AF37]/50 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-1.5 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F3C66B] px-3.5 py-1 rounded-full text-xs font-bold uppercase font-heading">
              <Sparkles className="w-4 h-4" />
              <span>SCREEN 10 • R8ESTATE INTELLIGENCE ENGINE (PRODUCT MOAT)</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white font-heading">
              Professional Decision Intelligence
            </h2>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              Synthesizing transaction history, buyer reviews, verification records, and response rates into an objective confidence score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Score Radial Gauge */}
            <div className="p-6 bg-[#0E1422] rounded-3xl border border-slate-800 text-center space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase">Buyer Confidence Score</div>
              <div className="text-5xl font-extrabold text-white font-heading gold-gradient-text">
                {trustScore}
                <span className="text-lg text-slate-500">/100</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Level: {confidenceLevel} ★★★
              </div>
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                Risk Rating: <strong className="text-emerald-400">Low ({riskLevel})</strong>
              </div>
            </div>

            {/* Sub Scores Grid */}
            <div className="md:col-span-2 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Authority Score</div>
                <div className="text-xl font-bold text-white font-heading">96/100</div>
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Market Expertise</div>
                <div className="text-xl font-bold text-[#F3C66B] font-heading">98/100</div>
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Negotiation Score</div>
                <div className="text-xl font-bold text-white font-heading">95/100</div>
              </div>
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Visibility Index</div>
                <div className="text-xl font-bold text-white font-heading">91/100</div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SCREEN 11: CONTACT & CONVERSION ==================== */}
        <section id="screen-11" className="glass-card rounded-3xl p-6 md:p-10 border border-slate-800 text-center space-y-6">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 11 • CONTACT & CONVERT</span>
            <h2 className="text-3xl font-bold text-white font-heading mt-1">Make a Confident Decision Today</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">Connect directly via WhatsApp, book a private consultation, or save the verified contact card.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-center space-x-2 font-heading transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-2xl border border-slate-700 shadow-lg flex items-center justify-center space-x-2 font-heading transition-all"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Professional</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-2xl border border-slate-700 shadow-lg flex items-center justify-center space-x-2 font-heading transition-all"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>Send Private Email</span>
            </a>
          </div>
        </section>

        {/* ==================== SCREEN 12: VIRAL ENGINE ==================== */}
        <section id="screen-12" className="glass-card-gold rounded-3xl p-6 md:p-8 border border-[#D4AF37]/40 text-center space-y-6">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">SCREEN 12 • VIRAL SHARING ENGINE</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">Share & Recommend This Trust Page</h2>
            <p className="text-xs text-slate-300">Help colleagues and buyers make safer real estate decisions.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyShareLink}
              className="py-2.5 px-5 bg-slate-900 border border-slate-700 hover:border-[#D4AF37] text-slate-200 font-semibold text-xs rounded-xl flex items-center space-x-2"
            >
              <Copy className="w-4 h-4 text-[#D4AF37]" />
              <span>{copiedLink ? "Link Copied!" : "Copy Share Link"}</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="py-2.5 px-5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-[#F3C66B] flex items-center space-x-2 font-heading"
            >
              <QrCode className="w-4 h-4" />
              <span>View QR & Trust Card</span>
            </button>
          </div>
        </section>

      </main>

      {/* Proof Audit Modal */}
      {selectedProof && (
        <ProofModal proofItem={selectedProof} onClose={() => setSelectedProof(null)} />
      )}

      {/* Viral Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm glass-card-gold rounded-3xl p-6 border border-[#D4AF37]/50 text-center text-slate-100 shadow-2xl space-y-4">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white font-heading">Share Trust Page</h3>
            <p className="text-xs text-slate-300">Scan QR Code or copy link to share verified profile.</p>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
              <QRCodeSVG value={window.location.href} size={160} />
            </div>

            <div className="pt-2">
              <button
                onClick={handleCopyShareLink}
                className="w-full py-2.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-[#F3C66B] transition-all font-heading"
              >
                {copiedLink ? "Link Copied to Clipboard!" : "Copy Profile URL"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Floating Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0E1422]/95 backdrop-blur-lg border-t border-slate-800 p-2 flex justify-around text-[10px] text-slate-400 font-medium z-40">
        <a href="#screen-1" className="flex flex-col items-center p-1 text-[#F3C66B]">
          <ShieldCheck className="w-4 h-4" />
          <span>Overview</span>
        </a>
        <a href="#screen-2" className="flex flex-col items-center p-1 hover:text-white">
          <CheckCircle2 className="w-4 h-4" />
          <span>Trust</span>
        </a>
        <a href="#screen-6" className="flex flex-col items-center p-1 hover:text-white">
          <Lock className="w-4 h-4" />
          <span>Proof</span>
        </a>
        <a href="#screen-10" className="flex flex-col items-center p-1 hover:text-white">
          <Sparkles className="w-4 h-4" />
          <span>Insights</span>
        </a>
        <a href="#screen-11" className="flex flex-col items-center p-1 hover:text-white">
          <MessageSquare className="w-4 h-4" />
          <span>Contact</span>
        </a>
      </div>

    </div>
  );
}
