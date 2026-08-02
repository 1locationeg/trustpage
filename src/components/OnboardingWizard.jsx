import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, ArrowLeft, Check, Shield, ShieldCheck, Award, MapPin, 
  Building2, UserCheck, Phone, Mail, FileText, Star, 
  TrendingUp, QrCode, Share2, Download, CheckCircle2, RefreshCw, Plus, Minus,
  Briefcase, Target, Layers, Compass, CheckSquare, Zap, Lock, Sparkles, AlertCircle, Edit, Eye, ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { PROFESSIONS_DICT, USER_GOALS } from '../data/professionTemplates';
import { getFallbackPhoto, MOCK_PRESETS } from '../data/mockProfiles';
import LivePreviewCard from './LivePreviewCard';
import { TRANSLATIONS } from '../data/translations';
import Button from './Button';
import Badge from './Badge';
import Card from './Card';
import StatTile from './StatTile';

export default function OnboardingWizard({ profile, setProfile, onFinish, isMobileView, flatMode, language = 'en', setLanguage, user, onSignInClick }) {
  const [isLanding, setIsLanding] = useState(true);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [currentStep, setCurrentStep] = useState(1);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  // Mobile active tab: 'home' | 'build' | 'dashboard' | 'card'
  const [mobileTab, setMobileTab] = useState('home');
  // Mobile accordion state: 'identity' | 'kpis' | 'verifications' | 'goals'
  const [mobileAccordion, setMobileAccordion] = useState('identity');

  // Card theme state: 'gold' | 'silver' | 'emerald'
  const [cardTheme, setCardTheme] = useState('gold');

  // Touch swiping refs for mobile card view
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    const themes = ['gold', 'silver', 'emerald'];
    const currentIndex = themes.indexOf(cardTheme);

    if (isLeftSwipe) {
      const nextIndex = (currentIndex + 1) % themes.length;
      setCardTheme(themes[nextIndex]);
    } else if (isRightSwipe) {
      const prevIndex = (currentIndex - 1 + themes.length) % themes.length;
      setCardTheme(themes[prevIndex]);
    }
    
    // Reset refs
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  const activeProfession = PROFESSIONS_DICT[profile.professionId || 'broker'] || PROFESSIONS_DICT.broker;

  // Vertical Word-Rotator States (7 states)
  const ROTATOR_STATES = [
    { text: t.benefit_0, presetId: "build-authority", theme: "silver" },
    { text: t.benefit_1, presetId: "proven-experience", theme: "gold" },
    { text: t.benefit_2, presetId: "client-confidence", theme: "emerald" },
    { text: t.benefit_3, presetId: "stronger-partnerships", theme: "silver" },
    { text: t.benefit_4, presetId: "stand-out", theme: "emerald" },
    { text: t.benefit_5, presetId: "more-opportunities", theme: "gold" },
    { text: t.benefit_6, presetId: "client-confidence", theme: "gold", isClimax: true }
  ];

  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay cycle effect: holds for 2.6s (and let's trigger transition after 2.8s)
  useEffect(() => {
    if (isPaused || !isLanding) return;

    const timer = setTimeout(() => {
      setActiveStateIndex((prev) => (prev + 1) % 7);
    }, 2800); // 2600ms hold + 200ms transition buffer

    return () => clearTimeout(timer);
  }, [activeStateIndex, isPaused, isLanding]);

  // Sync profile preset when activeStateIndex changes (only in landing state)
  useEffect(() => {
    if (!isLanding) return;
    const currentState = ROTATOR_STATES[activeStateIndex];
    if (currentState) {
      const preset = MOCK_PRESETS.find(p => p.id === currentState.presetId);
      if (preset) {
        setProfile(preset.data);
      }
    }
  }, [activeStateIndex, isLanding]);

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
    setMobileTab('home');
  };

  const renderLockScreen = (titleText, descText) => {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-5 text-center space-y-5 animate-fade-in min-h-[48vh] bg-white rounded-[24px] border border-gray-100 shadow-sm mt-2">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-[#FAC417]/10 flex items-center justify-center border border-[#FAC417]/30 shadow-[0_0_16px_rgba(250,196,23,0.12)]">
            <Lock className="w-5 h-5 text-[#FAC417]" />
          </div>
          <div className="absolute -inset-1.5 rounded-full bg-[#FAC417]/5 blur-sm pointer-events-none" />
        </div>
        <div className="space-y-1.5 max-w-xs">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider font-heading">{titleText}</h3>
          <p className="text-[11px] text-gray-500 leading-relaxed">{descText}</p>
        </div>
        <Button 
          onClick={onSignInClick}
          variant="dark"
          size="sm"
          className="w-full max-w-[220px] flex items-center justify-center space-x-2 py-2.5 rounded-full hover:shadow-md transition-all"
        >
          <Shield className="w-3.5 h-3.5 text-[#FAC417] shrink-0" />
          <span>{language === 'ar' ? 'تسجيل الدخول مع جوجل' : 'Sign In with Google'}</span>
        </Button>
        <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">
          {language === 'ar' ? 'أمان تام ومزامنة فورية عبر OAuth 2.0' : 'Secure OAuth 2.0 Verification'}
        </span>
      </div>
    );
  };

  const handleNext = () => {
    if (currentStep < 12) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateProfile({ completionPercentage: Math.min(100, Math.round((nextStep / 12) * 100)) });
    } else {
      if (!user) {
        onSignInClick();
      } else {
        onFinish();
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setIsLanding(true);
    }
  };

  const getGoalTranslation = (goal) => {
    if (language !== 'ar') return { label: goal.label, desc: goal.description };
    const map = {
      career: { label: "النمو المهني / التوظيف", desc: "جذب مسؤولي التوظيف والشركات الكبرى." },
      business: { label: "تنمية أعمالي", desc: "توليد استفسارات عملاء مؤهلين وصفقات عالية القيمة." },
      partnerships: { label: "كسب شراكات أفضل", desc: "التواصل مع المستثمرين والمطورين والشركاء العقاريين." },
      authority: { label: "بناء سمعتي ومصداقيتي", desc: "تأسيس سلطة مطلقة غير قابلة للنقاش في السوق." },
      expertise: { label: "استعراض خبراتي", desc: "تحويل سنوات العمل الجاد إلى سجل إثبات مالي مدقق." },
      visibility: { label: "زيادة حضوري العقاري", desc: "التميز والبروز في الأسواق العقارية المحلية والدولية." }
    };
    return map[goal.id] || { label: goal.label, desc: goal.description };
  };

  const getProfessionTranslation = (prof) => {
    if (language !== 'ar') return { label: prof.label, category: prof.category };
    const map = {
      broker: { label: "وسيط عقاري / بروكر", category: "مبيعات وتأجير" },
      developer: { label: "مطور عقاري / مالك", category: "تطوير وإنشاء" },
      advisor: { label: "مستشار استثماري", category: "استشارات مالية وعقارية" },
      consultant: { label: "خبير ومستشار عقاري", category: "دراسات واستراتيجيات" },
      lawyer: { label: "محامٍ ومستشار قانوني", category: "قوانين عقارية وعقود" },
      interior: { label: "مهندس تصميم داخلي", category: "تصميم وديكور" }
    };
    return map[prof.id] || { label: prof.label, category: prof.category };
  };

  const getSpecTranslation = (spec) => {
    if (language !== 'ar') return spec;
    const map = {
      "Sustainable Planning": "التخطيط المستدام",
      "Luxury Residential": "السكني الفاخر",
      "Commercial Development": "التطوير التجاري",
      "Investment Portfolios": "المحافظ الاستثمارية",
      "Off-Plan Strategy": "البيع على الخارطة",
      "Legal Advisory": "الاستشارات القانونية",
      "Asset Yield Optimization": "تحسين عائد الأصول",
      "Contract Delivery": "تسليم وتوقيع العقود"
    };
    return map[spec] || spec;
  };

  const getKpiTranslation = (label) => {
    if (language !== 'ar') return label;
    const map = {
      "Deals Advised": "الصفقات المغلقة",
      "Volume Structured": "حجم المعاملات الموثقة",
      "Practice Years": "سنوات الخبرة",
      "Client Rating": "تقييم العملاء",
      "Spaces Styled": "مساحات تم تصميمها",
      "Design Awards": "جوائز التصميم",
      "Avg Response": "سرعة الاستجابة"
    };
    return map[label] || label;
  };

  const stepsList = language === 'ar' ? [
    "الهدف", "المهنة", "الهوية", "الخبرة", "الشركة والأسواق", "الصورة الشخصية", "التوثيق", "سجل الأداء", "الإثباتات", "الذكاء العقاري", "الملخص", "جاهز"
  ] : [
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
        <div id="mobile-landing-pwa" className="h-[100svh] md:h-full w-full max-w-[420px] mx-auto flex flex-col justify-between bg-white text-gray-900 overflow-hidden px-4 py-4 pb-safe-bottom pt-safe-top relative animate-fade-in">
          
          {/* Native-style Compact Header */}
          <div className="flex items-center justify-between py-2 px-1 shrink-0 border-b border-gray-100/60">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider text-slate-800 font-heading">
                <span className="text-[#FF1744]">R8</span> ESTATE
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Language toggler */}
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                <button 
                  onClick={() => setLanguage && setLanguage('en')} 
                  className={`hover:text-slate-900 cursor-pointer ${language === 'en' ? 'text-slate-900 font-extrabold underline decoration-2 decoration-[#FF1744] underline-offset-2' : 'text-gray-400'}`}
                >
                  EN
                </button>
                <span className="text-gray-300">/</span>
                <button 
                  onClick={() => setLanguage && setLanguage('ar')} 
                  className={`hover:text-slate-900 font-arabic cursor-pointer ${language === 'ar' ? 'text-slate-900 font-extrabold underline decoration-2 decoration-[#FF1744] underline-offset-2' : 'text-gray-400 font-arabic'}`}
                >
                  ع
                </button>
              </div>

              {/* User profile identifier */}
              {user ? (
                <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold text-[9px] uppercase border border-slate-100 overflow-hidden shrink-0 shadow-sm">
                  {user.picture ? (
                    <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.initials || 'U'
                  )}
                </div>
              ) : (
                <button 
                  onClick={onSignInClick}
                  className="text-[9px] font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-gray-250 rounded-full px-2 py-0.5"
                >
                  {language === 'ar' ? 'دخول' : 'Sign In'}
                </button>
              )}
            </div>
          </div>

          {/* Outcome Carousel Header */}
          <div className="text-center py-2 shrink-0 space-y-1">
            <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase block">
              {language === 'ar' ? 'بطاقة الثقة تمنحك' : 'YOUR TRUST CARD SECURES'}
            </span>
            <div className="h-6 overflow-hidden relative flex items-center justify-center">
              <span 
                key={activeStateIndex}
                className="text-sm font-extrabold tracking-tight text-slate-800 font-heading animate-slide-up-in block"
              >
                {language === 'ar' ? (
                  activeStateIndex === 0 ? 'المزيد من العملاء' :
                  activeStateIndex === 1 ? 'المزيد من العقارات' :
                  activeStateIndex === 2 ? 'المزيد من الصفقات الناجحة' :
                  activeStateIndex === 3 ? 'إحالات أعلى' :
                  activeStateIndex === 4 ? 'صفر اعتراضات' :
                  activeStateIndex === 5 ? 'توثيق مطلق' : 'R8 ESTATE'
                ) : ROTATOR_STATES[activeStateIndex].text}
              </span>
            </div>
            {/* Compact dots indicator */}
            <div className="flex items-center space-x-1.5 justify-center mt-1">
              {ROTATOR_STATES.map((state, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveStateIndex(idx);
                    setIsPaused(true);
                  }}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    idx === activeStateIndex ? 'bg-[#FF1744] w-2.5' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Large Premium Trust Card (Nearly full width inside a max-h-[380px] flex container) */}
          <div id="mobile-landing-outcome" className="flex-1 w-full flex items-center justify-center py-2 shrink-0 animate-card-slide-up">
            <div className="w-full flex justify-center items-center h-full max-h-[380px]">
              <div className="w-full scale-[0.86] sm:scale-[0.92] origin-center drop-shadow-xl">
                <LivePreviewCard 
                  profile={profile} 
                  activeStateIndex={activeStateIndex}
                  theme={ROTATOR_STATES[activeStateIndex]?.theme || 'gold'}
                  language={language}
                />
              </div>
            </div>
          </div>

          {/* Primary CTA directly below with 16px spacing */}
          <div className="space-y-3 shrink-0 text-center px-2 mt-4">
            <Button
              id="btn-mobile-start-cta"
              onClick={handleStartBuilder}
              variant={activeStateIndex === 6 ? 'danger' : 'dark'}
              size="md"
              className={`w-full flex items-center justify-center space-x-2 py-3 rounded-[24px] transition-all duration-300 animate-cta-pulse-once ${
                activeStateIndex === 6 ? 'ring-4 ring-[#FF1744]/30 scale-[1.02] shadow-[0_0_20px_rgba(255,23,68,0.2)]' : ''
              }`}
            >
              <span>{language === 'ar' ? 'احصل على بطاقة الثقة الخاصة بي' : 'Get My Trust Card'}</span>
              <ArrowRight className="w-4 h-4 text-[#FAC417] shrink-0 ltr:rotate-0 rtl:rotate-180" />
            </Button>
            <span className="text-[10px] text-gray-400 font-medium block text-center">
              {language === 'ar' ? '90 ثانية • معاينة فورية • بدون تسجيل' : '90 seconds • Instant preview • No signup'}
            </span>
          </div>

        </div>
      );
    }

    // Builder Dashboard PWA
    return (
      <div id="mobile-builder-pwa" className="flex-1 flex flex-col justify-between bg-[#FAFAF9] text-gray-900 relative">
        
        {/* Sticky Mobile PWA Header */}
        <div id="pwa-header" className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-4 h-4 text-[#0A3D62]" />
            <span className="font-extrabold text-xs tracking-wider text-slate-800 font-heading">
              <span className="text-[#FF1744]">R8</span> ESTATE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-500 border border-gray-200 rounded-full px-2 py-0.5 bg-gray-50">
              <button onClick={() => setLanguage && setLanguage('en')} className={`${language === 'en' ? 'text-slate-900 font-black' : 'text-gray-400'}`}>EN</button>
              <span className="text-gray-300">/</span>
              <button onClick={() => setLanguage && setLanguage('ar')} className={`${language === 'ar' ? 'text-slate-900 font-black font-arabic' : 'text-gray-400 font-arabic'}`}>ع</button>
            </div>
            <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
              {language === 'ar' ? 'مزامنة' : 'Sync'}
            </span>
          </div>
        </div>

        {/* Scrollable Tab Content Container */}
        <div 
          id="pwa-tab-content" 
          className="flex-1 overflow-y-auto px-4 py-5"
          style={{ paddingBottom: '85px' }} // Avoid overlapping bottom tabbar
        >
          
          {/* TAB 1: HOME/OVERVIEW */}
          {mobileTab === 'home' && (
            !user ? renderLockScreen(t.privateWorkspace || 'Private Analytics', t.verifyUnlock || 'Verify your identity to unlock deep trust analytics, credentials, and verification tools.') : (
              <div id="tab-home-container" className="space-y-5 animate-fade-up">
                
                {/* Trust Score Health Panel */}
                <div className="bg-white rounded-[24px] p-5 border border-gray-150 shadow-sm space-y-3.5">
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
                        onClick={() => { setMobileTab('build'); setMobileAccordion('identity'); }}
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
                      onClick={() => { setMobileTab('build'); setMobileAccordion('kpis'); }}
                      className="text-[10px] font-bold text-[#0A3D62] bg-[#0A3D62]/5 px-2.5 py-1.5 rounded-lg"
                    >
                      Audit
                    </button>
                  </div>
                </div>
              </div>

              {/* Big CTA in Thumb-Zone */}
              <button
                onClick={() => setMobileTab('build')}
                className="w-full py-3.5 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-2"
              >
                <span>Edit & Build My Card</span>
                <ArrowRight className="w-4 h-4 text-[#FAC417]" />
              </button>
            </div>
          )
        )}

          {/* TAB 2: BUILD CARD (ACCORDIONS) */}
          {mobileTab === 'build' && (
            <div id="tab-build-container" className="space-y-4 animate-fade-up">
              
              <div className="text-left">
                <h2 className="text-lg font-bold text-slate-900 font-heading">Build Card Data</h2>
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
                        className="w-full bg-slate-50/50 border border-gray-200 rounded-[16px] px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FAC417]/20 focus:border-[#FAC417] focus:bg-white transition-all duration-300"
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
                        className="w-full bg-slate-50/50 border border-gray-200 rounded-[16px] px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FAC417]/20 focus:border-[#FAC417] focus:bg-white transition-all duration-300"
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
                        className="w-full bg-slate-50/50 border border-gray-200 rounded-[16px] px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FAC417]/20 focus:border-[#FAC417] focus:bg-white transition-all duration-300"
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
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-800 block">Deals Closed</span>
                        <span className="text-[10px] text-gray-400">Total verified transactions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => adjustCounter('dealsClosed', -5)} className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-sm">-</button>
                        <span className="w-10 text-center font-bold text-xs text-slate-800">{profile.dealsClosed || 0}</span>
                        <button onClick={() => adjustCounter('dealsClosed', 5)} className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-sm">+</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-800 block">Years Experience</span>
                        <span className="text-[10px] text-gray-400">Time in local market</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => adjustCounter('yearsExp', -1)} className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-sm">-</button>
                        <span className="w-10 text-center font-bold text-xs text-slate-800">{profile.yearsExp || 0}</span>
                        <button onClick={() => adjustCounter('yearsExp', 1)} className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-sm">+</button>
                      </div>
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
                    3. Credentials & Audits
                  </span>
                  <span className="pointer-events-none">{mobileAccordion === 'verifications' ? '▲' : '▼'}</span>
                </button>
                {mobileAccordion === 'verifications' && (
                  <div className="p-4 space-y-3 text-left">
                    <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800">
                      <div className="flex items-center space-x-2">
                        <ShieldAlert className="w-4 h-4 text-[#FAC417]" />
                        <span className="text-xs font-bold font-heading text-[#FAC417]">Regulatory Verification Level</span>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-relaxed">
                        Credentials verified via Land Registries, AML records, and official regulatory commercial logs.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 4: Goals */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'goals' ? '' : 'goals')}
                  className="w-full p-4 flex items-center justify-between font-bold text-xs text-slate-800 border-b border-gray-100 bg-gray-50/50"
                >
                  <span className="flex items-center gap-2 uppercase tracking-wider pointer-events-none">
                    <Target className="w-4 h-4 text-[#0A3D62] pointer-events-none" />
                    4. Strategic Goals
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

              {/* View Card button in Thumb-zone */}
              <div className="pt-2">
                <button
                  onClick={() => setMobileTab('card')}
                  className="w-full py-3.5 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-2"
                >
                  <span>Preview Finished Card</span>
                  <ArrowRight className="w-4 h-4 text-[#FAC417]" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: DASHBOARD METRICS */}
          {mobileTab === 'dashboard' && (
            !user ? renderLockScreen(t.privateWorkspace || 'Workspace Dashboard', t.verifyUnlockDashboard || 'Sign in to access your listings scoreboards, partner leads, and verification dashboard.') : (
              <div id="tab-dashboard-container" className="space-y-4 animate-fade-up text-left">
                <h2 className="text-lg font-bold text-slate-900 font-heading">Decision Dashboard</h2>
                <p className="text-xs text-gray-500">Real-time credibility indicators configured for your profile.</p>

                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[90px]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Trust score</span>
                    <span className="text-3xl font-extrabold text-slate-900 font-heading">{profile.trustScore}%</span>
                    <span className="text-[9px] text-[#FAC417] font-semibold">Gold Certified</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[90px]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Opportunity index</span>
                    <span className="text-3xl font-extrabold text-[#0A3D62] font-heading">{profile.opportunityScore}/100</span>
                    <span className="text-[9px] text-emerald-600 font-semibold">Excellent Rating</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[90px]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Hiring readiness</span>
                    <span className="text-3xl font-extrabold text-slate-900 font-heading">{profile.hiringReadiness}%</span>
                    <span className="text-[9px] text-gray-500 font-semibold">Instant Response</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[90px]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Referrals</span>
                    <span className="text-3xl font-extrabold text-slate-900 font-heading">44%</span>
                    <span className="text-[9px] text-[#0A3D62] font-semibold">High Repeat Rate</span>
                  </div>
                </div>

                <div className="bg-slate-950 text-white rounded-2xl p-5 border border-slate-800 shadow-lg space-y-3 mt-4">
                  <h3 className="text-sm font-bold text-[#FAC417] font-heading flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#FAC417]" />
                    <span>Verified Decision Asset</span>
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Your credentials have been aggregated into R8 ESTATE's secure decentralized identity index, ensuring complete verifiability on the regional trust networks.
                  </p>
                </div>
              </div>
            )
          )}

          {/* TAB 4: SWIPEABLE TRUST CARD PREVIEW */}
          {mobileTab === 'card' && (
            <div id="tab-card-container" className="space-y-6 animate-fade-up">
              
              <div className="text-center">
                <h2 className="text-lg font-bold text-slate-900 font-heading">Swipe to Switch Themes</h2>
                <p className="text-xs text-gray-500">Swipe left or right on the card to cycle themes.</p>
              </div>

              {/* Swipeable container */}
              <div 
                id="swipe-detector-area"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="scale-95 origin-center cursor-pointer select-none active:scale-95 duration-200"
              >
                <LivePreviewCard 
                  profile={profile} 
                  onOpenFullPage={onFinish}
                  theme={cardTheme}
                  language={language}
                />
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2.5 mt-4">
                {['gold', 'silver', 'emerald'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setCardTheme(t)}
                    className={`w-3 h-3 rounded-full transition-all border ${
                      cardTheme === t 
                        ? 'bg-[#0A3D62] border-[#0A3D62] scale-125' 
                        : 'bg-gray-300 border-gray-300'
                    }`}
                    title={`Switch to ${t} theme`}
                  />
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="space-y-2 max-w-sm mx-auto pt-4">
                <button
                  id="btn-pwa-share"
                  onClick={onFinish}
                  className="w-full py-3.5 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4 text-[#FAC417]" />
                  <span>Publish My Trust Page</span>
                </button>
                <button
                  id="btn-pwa-back-overview"
                  onClick={() => setMobileTab('home')}
                  className="w-full py-3 bg-white text-gray-700 border border-gray-200 font-bold text-xs rounded-xl shadow-sm"
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Sticky iOS-style PWA Bottom Tabbar */}
        <div 
          id="pwa-bottom-tabbar" 
          className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-100 flex items-center justify-around py-3 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]"
          style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 12px))' }} // respects notches and safe zones
        >
          <button
            onClick={() => setMobileTab('home')}
            className={`flex flex-col items-center justify-center w-14 text-[9px] font-bold transition-colors duration-200 ${
              mobileTab === 'home' ? 'text-[#FF1744] font-extrabold' : 'text-gray-400'
            }`}
          >
            <Compass className="w-5 h-5 mb-0.5 pointer-events-none" />
            <span className="pointer-events-none">Home</span>
          </button>

          <button
            onClick={() => setMobileTab('build')}
            className={`flex flex-col items-center justify-center w-14 text-[9px] font-bold transition-colors duration-200 ${
              mobileTab === 'build' ? 'text-[#FF1744] font-extrabold' : 'text-gray-400'
            }`}
          >
            <Edit className="w-5 h-5 mb-0.5 pointer-events-none" />
            <span className="pointer-events-none">Build Card</span>
          </button>

          <button
            onClick={() => setMobileTab('dashboard')}
            className={`flex flex-col items-center justify-center w-14 text-[9px] font-bold transition-colors duration-200 ${
              mobileTab === 'dashboard' ? 'text-[#FF1744] font-extrabold' : 'text-gray-400'
            }`}
          >
            <TrendingUp className="w-5 h-5 mb-0.5 pointer-events-none" />
            <span className="pointer-events-none">Dashboard</span>
          </button>

          <button
            onClick={() => setMobileTab('card')}
            className={`flex flex-col items-center justify-center w-14 text-[9px] font-bold transition-colors duration-200 ${
              mobileTab === 'card' ? 'text-[#FF1744] font-extrabold' : 'text-gray-400'
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
    /* 1. LANDING STATE (CLASSIC SPLIT HERO + STAT STRIP + HOW IT WORKS) */
    if (isLanding) {
      return (
        <div id="desktop-landing-container" className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-6 md:py-8 max-w-7xl mx-auto px-6 text-left animate-fade-up space-y-8 md:space-y-12">
          {/* Split Hero Grid */}
          <div 
            id="desktop-landing-grid" 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-start w-full"
          >
            
            {/* Left Column: Heading, CTA, Bullets */}
            <div className="lg:col-span-7 space-y-4 xl:space-y-5 py-2">
              
              {/* Header Tag / Trust Strip */}
              <div id="landing-trust-strip" className={`flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-200 w-fit ${language === 'ar' ? 'mr-0 ml-auto' : 'ml-0 mr-auto'}`}>
                <Shield 
                  className="w-4 h-4 text-[#0A3D62] fill-[#0A3D62]" 
                  strokeWidth={3} 
                />
                <span>{language === 'ar' ? 'نظام الثقة العقارية ' : 'Real Estate Trust System '}<strong className="font-bold">(REITS)</strong> ™️</span>
              </div>

              {/* Premium Gold Typography Hero Section with Rotator */}
              <div className="space-y-4">
                <span className="text-xs font-extrabold tracking-widest text-slate-500 uppercase block">
                  {t.heroIntro}
                </span>
                
                {/* Word-rotator container */}
                <div className="overflow-hidden h-[50px] sm:h-[65px] lg:h-[75px] xl:h-[85px] relative flex items-center justify-start">
                  <span 
                    key={activeStateIndex}
                    className={`absolute text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-gold-gradient font-serif-premium leading-none block animate-slide-up-in ${
                      activeStateIndex === 6 ? 'scale-105 transition-all duration-300' : ''
                    } ${language === 'ar' ? 'right-0' : 'left-0'}`}
                    style={{
                      animation: activeStateIndex === 6 ? 'slideUpIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, pulse 2s infinite ease-in-out' : undefined
                    }}
                  >
                    {ROTATOR_STATES[activeStateIndex].text}
                  </span>
                </div>

                {/* Progress bar container */}
                <div className="w-full max-w-[280px] h-[3px] bg-gray-150 rounded-full overflow-hidden mt-3">
                  <div 
                    key={activeStateIndex}
                    className={`h-full bg-[#0A3D62] rounded-full animate-progress-bar ${
                      isPaused ? 'animate-progress-bar-paused' : ''
                    }`}
                  />
                </div>

                {/* Navigation dots */}
                <div className="flex items-center gap-1.5 justify-start mt-3">
                  {ROTATOR_STATES.map((state, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveStateIndex(idx);
                        setIsPaused(true);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === activeStateIndex
                          ? 'bg-[#0A3D62] w-4'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      title={state.text}
                    />
                  ))}
                </div>

                <p className="text-2xl font-bold text-slate-900 leading-tight pt-2">
                  {language === 'ar' ? 'احصل عليها جميعاً الآن 👇' : 'Get them all now 👇'}
                </p>
                
                <span className="text-sm text-slate-500 font-semibold block">
                  ⭐ {t.poweredBy} <span className="text-[#FF1744]">R8</span> ESTATE
                </span>
              </div>

              {/* Strategic highlights loop */}
              <div className={`space-y-2 py-1 ${language === 'ar' ? 'border-r-2 border-gray-200 pr-4' : 'border-l-2 border-gray-200 pl-4'}`}>
                {(language === 'ar' ? [
                  { title: "توثيق عالمي", desc: "اربط السجلات التنظيمية والعقود الموثقة فوراً." },
                  { title: "هوية ثقة ممتازة", desc: "بروز فريد في رسائل البريد الإلكتروني، القوائم، والمراسلات." },
                  { title: "لا توجد نصوص مؤقتة", desc: "إحصاءاتك الحقيقية يتم تحديثها مباشرة عبر محرك المزامنة الخاص بنا." }
                ] : [
                  { title: "Universal verification", desc: "Instantly link verified regulatory registries & contracts." },
                  { title: "Premium trust identity", desc: "Stand out in emails, listings, and messages." },
                  { title: "No placeholders", desc: "Your real statistics updated live via our sync engine." }
                ]).map((h, i) => (
                  <div key={i} className="text-xs">
                    <span className="font-bold text-slate-800">{h.title}:</span>{" "}
                    <span className="text-gray-500">{h.desc}</span>
                  </div>
                ))}
              </div>

              {/* Direct CTA Button */}
              <div className="pt-2 max-w-sm">
                <Button
                  id="btn-landing-cta"
                  onClick={handleStartBuilder}
                  variant={activeStateIndex === 6 ? 'danger' : 'dark'}
                  size="lg"
                  className={`w-full flex items-center justify-center gap-2 ${
                    activeStateIndex === 6 ? 'scale-105 animate-pulse ring-4 ring-[#FF1744]/30' : ''
                  }`}
                >
                  <span>{language === 'ar' ? 'احصل على بطاقة الثقة الخاصة بي' : 'Get My Trust Card'}</span>
                  <ArrowRight className="w-4 h-4 text-[#FAC417] shrink-0 ltr:rotate-0 rtl:rotate-180" />
                </Button>
                <span className="text-xs text-slate-400 block mt-2">
                  {language === 'ar' ? '90 ثانية - معاينة فورية - بدون تسجيل' : '90 seconds - Instant preview - No signup'}
                </span>
              </div>

            </div>

            {/* Right Column: Live Output Card Preview */}
            <div className="lg:col-span-5 flex items-center justify-center py-6 lg:py-10">
              <div className="w-full scale-95 sm:scale-100 lg:scale-[1.02] xl:scale-110 origin-center duration-300 flex flex-col items-center">
                <LivePreviewCard 
                  profile={profile} 
                  activeStateIndex={activeStateIndex}
                  theme={isLanding ? (ROTATOR_STATES[activeStateIndex]?.theme || 'gold') : cardTheme}
                  language={language}
                />
              </div>
            </div>
          </div>

          {/* Stat Strip */}
          <div id="desktop-landing-stats" className="border-t border-b border-gray-200/85 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-5xl mx-auto w-full">
            {[
              { value: "100+", label: language === 'ar' ? "محترف موثق" : "Verified professionals" },
              { value: "3", label: language === 'ar' ? "دول مفعلة" : "Countries live" },
              { value: "94%", label: language === 'ar' ? "متوسط مؤشر الثقة" : "Avg trust score" },
              { value: "<12m", label: language === 'ar' ? "سرعة الاستجابة" : "Avg response time" }
            ].map((stat, idx) => (
              <StatTile
                key={idx}
                variant="light"
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>

          {/* How It Works Section */}
          <div id="desktop-landing-how" className="py-6 max-w-5xl mx-auto w-full space-y-8">
            <div className="text-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">STEPS</span>
              <h2 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">HOW IT WORKS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Verify", desc: "Link your verified land registries, professional license credentials, and corporate affiliations to authorize your public trust index." },
                { step: "2", title: "Generate", desc: "Our adaptive engine formats your transaction volumes, ratings, and experience into a high-fidelity, verified R8 trust card." },
                { step: "3", title: "Share", desc: "Embed your verified trust identity across property listings, emails, WhatsApp messages, or print QR codes." }
              ].map((card, idx) => (
                <Card key={idx} variant="clean" className="space-y-3 hover:shadow-md transition-all duration-300 p-6 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-[#0A3D62]/10 flex items-center justify-center text-xs font-extrabold text-[#0A3D62] font-heading">
                    {card.step}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide font-heading">{card.title}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{card.desc}</p>
                </Card>
              ))}
            </div>
          </div>

        </div>
      );
    }

    /* 2. BUILDER STATE (SPLIT LAYOUT DURING 12-STEPS) */
    return (
      <div id="desktop-builder-grid" className="max-w-7xl mx-auto px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-up">
        
        {/* Left Column: Form & Onboarding Wizard Container */}
        <div className="lg:col-span-7 bg-white rounded-[24px] border border-gray-200/80 p-8 md:p-10 shadow-premium-soft relative flex flex-col justify-between min-h-[560px]">
          
          <div id="builder-state-container" className="space-y-6 flex-1 flex flex-col justify-between">
            
            {/* Top Header Progress Indicator */}
            <div id="wizard-progress-header">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                <span className="text-[#0A3D62] text-xs font-semibold uppercase tracking-wider">
                  {language === 'ar' ? `الخطوة ${currentStep} من 12` : `STEP ${currentStep} OF 12`}
                </span>
                <span className="text-gray-700 font-medium text-xs">
                  {stepsList[currentStep - 1]}
                </span>
              </div>

              {/* Step indicator bars */}
              <div id="progress-bars-container" className="grid grid-cols-12 gap-1.5 mb-2">
                {stepsList.map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx + 1)}
                    title={`Step ${idx + 1}: ${st}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx + 1 === currentStep
                        ? 'bg-[#FAC417] scale-y-125 shadow-[0_0_12px_rgba(250,196,23,0.6)] animate-step-active'
                        : idx + 1 < currentStep
                        ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: GOAL SELECTION */}
            {currentStep === 1 && (
              <div id="step-1-container" className="space-y-5 text-start">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'الخطوة 1 • النتيجة الشخصية' : 'STEP 1 • PERSONALIZED OUTCOME'}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1 text-start">
                    {language === 'ar' ? `ماذا تريد أن تحقق، ${profile.name || 'أيها المحترف'}؟` : `What do you want to achieve, ${profile.name || 'Professional'}?`}
                  </h2>
                  <p className="text-sm text-gray-600 text-start">
                    {language === 'ar' ? 'اختر هدفك الرئيسي لتخصيص محرك الثقة الخاص بك.' : 'Select your primary objective to customize your trust engine.'}
                  </p>
                </div>

                <div id="goals-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {USER_GOALS.map((goal) => {
                    const isSelected = profile.selectedGoal === goal.id;
                    const gt = getGoalTranslation(goal);
                    return (
                      <button
                        key={goal.id}
                        onClick={() => updateProfile({ selectedGoal: goal.id })}
                        className={`p-4 rounded-xl border text-start transition-all ${
                          isSelected
                            ? 'bg-[#0A3D62] border-[#0A3D62] text-white shadow-sm font-bold'
                            : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{goal.icon}</span>
                          <span className={`font-semibold text-sm font-heading ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {gt.label}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                          {gt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: PROFESSION SELECTION */}
            {currentStep === 2 && (
              <div id="step-2-container" className="space-y-5 text-start">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'الخطوة 2 • محرك الثقة المتكيف' : 'STEP 2 • ADAPTIVE TRUST ENGINE'}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1 text-start">
                    {language === 'ar' ? 'ما هو تخصصك المهني الأدق؟' : 'What best describes your profession?'}
                  </h2>
                  <p className="text-sm text-gray-600 text-start">
                    {language === 'ar' ? 'يمنحك R8 ESTATE تلقائياً مؤشرات الأداء وسجلات الإثبات المناسبة لمجالك.' : 'R8 ESTATE automatically configures relevant KPIs, proof records, and verification criteria for your field.'}
                  </p>
                </div>

                <div id="professions-list" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {Object.values(PROFESSIONS_DICT).map((prof) => {
                    const isSelected = profile.professionId === prof.id;
                    const pt = getProfessionTranslation(prof);
                    return (
                      <button
                        key={prof.id}
                        onClick={() => updateProfile({ professionId: prof.id })}
                        className={`p-3.5 rounded-xl border text-start transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0A3D62] border-[#0A3D62] text-white shadow-sm font-bold'
                            : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
                        }`}
                      >
                        <div>
                          <div className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {pt.label}
                          </div>
                          <div className={`text-xs ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                            {pt.category}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: IDENTITY DETAILS */}
            {currentStep === 3 && (
              <div id="step-3-container" className="space-y-5 text-start">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {language === 'ar' ? 'الخطوة 3 • الهوية المهنية' : 'STEP 3 • PROFESSIONAL IDENTITY'}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mt-1 text-start">
                    {language === 'ar' ? 'أكد هويتك المهنية الرسمية' : 'Confirm your professional identity'}
                  </h2>
                  <p className="text-sm text-gray-600 text-start">
                    {language === 'ar' ? 'التفاصيل الواضحة للهوية تبني مصداقية أساسية فورية.' : 'Clear identity details build instant baseline credibility.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="input-profile-name" className="block text-xs font-semibold text-gray-700 mb-1 text-start">
                      {language === 'ar' ? 'الاسم الرسمي الكامل الخاص بك' : 'Your Full Official Name'}
                    </label>
                    <input
                      id="input-profile-name"
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      placeholder="e.g. Ahmed Hassan"
                      className="w-full bg-slate-50/50 border border-gray-200 rounded-[16px] px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FAC417]/20 focus:border-[#FAC417] focus:bg-white transition-all duration-300"
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
                      className="w-full bg-slate-50/50 border border-gray-200 rounded-[16px] px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FAC417]/20 focus:border-[#FAC417] focus:bg-white transition-all duration-300"
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
                      className="w-full bg-slate-50/50 border border-gray-200 rounded-[16px] px-4 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FAC417]/20 focus:border-[#FAC417] focus:bg-white transition-all duration-300"
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
                    Your R8 ESTATE Trust Card is ready!
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
              <Button
                id="btn-prev"
                onClick={handlePrev}
                variant="secondary"
                size="sm"
                className="rounded-lg flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Button>

              <Button
                id="btn-next"
                onClick={handleNext}
                variant="primary"
                size="sm"
                className="flex items-center space-x-1.5 shadow-sm font-heading"
              >
                <span>{currentStep === 12 ? "Publish My Page" : "Next Step"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

        </div>

        {/* Right Column: Premium live-sync card outcome */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="mb-4 flex items-center justify-between text-xs">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Live Output preview
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-[10px] border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sync Engine Active</span>
            </span>
          </div>
          
          <div className="w-full scale-100 transition-transform">
            <LivePreviewCard
              profile={profile}
              onOpenFullPage={onFinish}
              language={language}
            />
          </div>
        </div>

      </div>
    );
  };

  return isMobileView ? renderMobilePwa() : renderDesktopWizard();
}
