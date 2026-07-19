import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, Check, Shield, Award, MapPin, 
  Building2, UserCheck, Phone, Mail, FileText, Star, 
  TrendingUp, QrCode, Share2, Download, CheckCircle2, RefreshCw, Plus, Minus,
  Briefcase, Target, Layers, Compass, CheckSquare, Zap, Lock
} from 'lucide-react';
import { PROFESSIONS_DICT, USER_GOALS } from '../data/professionTemplates';

export default function OnboardingWizard({ profile, setProfile, onFinish }) {
  const [currentStep, setCurrentStep] = useState(1);

  const activeProfession = PROFESSIONS_DICT[profile.professionId || 'broker'] || PROFESSIONS_DICT.broker;

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
    }
  };

  const stepsList = [
    "Welcome", "Goal", "Profession", "Identity", "Expertise", "Company & Markets",
    "Photo", "Verification", "Track Record", "Proof", "Intelligence", "Ready"
  ];

  const adjustCounter = (field, amount) => {
    const current = profile[field] || 0;
    updateProfile({ [field]: Math.max(0, current + amount) });
  };

  return (
    <div id="onboarding-wizard-container" className="w-full bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm relative flex flex-col justify-between min-h-[520px]">
      
      {/* Top Header Progress */}
      <div id="wizard-progress-header" className="mb-6">
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

      {/* STEP 1: HERO SCREEN - OUTCOME FIRST */}
      {currentStep === 1 && (
        <div id="step-1-container" className="space-y-6 py-2">
          
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0A3D62]">
              Decision Intelligence Platform
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#0A3D62] font-heading leading-tight tracking-tight">
              Build Trust. Unlock Opportunities.
            </h1>

            <p className="text-base text-gray-600 max-w-xl leading-relaxed">
              Whether you're an agent, architect, contractor, lawyer, marketer, or consultant—build a verified professional identity that helps people choose you with confidence.
            </p>
          </div>

          {/* Clean 2-column checklist (No bordered boxes, no fills) */}
          <div id="step-1-benefits-section" className="space-y-3 pt-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Why professionals build a trust page
            </h2>

            <div id="benefits-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-gray-700">
              {[
                "Build professional authority",
                "Get more career opportunities",
                "Win higher-value partnerships",
                "Increase client confidence",
                "Showcase verified experience",
                "Stand out in your industry"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#0A3D62] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              id="btn-step-1-cta"
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FAC417] text-slate-900 font-semibold text-sm rounded-full hover:bg-[#E5B210] transition-all shadow-sm font-heading flex items-center justify-center space-x-2"
            >
              <span>Choose My Professional Transformation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: GOAL SELECTION */}
      {currentStep === 2 && (
        <div id="step-2-container" className="space-y-5">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 2 • PERSONALIZED OUTCOME
            </span>
            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
              What do you want to achieve?
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
                      ? 'bg-[#0A3D62] border-[#0A3D62] text-white shadow-sm'
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

      {/* STEP 3: PROFESSION SELECTION */}
      {currentStep === 3 && (
        <div id="step-3-container" className="space-y-5">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 3 • ADAPTIVE TRUST ENGINE
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
                      ? 'bg-[#0A3D62] border-[#0A3D62] text-white shadow-sm'
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

      {/* STEP 4: IDENTITY */}
      {currentStep === 4 && (
        <div id="step-4-container" className="space-y-5">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 4 • PROFESSIONAL IDENTITY
            </span>
            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
              Who is behind this identity?
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
                value={profile.name}
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
                value={profile.title}
                onChange={(e) => updateProfile({ title: e.target.value })}
                placeholder={`e.g. ${activeProfession.label}`}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20 focus:border-[#0A3D62]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: EXPERTISE */}
      {currentStep === 5 && (
        <div id="step-5-container" className="space-y-5">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 5 • EXPERTISE
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
                      ? 'bg-[#0A3D62] border-[#0A3D62] text-white shadow-sm'
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

      {/* STEP 6: COMPANY & MARKETS */}
      {currentStep === 6 && (
        <div id="step-6-container" className="space-y-5">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 6 • COMPANY & MARKETS
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
                value={profile.company}
                onChange={(e) => updateProfile({ company: e.target.value })}
                placeholder="e.g. Sovereign Capital / Independent Studio"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20 focus:border-[#0A3D62]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: PHOTO */}
      {currentStep === 7 && (
        <div id="step-7-container" className="space-y-5 text-center">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 7 • EXECUTIVE PHOTO
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
                src={profile.photo}
                alt="Profile Avatar"
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 8: VERIFICATION CENTER */}
      {currentStep === 8 && (
        <div id="step-8-container" className="space-y-4">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 8 • VERIFICATION CENTER
            </span>
            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
              Verified professionals are chosen more often
            </h2>
            <p className="text-sm text-gray-600">{activeProfession.whyVerification}</p>
          </div>

          <div id="verifications-list" className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {profile.verifications?.map((v, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-gray-900">{v.title}</div>
                    <div className="text-[11px] text-gray-500">{v.source}</div>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 9: TRACK RECORD */}
      {currentStep === 9 && (
        <div id="step-9-container" className="space-y-5">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 9 • TRACK RECORD
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

      {/* STEP 10: PROOF CENTER */}
      {currentStep === 10 && (
        <div id="step-10-container" className="space-y-4">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 10 • PROOF CENTER
            </span>
            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
              Show people what you've actually accomplished
            </h2>
            <p className="text-sm text-gray-600">{activeProfession.whyProof}</p>
          </div>

          <div id="proof-items-list" className="space-y-2">
            {profile.proofItems?.map((item) => (
              <div key={item.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
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

      {/* STEP 11: INTELLIGENCE SCORE */}
      {currentStep === 11 && (
        <div id="step-11-container" className="space-y-5 text-center py-4">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              STEP 11 • DECISION INTELLIGENCE
            </span>
            <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1">
              Analyzing Professional Signals...
            </h2>
            <p className="text-sm text-gray-600">Synthesizing trust metrics for {activeProfession.label}</p>
          </div>

          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-4 border-[#0A3D62] border-t-transparent animate-spin duration-1000" />
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0A3D62] font-heading">{profile.trustScore}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trust Score</div>
              <div className="text-xs text-emerald-700 font-medium">{profile.confidenceLevel} ★★★</div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 12: TRANSFORMATION READY */}
      {currentStep === 12 && (
        <div id="step-12-container" className="space-y-5 text-center py-4">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>TRANSFORMATION COMPLETE</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 font-heading">
            You are now an Opportunity-Ready Professional
          </h2>

          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Your verified identity is ready to create trust, open partnerships, and win confidence.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              id="btn-view-trust-page"
              onClick={onFinish}
              className="py-3 px-6 bg-[#FAC417] text-slate-900 font-semibold text-sm rounded-full hover:bg-[#E5B210] transition-all shadow-sm flex items-center justify-center space-x-2 font-heading"
            >
              <span>View My Trust Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Wizard Footer Navigation Controls (Pinned at bottom) */}
      <div id="wizard-footer-nav" className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
        <button
          id="btn-wizard-back"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            currentStep === 1
              ? 'opacity-30 cursor-not-allowed text-gray-400'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {currentStep < 12 && (
          <button
            id="btn-wizard-continue"
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#0A3D62] text-white font-semibold text-xs rounded-full hover:bg-[#08304F] transition-all shadow-sm font-heading"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
