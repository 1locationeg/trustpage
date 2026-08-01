import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, MapPin, Briefcase, Star, CheckCircle2, TrendingUp, Share2, Download, ExternalLink, Zap, Lock, Clock, ThumbsUp, Users, Shield } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PROFESSIONS_DICT } from '../data/professionTemplates';
import { getFallbackPhoto } from '../data/mockProfiles';

// Helper component to animate counting statistics
function AnimatedCounter({ value, duration = 1200, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stringVal = String(value);
    const num = parseInt(stringVal.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = num;
    const isVolume = stringVal.includes("$") || stringVal.includes("M") || stringVal.includes("+");
    const prefix = stringVal.startsWith("$") ? "$" : "";
    const originalSuffix = stringVal.endsWith("+") ? "+" : (stringVal.endsWith("M+") ? "M+" : (stringVal.endsWith("M") ? "M" : suffix));

    let timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        clearInterval(timer);
        setCount(prefix + end + originalSuffix);
      } else {
        setCount(prefix + start + originalSuffix);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export default function LivePreviewCard({ profile, onOpenFullPage, theme = 'gold' }) {
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

  // Theme-specific CSS styling classes
  const themeConfigs = {
    gold: {
      gradient: "from-[#0B1329] via-[#020617] to-[#131C35]",
      border: "border-[#FAC417]/50",
      accent: "#FAC417",
      accentText: "text-[#FAC417]",
      bgAccent: "bg-[#FAC417]/10",
      borderAccent: "border-[#FAC417]/30",
      glow: "animate-gold-glow",
      fillAccent: "fill-[#FAC417]",
    },
    silver: {
      gradient: "from-[#0F172A] via-[#0B0F19] to-[#1E293B]",
      border: "border-slate-400/40",
      accent: "#94A3B8",
      accentText: "text-slate-300",
      bgAccent: "bg-slate-400/10",
      borderAccent: "border-slate-400/30",
      glow: "animate-silver-glow",
      fillAccent: "fill-slate-300",
    },
    emerald: {
      gradient: "from-[#064E3B] via-[#022C22] to-[#0D5C46]",
      border: "border-emerald-500/40",
      accent: "#10B981",
      accentText: "text-emerald-400",
      bgAccent: "bg-emerald-500/10",
      borderAccent: "border-emerald-500/30",
      glow: "animate-emerald-glow",
      fillAccent: "fill-emerald-400",
    }
  };

  const tc = themeConfigs[theme] || themeConfigs.gold;

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
      {/* Dynamic Trust Card Body */}
      <div 
        id="live-preview-card-body" 
        className={`bg-gradient-to-br ${tc.gradient} rounded-2xl p-4 sm:p-5 border ${tc.border} text-white shadow-2xl overflow-hidden transition-all duration-300 ${tc.glow} relative min-h-[325px] sm:min-h-[390px]`}
      >
        {/* Subtle mesh background overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,196,23,0.06),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FAC417]/20 to-transparent pointer-events-none" />

        {/* Card Header Ribbon */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5 sm:pb-3 sm:mb-4 relative z-10">
          <div id="card-brand-logo" className="flex items-center space-x-2">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAC417]" />
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[14px] font-extrabold tracking-widest text-white leading-none">TRUST CARD</span>
              <span className="text-[7px] sm:text-[8px] text-[#FAC417] font-semibold tracking-wider leading-none mt-0.5 sm:mt-1 uppercase">REAL ESTATE PROFESSIONAL</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 bg-[#FAC417]/10 text-[#FAC417] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold border border-[#FAC417]/30 tracking-wide uppercase">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#FAC417] animate-pulse" />
            <span>VERIFIED · TRUSTED</span>
          </div>
        </div>

        {/* Profile Info Grid (Avatar, Name, Title, QR Code) */}
        <div className="grid grid-cols-12 gap-2 sm:gap-3 items-center mb-3 sm:mb-4 relative z-10">
          {/* Avatar Area */}
          <div className="col-span-3 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#FAC417] via-amber-200 to-[#FAC417]/30 shadow-md">
                <img
                  src={photo || getFallbackPhoto(debouncedName)}
                  alt={debouncedName}
                  className="w-full h-full rounded-full object-cover border border-[#020617]"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#020617] p-0.5 rounded-full border border-white/20">
                <div className="bg-[#FAC417] text-slate-900 p-0.5 rounded-full font-bold" title={`Verified: ${verificationLevel}`}>
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-950" />
                </div>
              </div>
            </div>
          </div>

          {/* Name & Titles */}
          <div className="col-span-6 space-y-1 pl-1 text-left">
            <div className="flex flex-wrap items-center gap-1">
              <h3 className={`text-sm sm:text-lg font-bold text-white font-serif-premium tracking-wide transition-opacity duration-150 ${isUpdating ? 'opacity-60' : 'opacity-100'}`}>
                {debouncedName}
              </h3>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline shrink-0" />
            </div>

            <p className={`text-[10px] sm:text-xs text-gray-300 font-medium transition-opacity duration-150 ${isUpdating ? 'opacity-60' : 'opacity-100'}`}>
              {debouncedTitle}
            </p>

            <div className="flex items-center gap-1 text-[9px] sm:text-[11px] text-gray-400">
              <Briefcase className="w-2.5 h-2.5 text-[#FAC417]" />
              <span className="truncate max-w-[80px] sm:max-w-none">{company || "Emaar Misr"}</span>
              <span className="inline-flex items-center gap-0.5 px-0.5 bg-emerald-500/10 text-emerald-400 text-[6px] sm:text-[8px] font-extrabold rounded uppercase border border-emerald-500/20 ml-0.5">
                VERIFIED
              </span>
            </div>

            <div className="flex items-center gap-1 pt-0.5">
              <span className="inline-flex items-center text-[7px] sm:text-[9px] font-bold bg-[#FAC417]/10 text-[#FAC417] border border-[#FAC417]/30 px-1 py-0.5 rounded">
                Verified
              </span>
              <span className="inline-flex items-center text-[7px] sm:text-[9px] font-bold bg-white/5 text-gray-300 border border-white/10 px-1 py-0.5 rounded">
                Elite
              </span>
            </div>
          </div>

          {/* QR Code Area */}
          <div className="col-span-3 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-1 rounded-lg shadow-sm border border-[#FAC417]/40 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
              <QRCodeSVG 
                value={shareUrl} 
                size={typeof window !== 'undefined' && window.innerWidth < 640 ? 38 : 54} 
                level={"H"}
                includeMargin={false}
              />
            </div>
            <span className="text-[6px] text-gray-400 mt-1 uppercase tracking-wider leading-tight">Scan Profile</span>
          </div>
        </div>

        {/* Core Metrics Grid (3 columns on mobile, 5 columns on desktop) */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-center mb-4 relative z-10">
          
          {/* Trust Score */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px]">
            <div className="flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-[#FAC417] shrink-0" />
            </div>
            <div className={`text-[12px] font-bold ${tc.accentText} font-heading mt-1`}>
              <AnimatedCounter value={trustScore} suffix="%" />
            </div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Trust Score Excellent</div>
          </div>

          {/* Deals Closed */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px]">
            <div className="flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-[#FAC417] shrink-0" />
            </div>
            <div className="text-[12px] font-bold text-white font-heading mt-1">
              <AnimatedCounter value={dealsClosed} suffix="+" />
            </div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Deals Closed This Year</div>
          </div>

          {/* Client Rating */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex flex-col justify-between min-h-[58px]">
            <div className="flex items-center justify-center">
              <Star className={`w-3.5 h-3.5 ${tc.fillAccent} ${tc.accentText} shrink-0`} />
            </div>
            <div className={`text-[12px] font-bold ${tc.accentText} font-heading mt-1`}>4.9</div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Client Rating (87 Rev.)</div>
          </div>

          {/* Experience (Hidden on mobile) */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex-col justify-between min-h-[58px] hidden sm:flex">
            <div className="flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-[#FAC417] shrink-0" />
            </div>
            <div className="text-[12px] font-bold text-white font-heading mt-1">
              <AnimatedCounter value={yearsExp} suffix="+" />
            </div>
            <div className="text-[8px] text-gray-400 truncate leading-none">Years Exp. Local Expert</div>
          </div>

          {/* Response Time (Hidden on mobile) */}
          <div className="bg-[#0A1128]/60 rounded-lg p-2 border border-white/5 flex-col justify-between min-h-[58px] hidden sm:flex">
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
