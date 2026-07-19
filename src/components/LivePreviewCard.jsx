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
    <div id="live-preview-card-container" className="relative w-full max-w-sm mx-auto">
      {/* Card Body */}
      <div id="live-preview-card-body" className="bg-white rounded-xl p-5 border border-gray-200 text-gray-900 shadow-sm overflow-hidden transition-all duration-300">
        
        {/* Header Ribbon / Status */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#0A3D62]">
            <ShieldCheck className="w-4 h-4 text-[#0A3D62]" />
            <span>R8ESTATE TRUST CARD</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>LIVE PREVIEW</span>
          </div>
        </div>

        {/* Avatar & Verification Ring */}
        <div className="relative flex flex-col items-center mb-4 text-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full p-0.5 bg-gray-200 shadow-sm">
              <img
                src={photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                alt={name}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
              <div className="bg-[#0A3D62] text-white p-1 rounded-full font-bold" title={`Verified Level: ${verificationLevel}`}>
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-[#0A3D62] font-heading flex items-center justify-center gap-1.5">
            {name || "Your Name"}
            <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
          </h3>

          <p className="text-xs text-gray-700 font-medium mt-0.5">
            {specializations[0] || title}
          </p>

          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-gray-400" />
            {company || "Independent Studio"}
          </p>

          {locations?.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-600 mt-2 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
              <MapPin className="w-3.5 h-3.5 text-[#0A3D62]" />
              <span>{locations.slice(0, 3).join(" • ")}</span>
            </div>
          )}
        </div>

        {/* OUTCOME METRICS ENGINE */}
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-[#0A3D62]" />
              <span className="font-semibold text-gray-800">Opportunity Score</span>
            </div>
            <span className="font-bold text-[#0A3D62] font-heading">{opportunityScore}/100</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#0A3D62] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${opportunityScore}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-500 pt-1">
            <span>Hiring Readiness: <strong className="text-emerald-700">{hiringReadiness}%</strong></span>
            <span className="text-right">Referrals: <strong className="text-[#0A3D62]">{referralPotential}</strong></span>
          </div>
        </div>

        {/* Profession-Adaptive KPIs */}
        <div className="grid grid-cols-4 gap-1 text-center bg-gray-50 rounded-lg p-2 border border-gray-200 mb-4">
          <div className="p-1">
            <div className="text-xs font-bold text-gray-900 font-heading">{dealsClosed}</div>
            <div className="text-[10px] text-gray-500 truncate">{activeProf.kpis[0].label}</div>
          </div>
          <div className="p-1 border-l border-gray-200">
            <div className="text-xs font-bold text-gray-900 font-heading">{transactionVolume}</div>
            <div className="text-[10px] text-gray-500 truncate">{activeProf.kpis[1].label}</div>
          </div>
          <div className="p-1 border-l border-gray-200">
            <div className="text-xs font-bold text-gray-900 font-heading">{yearsExp}y</div>
            <div className="text-[10px] text-gray-500 truncate">{activeProf.kpis[2].label}</div>
          </div>
          <div className="p-1 border-l border-gray-200">
            <div className="text-xs font-bold text-[#0A3D62] font-heading">{happyClients}</div>
            <div className="text-[10px] text-gray-500 truncate">{activeProf.kpis[3].label}</div>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Profile Completion</span>
            <span className="font-semibold text-[#0A3D62]">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-[#0A3D62] h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        {onOpenFullPage && (
          <button
            id="btn-preview-full-page"
            onClick={onOpenFullPage}
            className="w-full py-2.5 px-4 bg-[#FAC417] text-slate-900 font-semibold text-xs rounded-full hover:bg-[#E5B210] transition-all shadow-sm flex items-center justify-center space-x-2 font-heading"
          >
            <span>Preview Full Decision Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
