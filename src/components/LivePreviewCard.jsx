import React from 'react';
import { ShieldCheck, Award, MapPin, Briefcase, Star, CheckCircle2, TrendingUp, Share2, Download, ExternalLink, Zap, Lock } from 'lucide-react';
import { PROFESSIONS_DICT } from '../data/professionTemplates';

export default function LivePreviewCard({ profile, onOpenFullPage }) {
  const activeProf = PROFESSIONS_DICT[profile.professionId || 'broker'] || PROFESSIONS_DICT.broker;

  const {
    name = "Your Name",
    title = activeProf.label,
    company = "Company / Studio",
    photo,
    specializations = [],
    locations = [],
    trustScore = 94,
    verificationLevel = "Gold",
    dealsClosed = 0,
    transactionVolume = "$10M+",
    yearsExp = 0,
    projectsSold = 0,
    happyClients = 0,
    completionPercentage = 20,
    opportunityScore = 85,
    hiringReadiness = 80,
    referralPotential = "90%",
    authorityStatus = "Verified Specialist"
  } = profile;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Glow Backing */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/30 via-[#F3C66B]/20 to-[#3B82F6]/30 rounded-3xl blur-xl opacity-75 animate-pulse" />

      {/* Card Body */}
      <div className="relative glass-card-gold rounded-3xl p-5 border border-[#D4AF37]/40 text-slate-100 shadow-2xl overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/70">
        
        {/* Header Ribbon / Status */}
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#F3C66B] border border-[#D4AF37]/40">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#F3C66B]" />
              R8ESTATE TRUST CARD
            </span>
          </div>
          <div className="flex items-center space-x-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE PREVIEW</span>
          </div>
        </div>

        {/* Avatar & Verification Ring */}
        <div className="relative flex flex-col items-center mb-4 text-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#F3C66B] to-[#1E293B] shadow-lg">
              <img
                src={photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                alt={name}
                className="w-full h-full rounded-full object-cover border-2 border-[#0A0D14]"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#0A0D14] p-1 rounded-full">
              <div className="bg-[#D4AF37] text-slate-950 p-1.5 rounded-full font-bold shadow-md" title={`Verified Level: ${verificationLevel}`}>
                <Award className="w-4 h-4" />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight font-heading flex items-center justify-center gap-1.5">
            {name || "Your Name"}
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/20 inline" />
          </h3>

          <p className="text-xs text-[#F3C66B] font-medium mt-0.5">
            {specializations[0] || title}
          </p>

          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-slate-400" />
            {company || "Independent Studio"}
          </p>

          {locations?.length > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-slate-300 mt-1.5 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/50">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              <span>{locations.slice(0, 3).join(" • ")}</span>
            </div>
          )}
        </div>

        {/* OUTCOME METRICS ENGINE (V2 HIGHLIGHT) */}
        <div className="bg-[#0E1422]/90 rounded-2xl p-3 border border-slate-700/60 mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-semibold text-slate-200">Opportunity Score</span>
            </div>
            <span className="font-extrabold text-[#F3C66B] font-heading">{opportunityScore}/100</span>
          </div>
          
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#D4AF37] to-emerald-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${opportunityScore}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-1">
            <span>Hiring Readiness: <strong className="text-emerald-400">{hiringReadiness}%</strong></span>
            <span className="text-right">Referrals: <strong className="text-[#F3C66B]">{referralPotential}</strong></span>
          </div>
        </div>

        {/* Profession-Adaptive KPIs */}
        <div className="grid grid-cols-4 gap-1 text-center bg-slate-900/80 rounded-xl p-2 border border-slate-800 mb-4">
          <div className="p-1">
            <div className="text-xs font-bold text-white font-heading">{dealsClosed}</div>
            <div className="text-[9px] text-slate-400 truncate">{activeProf.kpis[0].label}</div>
          </div>
          <div className="p-1 border-l border-slate-800">
            <div className="text-xs font-bold text-white font-heading">{transactionVolume}</div>
            <div className="text-[9px] text-slate-400 truncate">{activeProf.kpis[1].label}</div>
          </div>
          <div className="p-1 border-l border-slate-800">
            <div className="text-xs font-bold text-white font-heading">{yearsExp}y</div>
            <div className="text-[9px] text-slate-400 truncate">{activeProf.kpis[2].label}</div>
          </div>
          <div className="p-1 border-l border-slate-800">
            <div className="text-xs font-bold text-[#F3C66B] font-heading">{happyClients}</div>
            <div className="text-[9px] text-slate-400 truncate">{activeProf.kpis[3].label}</div>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-[11px] text-slate-300 mb-1">
            <span>Profile Completion</span>
            <span className="font-semibold text-[#D4AF37]">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <div
              className="bg-[#D4AF37] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        {onOpenFullPage && (
          <button
            onClick={onOpenFullPage}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#D4AF37] via-[#F3C66B] to-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 transition-all shadow-lg flex items-center justify-center space-x-2 font-heading"
          >
            <span>Preview Full Decision Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
