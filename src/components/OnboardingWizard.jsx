import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, Check, Sparkles, Shield, Award, MapPin, 
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
      
      // Dynamically calculate dynamic outcome metrics based on input completion
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
    "Photo", "Verification", "Track Record", "Proof", "Intelligence", "Ready!"
  ];

  const adjustCounter = (field, amount) => {
    const current = profile[field] || 0;
    updateProfile({ [field]: Math.max(0, current + amount) });
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-6 md:p-8 border border-slate-700/60 shadow-2xl relative selection:bg-[#D4AF37]/30 selection:text-[#F3C66B]">
      
      {/* Top Progress & Step Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span className="text-[#D4AF37] font-heading flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            STEP {currentStep} OF 12
          </span>
          <span className="text-slate-300 font-medium">{stepsList[currentStep - 1]}</span>
        </div>

        {/* Step indicators */}
        <div className="grid grid-cols-12 gap-1 mb-4">
          {stepsList.map((st, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx + 1)}
              title={`Step ${idx + 1}: ${st}`}
              className={`h-2 rounded-full transition-all ${
                idx + 1 === currentStep
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3C66B] ring-2 ring-[#D4AF37]/40 scale-105'
                  : idx + 1 < currentStep
                  ? 'bg-emerald-500'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: HERO SCREEN - OUTCOME FIRST */}
      {currentStep === 1 && (
        <div className="space-y-6 text-center py-2 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3.5 py-1 rounded-full text-xs text-[#F3C66B] font-semibold">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>DECISION INTELLIGENCE PLATFORM</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading leading-tight tracking-tight">
            Build Trust. <br />
            <span className="gold-gradient-text">Unlock Opportunities.</span>
          </h2>

          <p className="text-xs md:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Whether you're an agent, architect, contractor, lawyer, marketer or consultant... Build a verified professional identity that helps people choose you with confidence.
          </p>

          {/* OUTCOME BENEFIT CARDS SHOWN BEFORE FORMS */}
          <div className="space-y-2 pt-2 text-left max-w-lg mx-auto">
            <div className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2 text-center">
              WHY PROFESSIONALS BUILD A TRUST PAGE:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                "✓ Build Professional Authority",
                "✓ Get More Career Opportunities",
                "✓ Win Better Partnerships",
                "✓ Increase Client Confidence",
                "✓ Showcase Verified Experience",
                "✓ Stand Out In Your Industry",
                "✓ Share One Trusted Identity"
              ].map((benefit, i) => (
                <div key={i} className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-200 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{benefit.substring(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleNext}
              className="w-full max-w-md py-3.5 px-6 bg-gradient-to-r from-[#D4AF37] via-[#F3C66B] to-[#D4AF37] text-slate-950 font-extrabold text-sm rounded-2xl hover:brightness-110 transition-all shadow-xl flex items-center justify-center space-x-2 font-heading mx-auto"
            >
              <span>Choose My Professional Transformation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: GOAL SELECTION */}
      {currentStep === 2 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 2 • PERSONALIZED OUTCOME</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">What do you want to achieve?</h2>
            <p className="text-xs text-slate-400">Select your primary objective to customize your trust engine.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {USER_GOALS.map((goal) => {
              const isSelected = profile.selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => updateProfile({ selectedGoal: goal.id })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xl">{goal.icon}</span>
                    <span className="font-bold text-sm text-white font-heading">{goal.label}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{goal.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: PROFESSION SELECTION (ADAPTIVE TRUST ENGINE) */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 3 • ADAPTIVE TRUST ENGINE</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">What best describes your profession?</h2>
            <p className="text-xs text-slate-400">R8ESTATE automatically configures relevant KPIs, proof records, and verification criteria for your field.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {Object.values(PROFESSIONS_DICT).map((prof) => {
              const isSelected = profile.professionId === prof.id;
              return (
                <button
                  key={prof.id}
                  onClick={() => updateProfile({ professionId: prof.id })}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-semibold shadow-md'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">{prof.label}</div>
                    <div className="text-[10px] text-slate-400">{prof.category}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: IDENTITY */}
      {currentStep === 4 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 4 • PROFESSIONAL IDENTITY</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">Who is behind this identity?</h2>
            <p className="text-xs text-slate-400">Clear identity details build instant baseline credibility.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Official Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="e.g. Ahmed Hassan"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Title / Specialty</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => updateProfile({ title: e.target.value })}
                placeholder={`e.g. ${activeProfession.label}`}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: EXPERTISE */}
      {currentStep === 5 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 5 • EXPERTISE</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">What are your core specializations?</h2>
            <p className="text-xs text-slate-400">Niche positioning attracts decision-makers looking for exact expertise.</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
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
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white font-semibold'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{spec}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 6: COMPANY & MARKETS */}
      {currentStep === 6 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 6 • COMPANY & MARKETS</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">Where do you operate?</h2>
            <p className="text-xs text-slate-400">Associating with recognized brands and key markets increases authority.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Studio / Brand</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => updateProfile({ company: e.target.value })}
                placeholder="e.g. Sovereign Capital / Independent Studio"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: PHOTO */}
      {currentStep === 7 && (
        <div className="space-y-5 text-center animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 7 • EXECUTIVE PHOTO</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">Put a face to your reputation</h2>
            <p className="text-xs text-slate-400">High-trust profiles receive 3.4x more decision-maker inquiries.</p>
          </div>

          <div className="flex justify-center my-2">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-slate-700 shadow-xl relative">
              <img
                src={profile.photo}
                alt="Profile Avatar"
                className="w-full h-full rounded-full object-cover border-2 border-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 8: BENEFIT-DRIVEN VERIFICATION */}
      {currentStep === 8 && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 8 • VERIFICATION CENTER</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">Verified professionals are chosen more often</h2>
            <p className="text-xs text-[#F3C66B]">{activeProfession.whyVerification}</p>
          </div>

          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {profile.verifications?.map((v, idx) => (
              <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-white">{v.title}</div>
                    <div className="text-[10px] text-slate-400">{v.source}</div>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md text-[10px] font-medium">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 9: BENEFIT-DRIVEN TRACK RECORD */}
      {currentStep === 9 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 9 • TRACK RECORD</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">Experienced professionals earn trust faster</h2>
            <p className="text-xs text-[#F3C66B]">{activeProfession.whyExperience}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {activeProfession.kpis.map(({ label, field, unit }) => (
              <div key={field} className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">{label}</div>
                  <div className="text-xl font-bold text-white font-heading">{profile[field]}{unit}</div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => adjustCounter(field, -1)}
                    className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center text-xs font-bold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => adjustCounter(field, 1)}
                    className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3C66B] hover:bg-[#D4AF37]/40 flex items-center justify-center text-xs font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 10: BENEFIT-DRIVEN PROOF CENTER */}
      {currentStep === 10 && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 10 • PROOF CENTER</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">Show people what you've actually accomplished</h2>
            <p className="text-xs text-slate-400">{activeProfession.whyProof}</p>
          </div>

          <div className="space-y-2">
            {profile.proofItems?.map((item) => (
              <div key={item.id} className="p-3.5 bg-[#0E1422] rounded-xl border border-[#D4AF37]/30 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white font-heading">{item.title}</span>
                  <span className="text-emerald-400 text-[10px] font-bold">{item.confidence}% Verified</span>
                </div>
                <p className="text-[11px] text-slate-400">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 11: INTELLIGENCE SCORE */}
      {currentStep === 11 && (
        <div className="space-y-5 text-center py-2 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 11 • DECISION INTELLIGENCE</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">Analyzing Professional Signals...</h2>
            <p className="text-xs text-slate-400">Synthesizing trust metrics for {activeProfession.label}</p>
          </div>

          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin duration-1000 opacity-40" />
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white font-heading">{profile.trustScore}</div>
              <div className="text-[10px] font-bold text-[#F3C66B] uppercase tracking-wider">Trust Score</div>
              <div className="text-[9px] text-emerald-400 font-medium">{profile.confidenceLevel} ★★★</div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 12: TRANSFORMATION READY! */}
      {currentStep === 12 && (
        <div className="space-y-5 text-center py-2 animate-fadeIn">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>TRANSFORMATION COMPLETE</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white font-heading">
            You are now an <br />
            <span className="gold-gradient-text">Opportunity-Ready Professional</span>
          </h2>

          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Your verified identity is ready to create trust, open partnerships, and win confidence.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onFinish}
              className="py-3.5 px-6 bg-gradient-to-r from-[#D4AF37] via-[#F3C66B] to-[#D4AF37] text-slate-950 font-extrabold text-sm rounded-2xl hover:brightness-110 transition-all shadow-xl flex items-center justify-center space-x-2 font-heading"
            >
              <span>View My Trust Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Wizard Footer Controls */}
      <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            currentStep === 1
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {currentStep < 12 && (
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-[#F3C66B] transition-all shadow-md font-heading"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
