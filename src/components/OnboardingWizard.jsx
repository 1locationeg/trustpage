import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, Check, Sparkles, Shield, Award, MapPin, 
  Building2, UserCheck, Phone, Mail, FileText, Star, 
  TrendingUp, QrCode, Share2, Download, CheckCircle2, RefreshCw, Plus, Minus
} from 'lucide-react';

export default function OnboardingWizard({ profile, setProfile, onFinish, onJumpToStep }) {
  const [currentStep, setCurrentStep] = useState(1);

  const updateProfile = (fields) => {
    setProfile((prev) => {
      const next = { ...prev, ...fields };
      // Dynamically calculate completion percentage
      const totalSteps = 12;
      next.completionPercentage = Math.min(100, Math.round((currentStep / totalSteps) * 100));
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
    "Welcome", "Identity", "Expertise", "Company", "Markets", "Photo",
    "Verification", "Track Record", "Client Proof", "Authority", "Intelligence", "Ready!"
  ];

  // Helper for step 8 track record counters
  const adjustCounter = (field, amount) => {
    const current = profile[field] || 0;
    updateProfile({ [field]: Math.max(0, current + amount) });
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-6 md:p-8 border border-slate-700/60 shadow-2xl relative">
      
      {/* Top Wizard Navigation Steps Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span className="text-[#D4AF37] font-heading flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            STEP {currentStep} OF 12
          </span>
          <span className="text-slate-300 font-medium">{stepsList[currentStep - 1]}</span>
        </div>

        {/* Step dots */}
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

      {/* STEP 1: WELCOME & VALUE PROPOSITION */}
      {currentStep === 1 && (
        <div className="space-y-6 text-center py-4 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full text-xs text-[#F3C66B]">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>WELCOME TO R8ESTATE TRUST ENGINE</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading leading-tight">
            Let's build the page <br />
            <span className="gold-gradient-text">buyers will trust.</span>
          </h2>

          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Stop giving buyers a standard CV or generic profile page. Build an evidence-backed decision memo that converts unknown prospects into confident clients.
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto py-2 text-left">
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs">
              <div className="font-bold text-white mb-0.5">⏱ 2 Minutes</div>
              <div className="text-slate-400 text-[11px]">Quick guided steps</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs">
              <div className="font-bold text-white mb-0.5">💳 No Credit Card</div>
              <div className="text-slate-400 text-[11px]">Free initial setup</div>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs">
              <div className="font-bold text-[#F3C66B] mb-0.5">⚡ Live Preview</div>
              <div className="text-slate-400 text-[11px]">Updates as you build</div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleNext}
              className="w-full max-w-md py-3.5 px-6 bg-gradient-to-r from-[#D4AF37] via-[#F3C66B] to-[#D4AF37] text-slate-950 font-extrabold text-sm rounded-2xl hover:brightness-110 transition-all shadow-xl flex items-center justify-center space-x-2 font-heading mx-auto"
            >
              <span>Start Building My Trust Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: IDENTITY */}
      {currentStep === 2 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 2</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">WHO ARE YOU?</h2>
            <p className="text-xs text-slate-400">Let's start with your official professional name and title.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                placeholder="e.g. Ahmed Hassan"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Headline / Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => updateProfile({ title: e.target.value })}
                placeholder="e.g. Senior Off-Plan & Investment Specialist"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: EXPERTISE */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 3</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">WHAT DO PEOPLE KNOW YOU FOR?</h2>
            <p className="text-xs text-slate-400">Select your primary areas of real estate expertise.</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              "Off-Plan Specialist",
              "Luxury Specialist",
              "Investment Advisor",
              "Commercial Specialist",
              "Leasing Specialist",
              "Property Management",
              "Negotiation Expert",
              "Land & Development"
            ].map((spec) => {
              const isSelected = profile.specializations.includes(spec);
              return (
                <button
                  key={spec}
                  onClick={() => {
                    const nextSpecs = isSelected
                      ? profile.specializations.filter((s) => s !== spec)
                      : [...profile.specializations, spec];
                    updateProfile({ specializations: nextSpecs });
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white font-semibold shadow-md'
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

      {/* STEP 4: COMPANY */}
      {currentStep === 4 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 4</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">WHERE DO YOU WORK?</h2>
            <p className="text-xs text-slate-400">Select your company or affiliated brand.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "EMAAR", type: "Master Developer" },
              { name: "ORA Developers", type: "Luxury Developer" },
              { name: "Mountain View", type: "Residential Leader" },
              { name: "Coldwell Banker", type: "International Brokerage" },
              { name: "Sotheby's Realty", type: "Luxury Real Estate" },
              { name: "Independent Professional", type: "Private Wealth Advisory" }
            ].map((c) => {
              const isSelected = profile.company === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => updateProfile({ company: c.name })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm flex items-center justify-between">
                    <span>{c.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{c.type}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 5: MARKETS */}
      {currentStep === 5 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 5</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">WHERE DO YOU OPERATE?</h2>
            <p className="text-xs text-slate-400">Select key markets where you have verified deal experience.</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {["New Cairo", "North Coast", "Sheikh Zayed", "Dubai Marina", "Palm Jumeirah", "Riyadh", "Red Sea", "DIFC"].map((mkt) => {
              const isSelected = profile.locations.includes(mkt);
              return (
                <button
                  key={mkt}
                  onClick={() => {
                    const nextMkts = isSelected
                      ? profile.locations.filter((l) => l !== mkt)
                      : [...profile.locations, mkt];
                    updateProfile({ locations: nextMkts });
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white font-semibold'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {mkt}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 6: PHOTO */}
      {currentStep === 6 && (
        <div className="space-y-5 text-center animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 6</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">ADD YOUR PHOTO</h2>
            <p className="text-xs text-slate-400">High quality photos increase buyer response rate by 310%.</p>
          </div>

          <div className="flex justify-center my-4">
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-slate-700 shadow-xl relative">
              <img
                src={profile.photo}
                alt="Profile Avatar"
                className="w-full h-full rounded-full object-cover border-2 border-slate-900"
              />
              <div className="absolute bottom-0 right-0 bg-[#D4AF37] text-slate-950 p-1.5 rounded-full shadow">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <button
              onClick={() => updateProfile({ photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" })}
              className="py-2.5 px-3 bg-slate-900 border border-slate-700 hover:border-[#D4AF37] rounded-xl text-xs text-slate-200"
            >
              Preset Executive 1
            </button>
            <button
              onClick={() => updateProfile({ photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80" })}
              className="py-2.5 px-3 bg-slate-900 border border-slate-700 hover:border-[#D4AF37] rounded-xl text-xs text-slate-200"
            >
              Preset Executive 2
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: VERIFICATION CENTER */}
      {currentStep === 7 && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 7</span>
              <h2 className="text-2xl font-bold text-white font-heading mt-0.5">VERIFICATION CENTER</h2>
              <p className="text-xs text-slate-400">Complete verification steps to unlock Gold & Elite status badges.</p>
            </div>
            <div className="bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F3C66B] px-3 py-1 rounded-xl text-xs font-bold font-heading">
              LEVEL: {profile.verificationLevel}
            </div>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {profile.verifications.map((v, idx) => (
              <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-white">{v.title}</div>
                    <div className="text-[10px] text-slate-400">{v.source} • {v.date}</div>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md text-[10px] font-medium">
                  100% Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 8: TRACK RECORD */}
      {currentStep === 8 && (
        <div className="space-y-5 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 8</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">YOUR TRACK RECORD</h2>
            <p className="text-xs text-slate-400">Showcase your historical volume, closed transactions, and client count.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Deals Closed", field: "dealsClosed" },
              { label: "Years Experience", field: "yearsExp" },
              { label: "Projects Sold", field: "projectsSold" },
              { label: "Happy Clients", field: "happyClients" }
            ].map(({ label, field }) => (
              <div key={field} className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">{label}</div>
                  <div className="text-xl font-bold text-white font-heading">{profile[field]}</div>
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

      {/* STEP 9: CLIENT PROOF */}
      {currentStep === 9 && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 9</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">CLIENT PROOF & REVIEWS</h2>
            <p className="text-xs text-slate-400">Add verified reviews and case studies that validate your claims.</p>
          </div>

          <div className="space-y-2.5">
            {profile.reviews.map((r) => (
              <div key={r.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white">{r.author}</span>
                  <span className="text-[#D4AF37] font-bold">★★★★★</span>
                </div>
                <p className="text-slate-300 text-[11px] line-clamp-2">"{r.comment}"</p>
                <div className="mt-1.5 text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {r.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 10: AUTHORITY & RECOGNITION */}
      {currentStep === 10 && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 10</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">AUTHORITY & RECOGNITION</h2>
            <p className="text-xs text-slate-400">Display developer awards, RICS memberships, and media features.</p>
          </div>

          <div className="space-y-2">
            {profile.awards.map((aw, i) => (
              <div key={i} className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center space-x-3 text-xs">
                <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div>
                  <div className="font-bold text-white">{aw.title}</div>
                  <div className="text-[10px] text-slate-400">{aw.issuer} • {aw.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 11: INTELLIGENCE SCORE */}
      {currentStep === 11 && (
        <div className="space-y-5 text-center py-2 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">STEP 11</span>
            <h2 className="text-2xl font-bold text-white font-heading mt-1">R8ESTATE INTELLIGENCE SCORE</h2>
            <p className="text-xs text-slate-400">Evaluating multi-layer decision signals...</p>
          </div>

          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            {/* Circular score display */}
            <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin duration-1000 opacity-40" />
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white font-heading">{profile.trustScore}</div>
              <div className="text-[10px] font-bold text-[#F3C66B] uppercase tracking-wider">Buyer Confidence</div>
              <div className="text-[9px] text-emerald-400 font-medium">Excellent ★★★</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left text-xs max-w-md mx-auto">
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">Risk Level:</span>
              <div className="font-bold text-emerald-400">Low Risk</div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px]">Top Strength:</span>
              <div className="font-bold text-white truncate">Off-Plan Strategy</div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 12: READY! */}
      {currentStep === 12 && (
        <div className="space-y-5 text-center py-2 animate-fadeIn">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>YOUR TRUST PAGE IS READY!</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white font-heading">
            Your Decision Infrastructure <br />
            <span className="gold-gradient-text">is Now Active</span>
          </h2>

          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Share your evidence-backed Trust Page with buyers, investors, and developer partners to close deals faster with total trust.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onFinish}
              className="py-3.5 px-6 bg-gradient-to-r from-[#D4AF37] via-[#F3C66B] to-[#D4AF37] text-slate-950 font-extrabold text-sm rounded-2xl hover:brightness-110 transition-all shadow-xl flex items-center justify-center space-x-2 font-heading"
            >
              <span>Go to My Trust Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Step Control Bar */}
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
