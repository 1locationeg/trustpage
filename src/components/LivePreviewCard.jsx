import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, MapPin, Briefcase, Star, CheckCircle2, TrendingUp, Share2, Download, ExternalLink, Zap, Lock, Clock, ThumbsUp, Users, Shield } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PROFESSIONS_DICT } from '../data/professionTemplates';
import { getFallbackPhoto } from '../data/mockProfiles';

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
    dealsClosed = 142,
    transactionVolume = "$145M+",
    yearsExp = 5,
    happyClients = 120,
    completionPercentage = 96,
    opportunityScore = 92,
    hiringReadiness = 88,
    referralPotential = "94%",
    authorityStatus = "Verified Specialist",
    avgResponseTime = "2h"
  } = profile;

  // Debounced name & title for silky smooth live updating
  const [debouncedName, setDebouncedName] = useState(name);
  const [debouncedTitle, setDebouncedTitle] = useState(title);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    const handler = setTimeout(() => {
      setDebouncedName(name || "Your Name");
      setDebouncedTitle(title || activeProf.label);
      setIsUpdating(false);
    }, 120);

    return () => clearTimeout(handler);
  }, [name, title, activeProf.label]);

  // Construct a shareable URL for the QR code
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/?profile=${profile.id || 'ahmed-hassan'}` : 'https://r8estate.com/ahmed-hassan';

  return (
    <div id="live-preview-card-container" className="relative w-full max-w-xl mx-auto">
      {/* Premium Dark Gold Trust Card Body */}
      <div 
        id="live-preview-card-body" 
        className="bg-gradient-to-br from-[#0B1329] via-[#020617] to-[#131C35] rounded-2xl p-5 border border-gold-premium text-white shadow-2xl overflow-hidden transition-all duration-300 animate-gold-glow relative"
        style={{ minHeight: '390px' }}
      >
        {/* Subtle mesh background overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,196,23,0.06),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FAC417]/20 to-transparent pointer-events-none" />

        {/* Card Header Ribbon */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 relative z-10">
          <div id="card-brand-logo" className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#FAC417]" />
            <div className="flex flex-col">
              <span className="text-[14px] font-extrabold tracking-widest text-white leading-none">TRUST CARD</span>
              <span className="text-[8px] text-[#FAC417] font-semibold tracking-wider leading-none mt-1 uppercase">REAL ESTATE PROFESSIONAL</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1.5 bg-[#FAC417]/10 text-[#FAC417] px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#FAC417]/30 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FAC417] animate-pulse" />
            <span>VERIFIED · TRUSTED · RECOMMENDED</span>
          </div>
        </div>

        {/* Profile Info Grid (Avatar, Name, Title, QR Code) */}
        <div className="grid grid-cols-12 gap-3 items-center mb-4 relative z-10">
          {/* Avatar Area */}
          <div className="col-span-3 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#FAC417] via-amber-200 to-[#FAC417]/30 shadow-md">
                <img
                  src={photo || getFallbackPhoto(debouncedName)}
                  alt={debouncedName}
                  className="w-full h-full rounded-full object-cover border border-[#020617]"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#020617] p-0.5 rounded-full border border-white/20">
                <div className="bg-[#FAC417] text-slate-900 p-0.5 rounded-full font-bold" title={`Verified: ${verificationLevel}`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
                </div>
              </div>
            </div>
          </div>

          {/* Name & Titles */}
          <div className="col-span-6 space-y-1.5 pl-1.5 text-left">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className={`text-lg font-bold text-white font-serif-premium tracking-wide transition-opacity duration-150 ${isUpdating ? 'opacity-60' : 'opacity-100'}`}>
                {debouncedName}
              </h3>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 inline shrink-0" />
            </div>

            <p className={`text-xs text-gray-300 font-medium transition-opacity duration-150 ${isUpdating ? 'opacity-60' : 'opacity-100'}`}>
              {debouncedTitle}
            </p>

            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <Briefcase className="w-3 h-3 text-[#FAC417]" />
              <span className="truncate">{company || "Emaar Misr"}</span>
              <span className="inline-flex items-center gap-1 px-1 bg-emerald-500/10 text-emerald-400 text-[8px] font-extrabold rounded uppercase border border-emerald-500/20 ml-1">
                Company Verified
              </span>
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <span className="inline-flex items-center text-[9px] font-bold bg-[#FAC417]/10 text-[#FAC417] border border-[#FAC417]/30 px-1.5 py-0.5 rounded">
                Verified Professional
              </span>
              <span className="inline-flex items-center text-[9px] font-bold bg-white/5 text-gray-300 border border-white/10 px-1.5 py-0.5 rounded">
                Elite Member
              </span>
            </div>
          </div>

          {/* QR Code Area */}
          <div className="col-span-3 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-1.5 rounded-lg shadow-sm border border-[#FAC417]/40 w-16 h-16 flex items-center justify-center">
              <QRCodeSVG 
                value={shareUrl} 
                size={54} 
                level={"H"}
                includeMargin={false}
              />
            </div>
            <span className="text-[7px] text-gray-400 mt-1 uppercase tracking-wider leading-tight">Scan to view my verified profile</span>
          </div>
        </div>

        {/* 5-Column Core Metrics Grid (Bordered Boxes) */}
        <div className="grid grid-cols-5 gap-1.5 text-center mb-4 relative z-10">
          
          {/* Trust Score */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px]">
            <div className="flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#FAC417] shrink-0" />
            </div>
            <div className="text-[12px] font-bold text-white font-heading mt-1">{trustScore}%</div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Trust Score Excellent</div>
          </div>

          {/* Deals Closed */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px]">
            <div className="flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-[#FAC417] shrink-0" />
            </div>
            <div className="text-[12px] font-bold text-white font-heading mt-1">{dealsClosed}+</div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Deals Closed This Year</div>
          </div>

          {/* Client Rating */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px]">
            <div className="flex items-center justify-center">
              <Star className="w-3.5 h-3.5 fill-[#FAC417] text-[#FAC417] shrink-0" />
            </div>
            <div className="text-[12px] font-bold text-[#FAC417] font-heading mt-1">4.9</div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Client Rating (87 Rev.)</div>
          </div>

          {/* Experience */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px]">
            <div className="flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-[#FAC417] shrink-0" />
            </div>
            <div className="text-[12px] font-bold text-white font-heading mt-1">{yearsExp}+</div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Years Exp. Local Expert</div>
          </div>

          {/* Response Time */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px]">
            <div className="flex items-center justify-center">
              <Clock className="w-3.5 h-3.5 text-[#FAC417] shrink-0" />
            </div>
            <div className="text-[12px] font-bold text-white font-heading mt-1">{avgResponseTime}</div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Avg. Response Time</div>
          </div>

        </div>

        {/* Why Clients Choose Me Section */}
        <div className="border-t border-white/5 pt-3 pb-2 relative z-10 text-left">
          <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1.5 text-center">WHY CLIENTS CHOOSE ME</div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center text-[9px] text-gray-300 font-medium">
              <ShieldCheck className="w-3 h-3 text-[#FAC417] mr-1" />
              Verified Identity
            </span>
            <span className="inline-flex items-center text-[9px] text-gray-300 font-medium">
              <ShieldCheck className="w-3 h-3 text-[#FAC417] mr-1" />
              Real Client Reviews
            </span>
            <span className="inline-flex items-center text-[9px] text-gray-300 font-medium">
              <ShieldCheck className="w-3 h-3 text-[#FAC417] mr-1" />
              Proven Results
            </span>
            <span className="inline-flex items-center text-[9px] text-gray-300 font-medium">
              <ShieldCheck className="w-3 h-3 text-[#FAC417] mr-1" />
              Data Protected
            </span>
            <span className="inline-flex items-center text-[9px] text-gray-300 font-medium">
              <ShieldCheck className="w-3 h-3 text-[#FAC417] mr-1" />
              Trusted Professional
            </span>
          </div>
        </div>

        {/* Card Footer (Avatars + R8ESTATE verification badge) */}
        <div className="border-t border-white/10 pt-3 mt-1.5 flex items-center justify-between text-[9px] text-gray-400 relative z-10">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1.5 overflow-hidden">
              <img className="inline-block h-4 w-4 rounded-full ring-1 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&auto=format&fit=crop&q=80" alt="Client 1" />
              <img className="inline-block h-4 w-4 rounded-full ring-1 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&auto=format&fit=crop&q=80" alt="Client 2" />
              <img className="inline-block h-4 w-4 rounded-full ring-1 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&auto=format&fit=crop&q=80" alt="Client 3" />
            </div>
            <span>Trusted by 100+ clients. Real reviews. Real results.</span>
          </div>

          <div className="flex items-center space-x-1 font-bold text-gray-300 uppercase tracking-wide">
            <span>Verified by</span>
            <div className="flex items-center space-x-0.5 text-white bg-white/5 border border-white/10 rounded px-1 py-0.5 leading-none">
              <span className="text-[7px] text-[#FAC417] font-extrabold font-heading">R8</span>
              <span className="text-[7px] font-medium">ESTATE</span>
            </div>
          </div>
        </div>

        {/* Action Button inside card if full page preview needed */}
        {onOpenFullPage && (
          <button
            id="btn-preview-full-page-inside-card"
            onClick={onOpenFullPage}
            className="w-full mt-4 py-2 px-4 bg-[#FAC417] text-slate-900 font-bold text-xs rounded-full hover:bg-[#E5B210] transition-all shadow-md flex items-center justify-center space-x-1.5 font-heading z-20 relative"
          >
            <span>Preview Full Decision Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}

      </div>
    </div>
  );
}
