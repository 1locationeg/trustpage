import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ArrowLeft, Check, Shield, Award, MapPin, 
  Building2, UserCheck, Phone, Mail, FileText, Star, 
  TrendingUp, QrCode, Share2, Download, CheckCircle2, RefreshCw, Plus, Minus,
  Briefcase, Target, Layers, Compass, CheckSquare, Zap, Lock, Sparkles, AlertCircle, Edit, Eye, ShieldAlert
} from 'lucide-react';
import { PROFESSIONS_DICT, USER_GOALS } from '../data/professionTemplates';
import { getFallbackPhoto } from '../data/mockProfiles';
import LivePreviewCard from './LivePreviewCard';

export default function OnboardingWizard({ profile, setProfile, onFinish, isMobileView, flatMode }) {
  const [isLanding, setIsLanding] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  // Mobile active tab: 'overview' | 'edit' | 'preview'
  const [mobileTab, setMobileTab] = useState('overview');
  // Mobile accordion state: 'identity' | 'kpis' | 'verifications' | 'goals'
  const [mobileAccordion, setMobileAccordion] = useState('identity');

  const activeProfession = PROFESSIONS_DICT[profile.professionId || 'broker'] || PROFESSIONS_DICT.broker;

  // Staggered benefits highlight loop (pauses permanently when user starts typing)
  useEffect(() => {
    if (hasUserTyped || !isLanding) return;
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % 6);
    }, 2500);
    return () => clearInterval(interval);
  }, [hasUserTyped, isLanding]);

  const updateProfile = (fields) => {
    setProfile((prev) => {
      const next = { ...prev, ...fields };
      const totalSteps = 12;
      next.completionPercentage = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      
      const completedFields = [
        next.name, next.title, next.company, next.photo, 
        next.specializations?.length, next.locations?.length,
        next.dealsClosed, next.yearsExp, next.verifications?.length
      ].filter(Boolean).length;

      next.opportunityScore = Math.min(99, Math.max(60, 60 + completedFields * 4));
      next.hiringReadiness = Math.min(98, Math.max(50, 50 + completedFields * 5));
      next.trustScore = Math.min(99, Math.max(70, 70 + completedFields * 3));
      
      return next;
    });
  };

  const handleInputChange = (field, value) => {
    setHasUserTyped(true);
    updateProfile({ [field]: value });
  };

  const handleStartBuilder = () => {
    setIsLanding(false);
    setCurrentStep(1);
    setMobileTab('overview');
  };

  const handleNext = () => {
    if (currentStep < 12) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateProfile({ completionPercentage: Math.min(100, Math.round((nextStep / 12) * 100)) });
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setIsLanding(true);
    }
  };

  const stepsList = [
    "Goal", "Profession", "Identity", "Expertise", "Company & Markets",
    "Photo", "Verification", "Track Record", "Proof", "Intelligence", "Summary", "Ready"
  ];

  const adjustCounter = (field, amount) => {
    const current = profile[field] || 0;
    updateProfile({ [field]: Math.max(0, current + amount) });
  };

  const benefitsList = [
    "Build professional authority",
    "Get more career opportunities",
    "Win higher-value partnerships",
    "Increase client confidence",
    "Showcase verified experience",
    "Stand out in your industry"
  ];

  const renderFlatPwaForm = () => {
    return (
      <div id="flat-pwa-forms-container" className="space-y-6 text-left">
        
        {/* Section 1: Identity & Brand */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-[#0A3D62] uppercase tracking-wider block border-b border-gray-100 pb-2">
            1. Identity & Brand Fields
          </span>
          <div>
            <label htmlFor="flat-input-name" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Full Name</label>
            <input
              id="flat-input-name"
              type="text"
              value={profile.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ahmed Hassan"
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/10"
            />
          </div>
          <div>
            <label htmlFor="flat-input-title" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Professional Title</label>
            <input
              id="flat-input-title"
              type="text"
              value={profile.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Senior Advisor"
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/10"
            />
          </div>
          <div>
            <label htmlFor="flat-input-company" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Company</label>
            <input
              id="flat-input-company"
              type="text"
              value={profile.company || ''}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Independent Studio"
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        {/* Section 2: KPIs & Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
          <span className="text-[10px] font-bold text-[#0A3D62] uppercase tracking-wider block border-b border-gray-100 pb-2">
            2. KPIs & Performance Fields
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="flat-input-deals" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Deals Closed</label>
              <input
                id="flat-input-deals"
                type="number"
                value={profile.dealsClosed || 0}
                onChange={(e) => handleInputChange('dealsClosed', parseInt(e.target.value) || 0)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label htmlFor="flat-input-exp" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Years Experience</label>
              <input
                id="flat-input-exp"
                type="number"
                value={profile.yearsExp || 0}
                onChange={(e) => handleInputChange('yearsExp', parseInt(e.target.value) || 0)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="flat-input-volume" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Volume Structured</label>
            <input
              id="flat-input-volume"
              type="text"
              value={profile.transactionVolume || ''}
              onChange={(e) => handleInputChange('transactionVolume', e.target.value)}
              placeholder="$10M+"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        {/* Section 3: Credentials */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-[#0A3D62] uppercase tracking-wider block border-b border-gray-100 pb-2">
            3. Verification & Credentials
          </span>
          <div className="space-y-2">
            {profile.verifications?.map((v, idx) => (
              <div key={idx} className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{v.title}</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-700 font-extrabold px-1.5 py-0.5 rounded">VERIFIED</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Goals */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
          <span className="text-[10px] font-bold text-[#0A3D62] uppercase tracking-wider block border-b border-gray-100 pb-2">
            4. Strategic Goals
          </span>
          <div className="space-y-2">
            {USER_GOALS.map((goal) => {
              const isSelected = profile.selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => updateProfile({ selectedGoal: goal.id })}
                  className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 font-bold'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2 pointer-events-none">
                    <span className="pointer-events-none">{goal.icon}</span>
                    <span className="pointer-events-none">{goal.label}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FAC417]" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    );
  };

  // ==========================================
  // MOBILE PWA RENDERING
  // ==========================================
  const renderMobilePwa = () => {
    if (flatMode) {
      return renderFlatPwaForm();
    }

    if (isLanding) {
      return (
        <div id="mobile-landing-pwa" className="flex-1 flex flex-col justify-between bg-white text-gray-900 overflow-y-auto px-5 py-6">
          {/* Header Strip */}
          <div id="mobile-landing-strip" className="flex items-center justify-center space-x-2 text-[10px] font-semibold text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-200 w-full mb-4">
            <Shield className="w-3.5 h-3.5 text-[#0A3D62]" />
            <span>Egypt · UAE · Saudi Arabia Verified</span>
          </div>

          {/* Hero Section */}
          <div id="mobile-landing-hero" className="text-center space-y-3 my-auto">
            <span className="text-[10px] font-extrabold tracking-widest text-[#0A3D62] uppercase block">
              FOR REAL ESTATE PROFESSIONALS
            </span>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gold-gradient font-serif-premium leading-none">
              MORE CLIENTS
            </h1>
            
            <p className="text-lg font-bold text-gray-800 leading-tight">
              Get them all now 👇
            </p>
            
            <span className="text-xs text-gray-500 font-medium block">
              ⭐ Powered by R8ESTATE
            </span>

            {/* CTA Button */}
            <div className="pt-4 pb-2">
              <button
                id="btn-mobile-start-cta"
                onClick={handleStartBuilder}
                className="w-full py-3.5 bg-slate-950 text-white font-bold text-sm rounded-full hover:bg-slate-900 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Get My Trust Card</span>
                <ArrowRight className="w-4 h-4 text-[#FAC417]" />
              </button>
              <span className="text-[10px] text-gray-400 block mt-2 text-center">
                90 seconds - Instant preview - No signup
              </span>
            </div>
          </div>

          {/* Outcome Card Motivation (Centered underneath) */}
          <div id="mobile-landing-outcome" className="mt-6 border-t border-gray-100 pt-6">
            <div className="text-center mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                YOUR GUARANTEED OUTCOME
              </span>
            </div>
            <div className="scale-95 origin-center">
              <LivePreviewCard profile={profile} />
            </div>
          </div>
        </div>
      );
    }

    // Builder Dashboard PWA
    return (
      <div id="mobile-builder-pwa" className="flex-1 flex flex-col justify-between bg-[#FAFAF9] text-gray-900 relative">
        
        {/* Sticky Mobile PWA Header */}
        <div id="pwa-header" className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#0A3D62]" />
            <span className="font-extrabold text-sm text-[#0A3D62]">R8ESTATE PWA</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              Active Sync
            </span>
          </div>
        </div>

        {/* Scrollable Tab Content Container */}
        <div 
          id="pwa-tab-content" 
          className="flex-1 overflow-y-auto px-4 py-5"
          style={{ paddingBottom: '85px' }} // Avoid overlapping bottom tabbar
        >
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {mobileTab === 'overview' && (
            <div id="tab-overview-container" className="space-y-5 animate-fade-up">
              
              {/* Trust Score circular health panel */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">Trust Analytics</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    High Confidence
                  </span>
                </div>
                
                <div className="flex items-center justify-around py-2">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-slate-900 block font-heading">{profile.trustScore}%</span>
                    <span className="text-[10px] text-gray-500 font-semibold uppercase">Trust Score</span>
                  </div>
                  
                  <div className="h-10 w-px bg-gray-200" />
                  
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-[#0A3D62] block font-heading">{profile.opportunityScore}/100</span>
                    <span className="text-[10px] text-gray-500 font-semibold uppercase">Opportunity</span>
                  </div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-[#0A3D62] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${profile.completionPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>Profile Completion</span>
                  <span className="font-bold text-[#0A3D62]">{profile.completionPercentage}%</span>
                </div>
              </div>

              {/* Action List Checklist */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Next Steps to Maximize Opportunities</h3>
                
                <div className="space-y-2">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 text-emerald-700 p-1.5 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900">Define Profession Profile</p>
                        <p className="text-[10px] text-gray-500">Structured as {activeProfession.label}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 text-emerald-700 p-1.5 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900">Set Official Identity</p>
                        <p className="text-[10px] text-gray-500">{profile.name} · {profile.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded-full ${profile.photo ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {profile.photo ? <Check className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900">Professional Headshot</p>
                        <p className="text-[10px] text-gray-500">{profile.photo ? 'Photo linked successfully' : 'Upload professional picture'}</p>
                      </div>
                    </div>
                    {!profile.photo && (
                      <button 
                        onClick={() => { setMobileTab('edit'); setMobileAccordion('identity'); }}
                        className="text-[10px] font-bold text-[#0A3D62] bg-[#0A3D62]/5 px-2.5 py-1.5 rounded-lg"
                      >
                        Add Photo
                      </button>
                    )}
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="bg-amber-100 text-amber-700 p-1.5 rounded-full">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900">Audit Proof Records</p>
                        <p className="text-[10px] text-gray-500">{profile.dealsClosed} deals · {profile.proofItems?.length || 0} verified documents</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => { setMobileTab('edit'); setMobileAccordion('kpis'); }}
                      className="text-[10px] font-bold text-[#0A3D62] bg-[#0A3D62]/5 px-2.5 py-1.5 rounded-lg"
                    >
                      Audit
                    </button>
                  </div>
                </div>
              </div>

              {/* Big CTA to Preview */}
              <button
                onClick={() => setMobileTab('preview')}
                className="w-full py-3.5 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-2"
              >
                <span>View My Finished Card</span>
                <ArrowRight className="w-4 h-4 text-[#FAC417]" />
              </button>
            </div>
          )}

          {/* TAB 2: EDIT PROFILE ACCORDIONS */}
          {mobileTab === 'edit' && (
            <div id="tab-edit-container" className="space-y-4 animate-fade-up">
              
              <div className="text-left">
                <h2 className="text-lg font-bold text-slate-900 font-heading">Edit Profile Data</h2>
                <p className="text-xs text-gray-500">Live syncs automatically to your card outcome.</p>
              </div>

              {/* Accordion 1: Identity & Brand */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'identity' ? '' : 'identity')}
                  className="w-full p-4 flex items-center justify-between font-bold text-xs text-slate-800 border-b border-gray-100 bg-gray-50/50"
                >
                  <span className="flex items-center gap-2 uppercase tracking-wider pointer-events-none">
                    <UserCheck className="w-4 h-4 text-[#0A3D62] pointer-events-none" />
                    1. Identity & Brand
                  </span>
                  <span className="pointer-events-none">{mobileAccordion === 'identity' ? '▲' : '▼'}</span>
                </button>
                {mobileAccordion === 'identity' && (
                  <div className="p-4 space-y-3.5 text-left">
                    <div>
                      <label htmlFor="mobile-input-name" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Full Official Name</label>
                      <input
                        id="mobile-input-name"
                        type="text"
                        value={profile.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Ahmed Hassan"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/10"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobile-input-title" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Professional Title</label>
                      <input
                        id="mobile-input-title"
                        type="text"
                        value={profile.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Senior Advisor"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/10"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobile-input-company" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Company / Studio</label>
                      <input
                        id="mobile-input-company"
                        type="text"
                        value={profile.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Independent Studio"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/10"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Performance Metrics */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'kpis' ? '' : 'kpis')}
                  className="w-full p-4 flex items-center justify-between font-bold text-xs text-slate-800 border-b border-gray-100 bg-gray-50/50"
                >
                  <span className="flex items-center gap-2 uppercase tracking-wider pointer-events-none">
                    <TrendingUp className="w-4 h-4 text-[#0A3D62] pointer-events-none" />
                    2. Performance Metrics
                  </span>
                  <span className="pointer-events-none">{mobileAccordion === 'kpis' ? '▲' : '▼'}</span>
                </button>
                {mobileAccordion === 'kpis' && (
                  <div className="p-4 space-y-4 text-left">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="mobile-input-deals" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Deals Closed</label>
                        <input
                          id="mobile-input-deals"
                          type="number"
                          value={profile.dealsClosed || 0}
                          onChange={(e) => handleInputChange('dealsClosed', parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2"
                        />
                      </div>
                      <div>
                        <label htmlFor="mobile-input-exp" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Years Experience</label>
                        <input
                          id="mobile-input-exp"
                          type="number"
                          value={profile.yearsExp || 0}
                          onChange={(e) => handleInputChange('yearsExp', parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mobile-input-volume" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Volume Structured</label>
                      <input
                        id="mobile-input-volume"
                        type="text"
                        value={profile.transactionVolume || ''}
                        onChange={(e) => handleInputChange('transactionVolume', e.target.value)}
                        placeholder="$10M+"
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Verifications */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'verifications' ? '' : 'verifications')}
                  className="w-full p-4 flex items-center justify-between font-bold text-xs text-slate-800 border-b border-gray-100 bg-gray-50/50"
                >
                  <span className="flex items-center gap-2 uppercase tracking-wider pointer-events-none">
                    <ShieldCheck className="w-4 h-4 text-[#0A3D62] pointer-events-none" />
                    3. Credentials & Verifications
                  </span>
                  <span className="pointer-events-none">{mobileAccordion === 'verifications' ? '▲' : '▼'}</span>
                </button>
                {mobileAccordion === 'verifications' && (
                  <div className="p-4 space-y-3.5 text-left">
                    <div className="text-[11px] text-gray-500 bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>R8ESTATE automatically verifies licensing databases across Egypt, UAE, and KSA.</span>
                    </div>

                    <div className="space-y-2">
                      {profile.verifications?.map((v, idx) => (
                        <div key={idx} className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800">{v.title}</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-700 font-extrabold px-1.5 py-0.5 rounded">VERIFIED</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 4: Strategic Goals */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'goals' ? '' : 'goals')}
                  className="w-full p-4 flex items-center justify-between font-bold text-xs text-slate-800 border-b border-gray-100 bg-gray-50/50"
                >
                  <span className="flex items-center gap-2 uppercase tracking-wider pointer-events-none">
                    <Target className="w-4 h-4 text-[#0A3D62] pointer-events-none" />
                    4. Strategic Alignment Goal
                  </span>
                  <span className="pointer-events-none">{mobileAccordion === 'goals' ? '▲' : '▼'}</span>
                </button>
                {mobileAccordion === 'goals' && (
                  <div className="p-4 space-y-2 text-left">
                    {USER_GOALS.map((goal) => {
                      const isSelected = profile.selectedGoal === goal.id;
                      return (
                        <button
                          key={goal.id}
                          onClick={() => updateProfile({ selectedGoal: goal.id })}
                          className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 font-bold'
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{goal.icon}</span>
                            <span>{goal.label}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#FAC417]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setMobileTab('preview')}
                  className="w-full py-3 bg-[#FAC417] text-slate-900 font-bold text-xs rounded-xl shadow-sm"
                >
                  Go to Preview Card
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: STANDALONE CARD PREVIEW */}
          {mobileTab === 'preview' && (
            <div id="tab-preview-container" className="space-y-6 animate-fade-up">
              
              <div className="text-center">
                <h2 className="text-lg font-bold text-slate-900 font-heading">Your Finished Trust Card</h2>
                <p className="text-xs text-gray-500">Touch and hold to save to photos, or copy link.</p>
              </div>

              <div className="scale-95 origin-center">
                <LivePreviewCard 
                  profile={profile} 
                  onOpenFullPage={onFinish}
                />
              </div>

              <div className="space-y-2 max-w-sm mx-auto">
                <button
                  id="btn-pwa-share"
                  onClick={onFinish}
                  className="w-full py-3 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4 text-[#FAC417]" />
                  <span>Share My Trust Page</span>
                </button>
                <button
                  id="btn-pwa-back-overview"
                  onClick={() => setMobileTab('overview')}
                  className="w-full py-3 bg-white text-gray-700 border border-gray-200 font-bold text-xs rounded-xl shadow-sm"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Sticky iOS-style PWA Bottom Tabbar */}
        <div 
          id="pwa-bottom-tabbar" 
          className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-200 flex items-center justify-around py-2.5 z-40"
          style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 12px))' }} // respects notches and safe zones
        >
          <button
            onClick={() => setMobileTab('overview')}
            className={`flex flex-col items-center justify-center w-16 text-[10px] font-bold ${
              mobileTab === 'overview' ? 'text-[#0A3D62]' : 'text-gray-400'
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5 pointer-events-none" />
            <span className="pointer-events-none">Overview</span>
          </button>

          <button
            onClick={() => setMobileTab('edit')}
            className={`flex flex-col items-center justify-center w-16 text-[10px] font-bold ${
              mobileTab === 'edit' ? 'text-[#0A3D62]' : 'text-gray-400'
            }`}
          >
            <Edit className="w-5 h-5 mb-0.5 pointer-events-none" />
            <span className="pointer-events-none">Edit Data</span>
          </button>

          <button
            onClick={() => setMobileTab('preview')}
            className={`flex flex-col items-center justify-center w-16 text-[10px] font-bold ${
              mobileTab === 'preview' ? 'text-[#0A3D62]' : 'text-gray-400'
            }`}
          >
            <Eye className="w-5 h-5 mb-0.5 pointer-events-none" />
            <span className="pointer-events-none">Card View</span>
          </button>
        </div>

      </div>
    );
  };

  // ==========================================
  // DESKTOP WIZARD RENDERING
  // ==========================================
  const renderDesktopWizard = () => {
    return (
      <div id="onboarding-wizard-wrapper" className="w-full bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm relative flex flex-col justify-between min-h-[540px] transition-all duration-300">
        
        {/* 1. LANDING STATE */}
        {isLanding ? (
          <div id="landing-state-container" className="space-y-8 py-3 animate-fade-up text-center max-w-2xl mx-auto">
            
            {/* Header Tag / Trust Strip */}
            <div id="landing-trust-strip" className="mx-auto flex items-center space-x-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-200 w-fit">
              <Shield className="w-4 h-4 text-[#FAC417]" />
              <span>Egypt 🇪🇬 · UAE 🇦🇪 · Saudi Arabia 🇸🇦 Universal Trust Network</span>
            </div>

            {/* Premium Gold Typography Hero Section */}
            <div className="space-y-4">
              <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase block">
                FOR REAL ESTATE PROFESSIONALS
              </span>
              
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gold-gradient font-serif-premium leading-none">
                MORE CLIENTS
              </h1>
              
              <p className="text-2xl font-bold text-slate-900 leading-tight">
                Get them all now 👇
              </p>
              
              <span className="text-sm text-slate-500 font-semibold block">
                ⭐ Powered by R8ESTATE
              </span>
            </div>

            {/* Direct CTA Button */}
            <div className="pt-2 max-w-sm mx-auto">
              <button
                id="btn-landing-cta"
                onClick={handleStartBuilder}
                className="w-full py-4 bg-slate-950 text-white font-bold text-base rounded-full hover:bg-slate-900 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Get My Trust Card</span>
                <ArrowRight className="w-4 h-4 text-[#FAC417]" />
              </button>
              <span className="text-xs text-slate-400 block mt-2">
                90 seconds - Instant preview - No signup
              </span>
            </div>

            {/* Outcome Center Mock/Motivation */}
            <div id="desktop-landing-outcome" className="mt-8 border-t border-gray-100 pt-8 max-w-md mx-auto">
              <div className="text-center mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                  YOUR GUARANTEED CARD OUTCOME
                </span>
              </div>
              <div className="scale-95 transition-transform hover:scale-100 duration-300">
                <LivePreviewCard profile={profile} />
              </div>
            </div>

          </div>
        ) : (
          /* 2. BUILDER STATE (Standard 12 Steps) */
          <div id="builder-state-container" className="space-y-6 flex-1 flex flex-col justify-between animate-fade-up">
            
            {/* Top Header Progress Indicator */}
            <div id="wizard-progress-header">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                <span className="text-[#0A3D62] text-xs font-semibold uppercase tracking-wider">
                  STEP {currentStep} OF 12
                </span>
                <span className="text-gray-700 font-medium text-xs">
                  {stepsList[currentStep - 1]}
                </span>
              </div>

              {/* Step indicator bars */}
              <div id="progress-bars-container" className="grid grid-cols-12 gap-1 mb-2">
                {stepsList.map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx + 1)}
                    title={`Step ${idx + 1}: ${st}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx + 1 === currentStep
                        ? 'bg-[#0A3D62] scale-105'
                        : idx + 1 < currentStep
                        ? 'bg-emerald-600'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: GOAL SELECTION */}
            {currentStep === 1 && (
              <div id="step-1-container" className="space-y-5 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 1 • PERSONALIZED OUTCOME
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    What do you want to achieve, {profile.name || 'Professional'}?
                  </h2>
                  <p className="text-sm text-gray-600">
                    Select your primary objective to customize your trust engine.
                  </p>
                </div>

                <div id="goals-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {USER_GOALS.map((goal) => {
                    const isSelected = profile.selectedGoal === goal.id;
                    return (
                      <button
                        key={goal.id}
                        onClick={() => updateProfile({ selectedGoal: goal.id })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#0A3D62] border-[#0A3D62] text-white shadow-sm font-bold'
                            : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{goal.icon}</span>
                          <span className={`font-semibold text-sm font-heading ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {goal.label}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                          {goal.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: PROFESSION SELECTION */}
            {currentStep === 2 && (
              <div id="step-2-container" className="space-y-5 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 2 • ADAPTIVE TRUST ENGINE
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    What best describes your profession?
                  </h2>
                  <p className="text-sm text-gray-600">
                    R8ESTATE automatically configures relevant KPIs, proof records, and verification criteria for your field.
                  </p>
                </div>

                <div id="professions-list" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {Object.values(PROFESSIONS_DICT).map((prof) => {
                    const isSelected = profile.professionId === prof.id;
                    return (
                      <button
                        key={prof.id}
                        onClick={() => updateProfile({ professionId: prof.id })}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0A3D62] border-[#0A3D62] text-white shadow-sm font-bold'
                            : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
                        }`}
                      >
                        <div>
                          <div className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {prof.label}
                          </div>
                          <div className={`text-xs ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                            {prof.category}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: IDENTITY DETAILS */}
            {currentStep === 3 && (
              <div id="step-3-container" className="space-y-5 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 3 • PROFESSIONAL IDENTITY
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    Confirm your professional identity
                  </h2>
                  <p className="text-sm text-gray-600">
                    Clear identity details build instant baseline credibility.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="input-profile-name" className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Full Official Name
                    </label>
                    <input
                      id="input-profile-name"
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      placeholder="e.g. Ahmed Hassan"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20 focus:border-[#0A3D62]"
                    />
                  </div>

                  <div>
                    <label htmlFor="input-profile-title" className="block text-xs font-semibold text-gray-700 mb-1">
                      Professional Title / Specialty
                    </label>
                    <input
                      id="input-profile-title"
                      type="text"
                      value={profile.title || ''}
                      onChange={(e) => updateProfile({ title: e.target.value })}
                      placeholder={`e.g. ${activeProfession.label}`}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20 focus:border-[#0A3D62]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: EXPERTISE */}
            {currentStep === 4 && (
              <div id="step-4-container" className="space-y-5 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 4 • EXPERTISE
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    What are your core specializations?
                  </h2>
                  <p className="text-sm text-gray-600">
                    Niche positioning attracts decision-makers looking for exact expertise.
                  </p>
                </div>

                <div id="specializations-grid" className="grid grid-cols-2 gap-2.5">
                  {[
                    "Sustainable Planning",
                    "Luxury Residential",
                    "Commercial Development",
                    "Investment Portfolios",
                    "Off-Plan Strategy",
                    "Legal Advisory",
                    "Asset Yield Optimization",
                    "Contract Delivery"
                  ].map((spec) => {
                    const isSelected = profile.specializations?.includes(spec);
                    return (
                      <button
                        key={spec}
                        onClick={() => {
                          const currentSpecs = profile.specializations || [];
                          const nextSpecs = isSelected
                            ? currentSpecs.filter((s) => s !== spec)
                            : [...currentSpecs, spec];
                          updateProfile({ specializations: nextSpecs });
                        }}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0A3D62] border-[#0A3D62] text-white shadow-sm font-bold'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span>{spec}</span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: COMPANY & MARKETS */}
            {currentStep === 5 && (
              <div id="step-5-container" className="space-y-5 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 5 • COMPANY & MARKETS
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    Where do you operate?
                  </h2>
                  <p className="text-sm text-gray-600">
                    Associating with recognized brands and key markets increases authority.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="input-company" className="block text-xs font-semibold text-gray-700 mb-1">
                      Company / Studio / Brand
                    </label>
                    <input
                      id="input-company"
                      type="text"
                      value={profile.company || ''}
                      onChange={(e) => updateProfile({ company: e.target.value })}
                      placeholder="e.g. Sovereign Capital / Independent Studio"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20 focus:border-[#0A3D62]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: PHOTO */}
            {currentStep === 6 && (
              <div id="step-6-container" className="space-y-5 text-center text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 6 • EXECUTIVE PHOTO
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    Put a face to your reputation
                  </h2>
                  <p className="text-sm text-gray-600">
                    High-trust profiles receive 3.4x more decision-maker inquiries.
                  </p>
                </div>

                <div className="flex justify-center my-4">
                  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#0A3D62] to-gray-400 shadow-md relative">
                    <img
                      src={profile.photo || getFallbackPhoto(profile.name)}
                      alt="Profile Avatar"
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: VERIFICATION CENTER */}
            {currentStep === 7 && (
              <div id="step-7-container" className="space-y-4 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 7 • VERIFICATION CENTER
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    Verified professionals are chosen more often
                  </h2>
                  <p className="text-sm text-gray-600">{activeProfession.whyVerification}</p>
                </div>

                <div id="verifications-list" className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {profile.verifications?.map((v, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs animate-fade-up">
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-semibold text-gray-900">{v.title}</div>
                          <div className="text-[11px] text-gray-500">{v.source}</div>
                        </div>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium animate-check-scale">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: TRACK RECORD */}
            {currentStep === 8 && (
              <div id="step-8-container" className="space-y-5 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 8 • TRACK RECORD
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    Experienced professionals earn trust faster
                  </h2>
                  <p className="text-sm text-gray-600">{activeProfession.whyExperience}</p>
                </div>

                <div id="track-record-grid" className="grid grid-cols-2 gap-3">
                  {activeProfession.kpis.map(({ label, field, unit }) => (
                    <div key={field} className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 font-medium">{label}</div>
                        <div className="text-xl font-bold text-gray-900 font-heading">{profile[field]}{unit}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => adjustCounter(field, -1)}
                          className="w-7 h-7 rounded bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => adjustCounter(field, 1)}
                          className="w-7 h-7 rounded bg-[#0A3D62] text-white border border-[#0A3D62] hover:bg-[#08304F] flex items-center justify-center text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 9: PROOF CENTER */}
            {currentStep === 9 && (
              <div id="step-9-container" className="space-y-4 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 9 • PROOF CENTER
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    Show people what you've actually accomplished
                  </h2>
                  <p className="text-sm text-gray-600">{activeProfession.whyProof}</p>
                </div>

                <div id="proof-items-list" className="space-y-2">
                  {profile.proofItems?.map((item) => (
                    <div key={item.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1 text-left">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 font-heading">{item.title}</span>
                        <span className="text-emerald-700 text-xs font-semibold">{item.confidence}% Verified</span>
                      </div>
                      <p className="text-xs text-gray-600">{item.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 10: INTELLIGENCE SCORE */}
            {currentStep === 10 && (
              <div id="step-10-container" className="space-y-5 text-center py-4 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 10 • DECISION INTELLIGENCE
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    Analyzing Professional Signals...
                  </h2>
                  <p className="text-sm text-gray-600">Synthesizing trust metrics for {activeProfession.label}</p>
                </div>

                <div className="bg-slate-50 border border-gray-200 rounded-xl p-5 space-y-4 max-w-sm mx-auto text-left">
                  <div className="flex items-center justify-between text-xs border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-600">Calculated Risk Index:</span>
                    <span className="font-bold text-emerald-700 uppercase">LOW RISK</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-600">Regulatory Standing:</span>
                    <span className="font-bold text-emerald-700 uppercase">100% CLEAR</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-600">Recommended Placement:</span>
                    <span className="font-bold text-[#0A3D62] uppercase">EXECUTIVE TIERS</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 11: METRIC SUMMARY */}
            {currentStep === 11 && (
              <div id="step-11-container" className="space-y-5 text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 11 • CORE TRUST SCORE
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
                    Verification complete!
                  </h2>
                  <p className="text-sm text-gray-600">
                    Your calculated trust indicators stand significantly above the industry baseline.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-3xl font-extrabold text-slate-900 font-heading block">{profile.trustScore}%</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mt-1">Trust Score</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-3xl font-extrabold text-[#0A3D62] font-heading block">{profile.opportunityScore}</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mt-1">Opportunity</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <span className="text-3xl font-extrabold text-emerald-700 font-heading block">{profile.hiringReadiness}%</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mt-1">Readiness</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 12: READY */}
            {currentStep === 12 && (
              <div id="step-12-container" className="space-y-5 text-center text-left">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    STEP 12 • CARD GENERATED
                  </span>
                  <h2 className="text-3xl font-extrabold text-gray-900 font-heading mt-1">
                    Your R8ESTATE Trust Card is ready!
                  </h2>
                  <p className="text-sm text-gray-600">
                    Click below to generate and publish your official decision intelligence profile page.
                  </p>
                </div>

                <div className="max-w-xs mx-auto py-3">
                  <div className="flex items-center justify-center space-x-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active Sync Complete</span>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer */}
            <div id="wizard-navigation-footer" className="flex items-center justify-between border-t border-gray-150 pt-4 mt-4">
              <button
                id="btn-prev"
                onClick={handlePrev}
                className="px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold text-xs rounded-lg flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                id="btn-next"
                onClick={handleNext}
                className="px-6 py-2.5 bg-[#FAC417] text-slate-900 font-bold text-xs rounded-full hover:bg-[#E5B210] flex items-center space-x-1.5 shadow-sm transition-all font-heading"
              >
                <span>{currentStep === 12 ? "Publish My Page" : "Next Step"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    );
  };

  return isMobileView ? renderMobilePwa() : renderDesktopWizard();
}
