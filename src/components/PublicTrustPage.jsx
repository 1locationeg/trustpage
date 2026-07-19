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
    <div id="public-trust-page-container" className="min-h-screen bg-[#FAFAF9] text-[#111827] pb-24 selection:bg-[#0A3D62]/10 selection:text-[#0A3D62]">
      
      {/* Top Header */}
      <header id="public-header" className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 font-bold text-[#0A3D62] font-heading text-lg">
              <ShieldCheck className="w-5 h-5" />
              <span>R8ESTATE</span>
            </div>
            <span className="hidden sm:inline text-xs text-gray-500 border-l border-gray-200 pl-3 font-medium">
              {activeProf.label} — Decision Intelligence Memo
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-edit-builder"
              onClick={onBackToBuilder}
              className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-300 transition-all"
            >
              Edit in Builder
            </button>
            <button
              id="btn-share-page"
              onClick={() => setShowShareModal(true)}
              className="px-3.5 py-1.5 bg-[#FAC417] text-slate-900 font-semibold text-xs rounded-full hover:bg-[#E5B210] transition-all shadow-sm flex items-center gap-1 font-heading"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Page</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Decision Infrastructure */}
      <main id="public-main-content" className="max-w-5xl mx-auto px-4 pt-6 space-y-8">

        {/* SCREEN 1: HERO */}
        <section id="public-screen-1" className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-2">
                <div className="w-36 h-36 rounded-full p-1 bg-gray-200 shadow-md">
                  <img
                    src={photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                    alt={name}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Verified Professional
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200 font-medium">
                  {authorityStatus}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#0A3D62] font-heading tracking-tight">
                {name}
              </h1>

              <p className="text-base text-gray-700 font-medium">
                {title}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-[#0A3D62]" />
                  {company}
                </span>
                {locations?.length > 0 && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#0A3D62]" />
                    {locations.join(" • ")}
                  </span>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-full shadow-sm flex items-center space-x-2 font-heading transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect Directly</span>
                </a>
                <a
                  href="#screen-2"
                  className="px-5 py-2.5 bg-[#FAC417] text-slate-900 font-semibold text-xs rounded-full hover:bg-[#E5B210] transition-all shadow-sm flex items-center space-x-2 font-heading"
                >
                  <Calendar className="w-4 h-4" />
                  <span>View Credentials</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* SCREEN 2: VERIFICATION CENTER */}
        <section id="screen-2" className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">VERIFICATION CENTER</span>
            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-0.5">Why should I trust this professional?</h2>
            <p className="text-sm text-gray-600">Independent credentials and regulatory verifications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifications.map((v, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-start justify-between text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-gray-900 text-sm">{v.title}</span>
                  </div>
                  <div className="text-gray-500 text-xs pl-6">Source: {v.source}</div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SCREEN 4: ADAPTIVE TRACK RECORD */}
        <section id="screen-4" className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">TRACK RECORD & METRICS</span>
            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-0.5">Has this person actually done this?</h2>
            <p className="text-sm text-gray-600">Verified performance metrics tailored for {activeProf.label}.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-[#0A3D62] font-heading">{dealsClosed}</div>
              <div className="text-xs text-gray-600 font-medium mt-1">{activeProf.kpis[0].label}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 font-heading">{transactionVolume}</div>
              <div className="text-xs text-gray-600 font-medium mt-1">{activeProf.kpis[1].label}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-[#0A3D62] font-heading">{yearsExp}y</div>
              <div className="text-xs text-gray-600 font-medium mt-1">{activeProf.kpis[2].label}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-emerald-700 font-heading">{happyClients}</div>
              <div className="text-xs text-gray-600 font-medium mt-1">{activeProf.kpis[3].label}</div>
            </div>
          </div>
        </section>

        {/* SCREEN 6: PROOF CENTER */}
        <section id="screen-6" className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-[#0A3D62]" />
                <span>PROOF CENTER • {activeProf.proofTitle.toUpperCase()}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-heading">Can I verify these results?</h2>
              <p className="text-sm text-gray-600">Click any record to inspect the audited evidence level.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proofItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProof(item)}
                className="group p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#0A3D62] transition-all cursor-pointer space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#0A3D62] bg-gray-200 px-2 py-0.5 rounded uppercase">
                    {item.type}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">{item.confidence}% Match</span>
                </div>

                <h3 className="font-bold text-gray-900 text-sm font-heading group-hover:text-[#0A3D62] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2">{item.details}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-[#0A3D62] font-semibold border-t border-gray-200">
                  <span>View Audited Proof Record</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SCREEN 10: INTELLIGENCE ENGINE */}
        <section id="screen-10" className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm text-center space-y-6">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            DECISION INTELLIGENCE REPORT
          </span>

          <h2 className="text-3xl font-bold text-[#0A3D62] font-heading">
            Professional Decision Score: {trustScore}/100
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-gray-500 text-xs">Opportunity Rating</div>
              <div className="text-2xl font-bold text-emerald-700 font-heading">{opportunityScore}/100</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-gray-500 text-xs">Hiring Readiness</div>
              <div className="text-2xl font-bold text-[#0A3D62] font-heading">{hiringReadiness}%</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-gray-500 text-xs">Decision Risk</div>
              <div className="text-2xl font-bold text-gray-900 font-heading">Low ({riskLevel})</div>
            </div>
          </div>
        </section>

      </main>

      {selectedProof && (
        <ProofModal proofItem={selectedProof} onClose={() => setSelectedProof(null)} />
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-xl p-6 border border-gray-200 text-center text-gray-900 shadow-xl space-y-4">
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
            <h3 className="text-lg font-bold text-[#0A3D62] font-heading">Share Verified Identity</h3>
            <div className="p-4 bg-white border border-gray-200 rounded-xl inline-block shadow-sm mx-auto">
              <QRCodeSVG value={window.location.href} size={160} />
            </div>
            <button onClick={handleCopyShareLink} className="w-full py-2.5 bg-[#FAC417] text-slate-900 font-semibold text-xs rounded-full font-heading">
              {copiedLink ? "Copied!" : "Copy Profile Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
