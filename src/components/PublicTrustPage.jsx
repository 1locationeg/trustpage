import React, { useState } from 'react';
import { 
  ShieldCheck, Award, MapPin, Briefcase, Star, CheckCircle2, 
  TrendingUp, Share2, Download, ExternalLink, Phone, Mail, MessageSquare, 
  Calendar, Check, Lock, ChevronRight, Sparkles, AlertCircle, Eye, FileText, 
  Video, Layers, Zap, ArrowUpRight, Copy, QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import ProofModal from './ProofModal';
import { PROFESSIONS_DICT } from '../data/professionTemplates';

export default function PublicTrustPage({ profile, onBackToBuilder }) {
  const [selectedProof, setSelectedProof] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeProf = PROFESSIONS_DICT[profile.professionId || 'broker'] || PROFESSIONS_DICT.broker;

  const {
    name = "Ahmed Hassan",
    title = activeProf.label,
    company = "Independent Studio",
    photo,
    specializations = [],
    locations = [],
    languages = ["English", "Arabic"],
    trustScore = 94,
    buyerConfidenceScore = 94,
    confidenceLevel = "Excellent",
    riskLevel = "Low",
    dealsClosed = 142,
    transactionVolume = "$145M+",
    yearsExp = 9,
    happyClients = 120,
    avgResponseTime = "< 12 mins",
    whatsapp = "+201001234567",
    phone = "+201001234567",
    email = "contact@r8estate.com",
    promise = activeProf.whyExperience,
    methodology = activeProf.whyProof,
    verifications = [],
    expertiseMatrix = [],
    results = [],
    proofItems = [],
    reviews = [],
    awards = [],
    opportunityScore = 92,
    hiringReadiness = 88,
    authorityStatus = "Recognized Specialist"
  } = profile;

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 pb-24 selection:bg-[#D4AF37]/30 selection:text-[#F3C66B]">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0E1422]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 font-bold text-[#D4AF37] font-heading text-lg">
              <ShieldCheck className="w-5 h-5" />
              <span>R8ESTATE</span>
            </div>
            <span className="hidden sm:inline text-xs text-slate-500 border-l border-slate-700 pl-3">
              {activeProf.label} — Decision Intelligence Memo
            </span>
          </div>

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

      {/* Main Decision Infrastructure Screens */}
      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-12">

        {/* SCREEN 1: HERO */}
        <section id="screen-1" className="glass-card-gold rounded-3xl p-6 md:p-10 border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-tr from-[#D4AF37] via-[#F3C66B] to-[#1E293B] shadow-2xl">
                  <img
                    src={photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                    alt={name}
                    className="w-full h-full rounded-full object-cover border-4 border-[#0A0D14]"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Verified Professional
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#F3C66B] border border-[#D4AF37]/40 font-semibold">
                  {authorityStatus}
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

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 font-heading transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect Directly</span>
                </a>
                <a
                  href="#screen-11"
                  className="px-5 py-3 bg-gradient-to-r from-[#D4AF37] via-[#F3C66B] to-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center space-x-2 font-heading transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* SCREEN 2: VERIFICATION CENTER */}
        <section id="screen-2" className="glass-card rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">VERIFICATION CENTER</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-0.5">Why should I trust this professional?</h2>
            <p className="text-xs text-slate-400">Independent credentials and regulatory verifications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifications.map((v, i) => (
              <div key={i} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-start justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-bold text-white text-sm">{v.title}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] pl-6">Source: {v.source}</div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                  100% Verified
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SCREEN 4: ADAPTIVE TRACK RECORD */}
        <section id="screen-4" className="glass-card-gold rounded-3xl p-6 md:p-8 border border-[#D4AF37]/30 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">TRACK RECORD & METRICS</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-0.5">Has this person actually done this?</h2>
            <p className="text-xs text-slate-400">Verified performance metrics tailored for {activeProf.label}.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold text-white font-heading">{dealsClosed}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{activeProf.kpis[0].label}</div>
            </div>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold text-[#F3C66B] font-heading">{transactionVolume}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{activeProf.kpis[1].label}</div>
            </div>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold text-white font-heading">{yearsExp}y</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{activeProf.kpis[2].label}</div>
            </div>
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold text-emerald-400 font-heading">{happyClients}</div>
              <div className="text-xs text-slate-400 font-medium mt-1">{activeProf.kpis[3].label}</div>
            </div>
          </div>
        </section>

        {/* SCREEN 6: PROOF CENTER */}
        <section id="screen-6" className="glass-card-gold rounded-3xl p-6 md:p-8 border border-[#D4AF37]/50 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>PROOF CENTER • {activeProf.proofTitle.toUpperCase()}</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-heading">Can I verify these results?</h2>
              <p className="text-xs text-slate-300">Click any record to inspect the audited evidence level.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proofItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProof(item)}
                className="group p-5 bg-[#0E1422] rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer space-y-3"
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
                  <span>View Audited Proof Record</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SCREEN 10: INTELLIGENCE ENGINE */}
        <section id="screen-10" className="glass-card-gold rounded-3xl p-6 md:p-10 border border-[#D4AF37]/50 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center space-x-1.5 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F3C66B] px-3.5 py-1 rounded-full text-xs font-bold uppercase font-heading">
            <Sparkles className="w-4 h-4" />
            <span>DECISION INTELLIGENCE REPORT</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white font-heading">
            Professional Decision Score: <span className="gold-gradient-text">{trustScore}/100</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs">
            <div className="p-4 bg-[#0E1422] rounded-2xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Opportunity Rating</div>
              <div className="text-2xl font-bold text-emerald-400 font-heading">{opportunityScore}/100</div>
            </div>
            <div className="p-4 bg-[#0E1422] rounded-2xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Hiring Readiness</div>
              <div className="text-2xl font-bold text-[#F3C66B] font-heading">{hiringReadiness}%</div>
            </div>
            <div className="p-4 bg-[#0E1422] rounded-2xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Decision Risk</div>
              <div className="text-2xl font-bold text-white font-heading">Low ({riskLevel})</div>
            </div>
          </div>
        </section>

      </main>

      {selectedProof && (
        <ProofModal proofItem={selectedProof} onClose={() => setSelectedProof(null)} />
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm glass-card-gold rounded-3xl p-6 border border-[#D4AF37]/50 text-center text-slate-100 shadow-2xl space-y-4">
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            <h3 className="text-xl font-bold text-white font-heading">Share Verified Identity</h3>
            <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
              <QRCodeSVG value={window.location.href} size={160} />
            </div>
            <button onClick={handleCopyShareLink} className="w-full py-2.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl font-heading">
              {copiedLink ? "Copied!" : "Copy Profile Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
