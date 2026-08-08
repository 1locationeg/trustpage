import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, MapPin, Briefcase, Star, CheckCircle2, TrendingUp, Share2, Download, ExternalLink, Zap, Lock, Clock, ThumbsUp, Users, Shield } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PROFESSIONS_DICT } from '../data/professionTemplates';
import { getFallbackPhoto } from '../data/mockProfiles';
import { TRANSLATIONS } from '../data/translations';
import Card from './Card';
import Badge from './Badge';
import StatTile from './StatTile';
import Button from './Button';

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

export default function LivePreviewCard({ profile, onOpenFullPage, theme = 'gold', activeStateIndex = -1, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const activeProf = PROFESSIONS_DICT[profile.professionId || 'broker'] || PROFESSIONS_DICT.broker;
  const kpi0 = activeProf.kpis?.[0];
  const kpi2 = activeProf.kpis?.[2];

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

  // Parallax Tilt & Light Shine States
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate card rotation angles (max 10 degrees tilt)
    const rotateX = -(y - rect.height / 2) / (rect.height / 2) * 10;
    const rotateY = (x - rect.width / 2) / (rect.width / 2) * 10;

    setTilt({ x: rotateX, y: rotateY });
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Theme-specific CSS styling classes
  const themeConfigs = {
    gold: {
      gradient: "from-[#0A0F1D] via-[#050811] to-[#121A30]",
      border: "border-[#FAC417]/35",
      accent: "#FAC417",
      accentText: "text-[#FAC417]",
      bgAccent: "bg-[#FAC417]/10",
      borderAccent: "border-[#FAC417]/25",
      glow: "animate-gold-glow",
      fillAccent: "fill-[#FAC417]",
    },
    silver: {
      gradient: "from-[#111827] via-[#080B10] to-[#1F2937]",
      border: "border-slate-500/30",
      accent: "#94A3B8",
      accentText: "text-slate-300",
      bgAccent: "bg-slate-500/10",
      borderAccent: "border-slate-500/20",
      glow: "animate-silver-glow",
      fillAccent: "fill-slate-300",
    },
    emerald: {
      gradient: "from-[#022C22] via-[#01140F] to-[#0A3D30]",
      border: "border-emerald-500/35",
      accent: "#10B981",
      accentText: "text-emerald-400",
      bgAccent: "bg-emerald-500/10",
      borderAccent: "border-emerald-500/25",
      glow: "animate-emerald-glow",
      fillAccent: "fill-emerald-400",
    }
  };

  const tc = themeConfigs[theme] || themeConfigs.gold;

  const STATE_ACCENTS = {
    0: '#fac417', // Build Authority -> Trust Score
    1: '#2dd4bf', // Proven Experience -> Practice Years (Teal)
    2: '#ed1b40', // Client Confidence -> Client Rating (Red)
    3: '#38bdf8', // Stronger Partnerships -> company/agency line (Sky blue)
    4: '#a78bfa', // Stand Out -> Elite badge (Violet)
    5: '#22c55e', // More Opportunities -> Deals Advised (Green)
    6: '#fac417'  // More Clients -> Climax (Gold)
  };

  const activeAccent = activeStateIndex >= 0 ? (STATE_ACCENTS[activeStateIndex] || '#fac417') : tc.accent;

  const isElementHighlighted = (elementKey) => {
    if (activeStateIndex === -1) return false;
    
    // 0: MORE CLIENTS -> Trust Score, Reviews (Rating), Deals Advised
    if (activeStateIndex === 0 && (elementKey === 'trust_score' || elementKey === 'client_rating' || elementKey === 'deals_advised')) return true;
    
    // 1: MORE DEALS -> Deals Advised, Experience
    if (activeStateIndex === 1 && (elementKey === 'deals_advised' || elementKey === 'practice_years')) return true;
    
    // 2: MORE REFERRALS -> Client Rating, Trusted by Clients
    if (activeStateIndex === 2 && (elementKey === 'client_rating' || elementKey === 'trusted_by_clients')) return true;
    
    // 3: MORE AUTHORITY -> Trust Score, Elite Badge
    if (activeStateIndex === 3 && (elementKey === 'trust_score' || elementKey === 'elite_badge')) return true;
    
    // 4: MORE VISIBILITY -> Company Line, Name/Title Line
    if (activeStateIndex === 4 && (elementKey === 'company_line' || elementKey === 'name_line')) return true;
    
    // 5: BETTER OPPORTUNITIES -> Deals Advised, Experience
    if (activeStateIndex === 5 && (elementKey === 'deals_advised' || elementKey === 'practice_years')) return true;
    
    // 6: STRONGER REPUTATION -> Trust Score, Client Rating, Elite Badge
    if (activeStateIndex === 6 && (elementKey === 'trust_score' || elementKey === 'client_rating' || elementKey === 'elite_badge')) return true;
    
    return false;
  };

  const getHighlightStyle = (elementKey) => {
    const highlighted = isElementHighlighted(elementKey);
    if (activeStateIndex >= 0) {
      if (highlighted) {
        return {
          borderColor: activeAccent,
          backgroundColor: `${activeAccent}15`,
          boxShadow: `0 0 14px ${activeAccent}35`,
          transform: 'scale(1.04)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        };
      }
      return {
        borderColor: 'rgba(255, 255, 255, 0.04)',
        backgroundColor: 'rgba(10, 17, 40, 0.55)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      };
    }
    return {};
  };

  // Base card styles with Stripe-like inner highlight and dark premium shadows
  const cardStyle = activeStateIndex >= 0 ? {
    background: 'linear-gradient(155deg, #090E1A 0%, #03060F 50%, #121A30 100%)',
    borderColor: activeStateIndex === 6 ? '#fac417' : 'rgba(255, 255, 255, 0.08)',
    boxShadow: activeStateIndex === 6 
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(250, 196, 23, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)' 
      : '0 25px 50px -12px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
  } : {
    background: 'linear-gradient(155deg, #090E1A 0%, #03060F 50%, #121A30 100%)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
  };

  // Apply real-time tilt calculations
  const finalCardStyle = {
    ...cardStyle,
    transform: isHovered 
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
  };

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

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/?profile=${profile.id || 'ahmed-hassan'}` : 'https://r8estate.com/ahmed-hassan';

  return (
    <div id="live-preview-card-container" className="relative w-full max-w-xl mx-auto">
      {/* Dynamic Trust Card Body */}
      <Card 
        id="live-preview-card-body" 
        variant="custom"
        className={`bg-gradient-to-br ${activeStateIndex >= 0 ? '' : tc.gradient} border ${activeStateIndex >= 0 ? 'border-white/10' : tc.border} text-white shadow-2xl overflow-hidden animate-card-shine relative cursor-default`}
        style={{
          ...finalCardStyle,
          borderRadius: 'clamp(16px, 4.5vw, 28px)',
          padding: 'clamp(0.75rem, 3.5vw, 1.25rem)',
          minHeight: 'clamp(280px, 60vw, 390px)'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle mesh background overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,196,23,0.06),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FAC417]/20 to-transparent pointer-events-none" />

        {/* Dynamic Hover Shine Highlight */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay z-30 transition-opacity duration-300" 
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`
            }}
          />
        )}

        {/* Card Header Ribbon */}
        <div 
          className="flex items-center justify-between border-b border-white/10 relative z-10"
          style={{
            paddingBottom: 'clamp(0.4rem, 1.5vw, 0.75rem)',
            marginBottom: 'clamp(0.5rem, 2.5vw, 1rem)'
          }}
        >
          <div id="card-brand-logo" className="flex items-center gap-2">
            <Shield 
              style={{
                width: 'clamp(14px, 3.5vw, 20px)',
                height: 'clamp(14px, 3.5vw, 20px)'
              }}
              className="text-[#FAC417]"
            />
            <div className="flex flex-col text-start">
              <span 
                className="font-extrabold tracking-widest text-white leading-none"
                style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}
              >
                {t.trustCard}
              </span>
              <span 
                className="text-[#FAC417] font-semibold tracking-wider leading-none uppercase"
                style={{
                  fontSize: 'clamp(6px, 1.5vw, 8px)',
                  marginTop: 'clamp(2px, 0.5vw, 4px)'
                }}
              >
                {t.rePro}
              </span>
            </div>
          </div>
          
          <Badge 
            variant="accent" 
            size="sm" 
            className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full"
            style={{
              fontSize: 'clamp(7px, 1.5vw, 9px)',
              padding: 'clamp(2px, 0.5vw, 4px) clamp(6px, 1.5vw, 10px)'
            }}
          >
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#FAC417] animate-pulse" />
            <span>{t.verifiedTrusted}</span>
          </Badge>
        </div>

        {/* Profile Info Row (Avatar + Name & Title Left, QR Code Right) */}
        <div 
          className="flex flex-row flex-wrap items-center justify-between gap-3 relative z-10 w-full"
          style={{ marginBottom: 'clamp(0.5rem, 2.5vw, 1rem)' }}
        >
          {/* Profile Details (Avatar + Name/Title) */}
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            {/* Avatar Area */}
            <div className="relative shrink-0">
              <div 
                className="rounded-full bg-gradient-to-tr from-[#FAC417] via-amber-200 to-[#FAC417]/20 shadow-[0_0_12px_rgba(250,196,23,0.12)]"
                style={{
                  width: 'clamp(60px, 16vw, 80px)',
                  height: 'clamp(60px, 16vw, 80px)',
                  padding: 'clamp(2px, 0.6vw, 3px)'
                }}
              >
                <img
                  src={photo || getFallbackPhoto(debouncedName)}
                  alt={debouncedName}
                  className="w-full h-full rounded-full object-cover border border-[#020617]"
                />
              </div>
              <div 
                className="absolute -bottom-1 -right-1 bg-[#020617] rounded-full border border-white/20 flex items-center justify-center"
                style={{ padding: 'clamp(1px, 0.4vw, 3px)' }}
              >
                <div 
                  className="bg-[#FAC417] text-slate-900 rounded-full font-bold flex items-center justify-center"
                  title={`Verified: ${verificationLevel}`}
                  style={{
                    padding: 'clamp(1px, 0.4vw, 3px)'
                  }}
                >
                  <ShieldCheck style={{ width: 'clamp(10px, 2.5vw, 14px)', height: 'clamp(10px, 2.5vw, 14px)' }} className="text-slate-950" />
                </div>
              </div>
            </div>

            {/* Name & Titles */}
            <div 
              className={`space-y-1 text-start rounded transition-all duration-300 ${activeStateIndex >= 0 ? (isElementHighlighted('name_line') ? 'px-1.5 py-0.5 border' : '') : ''}`}
              style={{
                ...getHighlightStyle('name_line')
              }}
            >
              <div className="flex flex-wrap items-center gap-1">
                <h3 
                  className={`font-bold text-white font-serif-premium tracking-wide transition-opacity duration-150 ${isUpdating ? 'opacity-60' : 'opacity-100'}`}
                  style={{ fontSize: 'clamp(12px, 3.5vw, 18px)' }}
                >
                  {debouncedName}
                </h3>
                <CheckCircle2 style={{ width: 'clamp(11px, 2.5vw, 14px)', height: 'clamp(11px, 2.5vw, 14px)' }} className="text-emerald-400 inline shrink-0" />
              </div>

              <p 
                className={`text-gray-300 font-medium transition-opacity duration-150 ${isUpdating ? 'opacity-60' : 'opacity-100'}`}
                style={{ fontSize: 'clamp(9px, 2.2vw, 12px)' }}
              >
                {debouncedTitle}
              </p>

              <div 
                className={`flex items-center gap-1 ${activeStateIndex >= 0 ? (isElementHighlighted('company_line') ? 'px-1.5 py-0.5 rounded border' : 'text-gray-400') : 'text-gray-400'}`}
                style={{
                  ...getHighlightStyle('company_line'),
                  fontSize: 'clamp(8px, 2vw, 11px)'
                }}
              >
                <Briefcase style={{ width: 'clamp(9px, 2vw, 12px)', height: 'clamp(9px, 2vw, 12px)' }} className="shrink-0" />
                <span className="truncate max-w-[120px] sm:max-w-none">{company || "Emaar Misr"}</span>
                <Badge 
                  variant="success" 
                  size="sm" 
                  className="rounded border border-emerald-500/20 ml-0.5 shrink-0 uppercase"
                  style={{
                    fontSize: 'clamp(6px, 1.5vw, 8px)',
                    padding: '1px 2px'
                  }}
                >
                  {t.verifiedMini}
                </Badge>
              </div>

              <div className="flex items-center gap-1 pt-0.5">
                <Badge 
                  variant="accent" 
                  size="sm" 
                  className="rounded shrink-0"
                  style={{
                    fontSize: 'clamp(7px, 1.5vw, 9px)',
                    padding: 'clamp(1px, 0.4vw, 2px) clamp(3px, 0.8vw, 6px)'
                  }}
                >
                  {t.verifiedBadge}
                </Badge>
                <Badge 
                  variant="neutral"
                  size="sm"
                  className={`rounded shrink-0 ${activeStateIndex >= 0 ? (isElementHighlighted('elite_badge') ? 'border' : '') : ''}`}
                  style={{
                    ...getHighlightStyle('elite_badge'),
                    fontSize: 'clamp(7px, 1.5vw, 9px)',
                    padding: 'clamp(1px, 0.4vw, 2px) clamp(3px, 0.8vw, 6px)'
                  }}
                >
                  {t.eliteBadge}
                </Badge>
              </div>
            </div>
          </div>

          {/* QR Code Area */}
          <div className="flex flex-col items-center justify-center text-center shrink-0">
            <div 
              className="bg-white rounded-lg shadow-sm border border-[#FAC417]/30 flex items-center justify-center"
              style={{
                width: 'clamp(48px, 12vw, 64px)',
                height: 'clamp(48px, 12vw, 64px)',
                padding: 'clamp(2px, 0.6vw, 4px)'
              }}
            >
              <QRCodeSVG 
                value={shareUrl} 
                size={128}
                style={{ width: '100%', height: '100%' }}
                level={"H"}
                includeMargin={false}
              />
            </div>
            <span 
              className="text-gray-400 mt-1 uppercase tracking-wider leading-tight"
              style={{ fontSize: 'clamp(5px, 1.2vw, 7px)' }}
            >
              {t.scanProfile}
            </span>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div 
          className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-center relative z-10"
          style={{ marginBottom: 'clamp(0.5rem, 2.5vw, 1rem)' }}
        >
          {/* Trust Score */}
          <StatTile
            variant="dark"
            highlighted={isElementHighlighted('trust_score')}
            activeAccent={activeAccent}
            value={<AnimatedCounter value={trustScore} suffix="%" />}
            label={t.trustScoreLabel}
            icon={<Shield />}
          />

          {/* Deals Closed */}
          <StatTile
            variant="dark"
            highlighted={isElementHighlighted('deals_advised')}
            activeAccent={activeAccent}
            value={<AnimatedCounter value={dealsClosed} suffix={kpi0?.unit || "+"} />}
            label={kpi0 ? kpi0.label : "Deals Closed"}
            icon={<Zap />}
          />

          {/* Client Rating */}
          <StatTile
            variant="dark"
            highlighted={isElementHighlighted('client_rating')}
            activeAccent={activeAccent}
            value="4.9"
            label={t.clientRatingLabel}
            icon={<Star />}
          />

          {/* Experience (Hidden on mobile) */}
          <StatTile
            variant="dark"
            className="hidden sm:flex"
            highlighted={isElementHighlighted('practice_years')}
            activeAccent={activeAccent}
            value={<AnimatedCounter value={yearsExp} suffix={kpi2?.unit || "+"} />}
            label={kpi2 ? kpi2.label : t.yearsExpDefault}
            icon={<Users />}
          />

          {/* Response Time (Hidden on mobile) */}
          <StatTile
            variant="dark"
            className="hidden sm:flex"
            highlighted={isElementHighlighted('avg_response')}
            activeAccent={activeAccent}
            value={avgResponseTime}
            label={t.avgResponseLabel}
            icon={<Clock />}
          />
        </div>

        {/* Why Clients Choose Me Section */}
        <div 
          className="border-t border-white/5 relative z-10 text-center"
          style={{
            paddingTop: 'clamp(0.5rem, 2vw, 0.75rem)',
            paddingBottom: 'clamp(0.4rem, 1.5vw, 0.6rem)'
          }}
        >
          <div 
            className="text-gray-400 font-bold uppercase tracking-widest"
            style={{
              fontSize: 'clamp(7px, 1.8vw, 9px)',
              marginBottom: 'clamp(0.25rem, 1vw, 0.4rem)'
            }}
          >
            {t.whyMe}
          </div>
          <div 
            className="flex flex-row items-center justify-center gap-3 whitespace-nowrap overflow-hidden"
            style={{ fontSize: 'clamp(7px, 1.8vw, 9px)' }}
          >
            <span className="inline-flex items-center text-gray-300 font-medium">
              <ShieldCheck style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)' }} className="text-[#FAC417] me-1 shrink-0" />
              {t.verifiedIdentity}
            </span>
            <span className="inline-flex items-center text-gray-300 font-medium">
              <ShieldCheck style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)' }} className="text-[#FAC417] me-1 shrink-0" />
              {t.realReviews}
            </span>
            <span className="inline-flex items-center text-gray-300 font-medium">
              <ShieldCheck style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)' }} className="text-[#FAC417] me-1 shrink-0" />
              {t.provenResults}
            </span>
          </div>
        </div>

        {/* Card Footer (Avatars + R8ESTATE verification badge) */}
        <div 
          className="border-t border-white/10 flex items-center justify-between text-gray-400 relative z-10"
          style={{
            paddingTop: 'clamp(0.5rem, 2vw, 0.75rem)',
            marginTop: 'clamp(0.25rem, 1.5vw, 0.5rem)',
            fontSize: 'clamp(7px, 1.8vw, 9px)'
          }}
        >
          <div 
            className={`flex items-center gap-2 rounded transition-all duration-300 ${activeStateIndex >= 0 ? (isElementHighlighted('trusted_by_clients') ? 'px-1.5 py-0.5 border' : '') : ''}`}
            style={{
              ...getHighlightStyle('trusted_by_clients')
            }}
          >
            <div className="flex -space-x-1.5 overflow-hidden">
              <img style={{ width: 'clamp(12px, 3.2vw, 16px)', height: 'clamp(12px, 3.2vw, 16px)' }} className="inline-block rounded-full ring-1 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&auto=format&fit=crop&q=80" alt="Client 1" />
              <img style={{ width: 'clamp(12px, 3.2vw, 16px)', height: 'clamp(12px, 3.2vw, 16px)' }} className="inline-block rounded-full ring-1 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&auto=format&fit=crop&q=80" alt="Client 2" />
              <img style={{ width: 'clamp(12px, 3.2vw, 16px)', height: 'clamp(12px, 3.2vw, 16px)' }} className="inline-block rounded-full ring-1 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&auto=format&fit=crop&q=80" alt="Client 3" />
            </div>
            <span>{t.trustedByClients}</span>
          </div>

          <div className="flex items-center gap-1 font-bold text-gray-300 uppercase tracking-wide">
            <span>{t.poweredBy}</span>
            <div className="flex items-center gap-0.5 text-white bg-white/5 border border-white/10 rounded px-1 py-0.5 leading-none" dir="ltr">
              <span className="text-[7px] text-[#FF1744] font-extrabold font-heading">R8</span>
              <span className="text-[7px] font-medium">ESTATE</span>
            </div>
          </div>
        </div>

        {/* Action Button inside card if full page preview needed */}
        {onOpenFullPage && (
          <Button
            id="btn-preview-full-page-inside-card"
            onClick={onOpenFullPage}
            variant="primary"
            size="sm"
            className="w-full mt-4 flex items-center justify-center gap-1.5 z-20 relative"
          >
            <span>{t.connectVerify}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0 ltr:rotate-0 rtl:rotate-180" />
          </Button>
        )}

      </Card>
    </div>
  );
}
