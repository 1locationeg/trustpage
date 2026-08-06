import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Award, MapPin, Briefcase, Star, CheckCircle2, 
  TrendingUp, Share2, Download, ExternalLink, Phone, Mail, MessageSquare, 
  Calendar, Check, Lock, ChevronRight, Sparkles, AlertCircle, Eye, FileText, 
  Video, Layers, Zap, ArrowUpRight, Copy, QrCode, UserCheck, Globe, Volume2, Play
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import ProofModal from './ProofModal';
import { PROFESSIONS_DICT } from '../data/professionTemplates';
import { getFallbackPhoto } from '../data/mockProfiles';
import { TRANSLATIONS } from '../data/translations';

export default function PublicTrustPage({ profile, onBackToBuilder, language = 'en' }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  
  // Interactive state
  const [selectedProof, setSelectedProof] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activeSection, setActiveSection] = useState('section-1-overview');
  const [playingMedia, setPlayingMedia] = useState(null); // { type: 'video' | 'audio', id: string }
  const [expandedVerification, setExpandedVerification] = useState(null); // ID of expanded verification block

  const activeProf = PROFESSIONS_DICT[profile.professionId || 'broker'] || PROFESSIONS_DICT.broker;

  // Extract variables with fallbacks
  const {
    name = "Ahmed Hassan",
    title = activeProf.label,
    company = "Emaar Misr",
    photo,
    specializations = [],
    locations = [],
    languages = ["English", "Arabic"],
    trustScore = 94,
    buyerConfidenceScore = 94,
    confidenceLevel = "Excellent",
    riskLevel = "Low",
    dealsClosed = 142,
    transactionVolume = "$145M+",
    yearsExp = 9,
    happyClients = 120,
    avgResponseTime = "< 12 mins",
    whatsapp = "+201001234567",
    phone = "+201001234567",
    email = "contact@r8estate.com",
    promise = activeProf.whyExperience,
    methodology = activeProf.whyProof,
    verifications = [],
    expertiseMatrix = [],
    results = [],
    proofItems = [],
    reviews = [],
    awards = [],
    memberships = [],
    completionPercentage = 96
  } = profile;

  // 7 Screens Navigation Configuration
  const sections = [
    { id: 'section-1-overview', label: language === 'ar' ? 'هل يمكنني الثقة به؟' : 'Can I Trust Him?', icon: UserCheck },
    { id: 'section-2-impact', label: language === 'ar' ? 'لماذا تختاره؟' : 'Why Choose Him?', icon: Sparkles },
    { id: 'section-3-proof', label: language === 'ar' ? 'اعرض الإثباتات' : 'Show Me The Proof', icon: Layers },
    { id: 'section-4-reviews', label: language === 'ar' ? 'ماذا يقول العملاء؟' : 'Client Testimonials', icon: Star },
    { id: 'section-5-security', label: language === 'ar' ? 'لماذا المشترون آمنون؟' : 'Why Buyers Feel Safe', icon: ShieldCheck },
    { id: 'section-6-intelligence', label: language === 'ar' ? 'تقرير الذكاء' : 'Decision Intelligence', icon: Zap },
    { id: 'section-7-cta', label: language === 'ar' ? 'اتخاذ قرار' : 'Start Decision', icon: Phone }
  ];

  // Scroll Spy Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [language]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast(language === 'ar' ? "تم نسخ الرابط الحافظة!" : "Profile link copied!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveContact = () => {
    showToast(language === 'ar' ? `تم حفظ كارت الاتصال لـ ${name}` : `vCard downloaded for ${name}!`);
  };

  const handleDownloadPDF = () => {
    showToast(language === 'ar' ? "جاري تنزيل التقرير بصيغة PDF..." : "Downloading Audited PDF Report...");
  };

  const toggleMediaPlay = (type, id) => {
    if (playingMedia && playingMedia.id === id) {
      setPlayingMedia(null);
    } else {
      setPlayingMedia({ type, id });
      showToast(
        type === 'video' 
          ? (language === 'ar' ? "تشغيل التوصية المرئية..." : "Loading video player...")
          : (language === 'ar' ? "تشغيل المذكرة الصوتية..." : "Playing voice note...")
      );
    }
  };

  const toggleVerificationExpand = (id) => {
    setExpandedVerification(expandedVerification === id ? null : id);
  };

  return (
    <div id="public-wallet-layout-root" className="min-h-screen bg-[#FAFAF9] text-[#111827] pb-24 relative selection:bg-[#0A3D62]/10 selection:text-[#0A3D62]">
      
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-8 z-50 px-4 py-3 bg-[#0B1329] text-white text-xs font-semibold rounded-xl border border-white/10 shadow-xl flex items-center gap-2 animate-fade-up">
          <Sparkles className="w-4 h-4 text-[#FAC417]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header id="public-wallet-header" className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="R8ESTATE Icon" className="h-7 w-7 object-contain" />
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">
              <span className="text-[#FF1744]">R8</span> ESTATE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-edit-builder"
              onClick={onBackToBuilder}
              className="px-3.5 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-lg border border-gray-300 transition-all font-heading"
            >
              {t.backToBuilder}
            </button>
            <button
              id="btn-share-top"
              onClick={() => setShowShareModal(true)}
              className="px-3.5 py-1.5 bg-[#FAC417] text-slate-900 font-bold text-xs rounded-full hover:bg-[#E5B210] shadow-sm flex items-center gap-1 font-heading"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'مشاركة' : 'Share'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Split screen content grid */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* DESKTOP COLUMN 1: LEFT STICKY TABS INDEX (Index styled like Wallet menu) */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-4">
            
            {/* Minimal card header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 text-start shadow-sm">
              <div className="flex items-center gap-3">
                <img src={photo || getFallbackPhoto(name)} alt={name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm font-heading leading-tight">{name}</h3>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">{company}</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div className="bg-[#FAC417] h-1 rounded-full" style={{ width: `${completionPercentage}%` }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                <span>{language === 'ar' ? 'نسبة الفحص:' : 'Audited Score'}</span>
                <span className="text-[#0A3D62]">{completionPercentage}%</span>
              </div>
            </div>

            {/* Sticky vertical navigation index */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-1 text-start shadow-sm">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-3 mb-2 block">
                {language === 'ar' ? 'رحلة اتخاذ القرار' : 'DECISION STAGES'}
              </span>
              <nav className="space-y-0.5">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollTo(sec.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-all text-start ${
                        isActive 
                          ? 'bg-[#0A3D62] text-white' 
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FAC417]' : 'text-gray-400'}`} />
                      <span className="truncate">{sec.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

          </div>
        </aside>

        {/* COLUMN 2: 7 STANDALONE MOBILE APP SCREENS (Right side scroll container) */}
        <main className="col-span-1 lg:col-span-8 space-y-16 pb-24">
          
          {/* SECTION 1: CAN I TRUST HIM? */}
          <section id="section-1-overview" className="min-h-[70vh] flex flex-col justify-center max-w-md mx-auto">
            <div className="bg-[#0B1329] text-white rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl space-y-6 text-center animate-card-shine relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-[#FAC417] to-emerald-500" />
              
              {/* Header profile details */}
              <div className="space-y-2 pt-2">
                <div className="relative inline-block">
                  <img
                    src={photo || getFallbackPhoto(name)}
                    alt={name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#FAC417] mx-auto shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 bg-[#FAC417] text-slate-900 p-0.5 rounded-full border-2 border-[#0B1329]">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-black font-heading leading-tight tracking-tight">{name}</h2>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                    {language === 'ar' ? 'محترف معتمد' : 'Verified Professional'}
                  </span>
                </div>
              </div>

              {/* Core metrics dashboard (Wallet-style) */}
              <div className="grid grid-cols-3 gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-black tracking-wider">{language === 'ar' ? 'مؤشر الثقة' : 'Trust Score'}</div>
                  <div className="text-xl font-black text-[#FAC417] font-heading mt-0.5">{trustScore}</div>
                </div>
                <div className="border-x border-white/10">
                  <div className="text-[9px] text-slate-400 uppercase font-black tracking-wider">{language === 'ar' ? 'نسبة المطابقة' : 'Confidence'}</div>
                  <div className="text-xl font-black text-emerald-400 font-heading mt-0.5">{buyerConfidenceScore}%</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-black tracking-wider">{language === 'ar' ? 'المخاطر' : 'Risk'}</div>
                  <div className="text-xl font-black text-emerald-400 font-heading mt-0.5">{riskLevel}</div>
                </div>
              </div>

              {/* Core quick details line */}
              <div className="flex justify-center items-center gap-2 text-xs text-slate-300">
                <div className="flex gap-0.5 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-bold">({reviews.length} {language === 'ar' ? 'تقييمات' : 'Reviews'})</span>
                <span className="text-slate-500">•</span>
                <span className="font-bold text-[#FAC417]">{dealsClosed} {language === 'ar' ? 'صفقة' : 'Deals'}</span>
              </div>

              {/* Interactive verification checklists */}
              <div className="bg-white/5 rounded-2xl p-4 grid grid-cols-2 gap-2 text-start text-xs border border-white/10">
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 font-bold shrink-0" />
                  <span>{language === 'ar' ? 'الرمز التعريفي' : '✓ Identity'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 font-bold shrink-0" />
                  <span>{language === 'ar' ? 'السجل التجاري' : '✓ Company'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 font-bold shrink-0" />
                  <span>{language === 'ar' ? 'رخصة حكومية' : '✓ License'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 font-bold shrink-0" />
                  <span>{language === 'ar' ? 'تقييمات حقيقية' : '✓ Reviews'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 font-bold shrink-0" />
                  <span>{language === 'ar' ? 'عوائد مدققة' : '✓ Results'}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 font-bold shrink-0" />
                  <span>{language === 'ar' ? 'عقود مسجلة' : '✓ Proof'}</span>
                </div>
              </div>

              {/* Primary action buttons inside fold */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button 
                  onClick={() => handleScrollTo('section-7-cta')}
                  className="py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs shadow-sm transition-all"
                >
                  {language === 'ar' ? 'تواصل معي' : 'Contact Now'}
                </button>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          </section>

          {/* SECTION 2: WHY SHOULD I CHOOSE HIM? */}
          <section id="section-2-impact" className="min-h-[70vh] flex flex-col justify-center max-w-md mx-auto space-y-6 text-start">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{language === 'ar' ? 'القيمة المضافة' : 'DECISION IMPACT'}</span>
              <h2 className="text-xl font-black text-gray-900 font-heading mt-0.5">{language === 'ar' ? 'ما العائد المالي الذي يحققه؟' : 'Why Should I Choose Him?'}</h2>
            </div>

            {/* Apple Health style large impact cards */}
            <div className="space-y-4">
              
              <div className="p-5 bg-white border border-gray-200 rounded-3xl shadow-sm flex items-center justify-between hover-lift-premium">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{language === 'ar' ? 'رؤوس الأموال الموفرة للعملاء' : 'SAVED CLIENT CAPITAL'}</span>
                  <span className="text-2xl font-black text-[#0A3D62] font-heading block">EGP 150M+</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {language === 'ar' ? 'معتمد' : 'Verified'}
                </span>
              </div>

              <div className="p-5 bg-white border border-gray-200 rounded-3xl shadow-sm flex items-center justify-between hover-lift-premium">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{language === 'ar' ? 'متوسط الأرباح للمستثمرين' : 'AVERAGE DELIVERED ROI'}</span>
                  <span className="text-2xl font-black text-slate-900 font-heading block">35% Avg ROI</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {language === 'ar' ? 'معتمد' : 'Verified'}
                </span>
              </div>

              <div className="p-5 bg-white border border-gray-200 rounded-3xl shadow-sm flex items-center justify-between hover-lift-premium">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{language === 'ar' ? 'العائلات التي تمت مساعدتها' : 'FAMILIES ASSISTED'}</span>
                  <span className="text-2xl font-black text-[#0A3D62] font-heading block">120+ Families</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {language === 'ar' ? 'معتمد' : 'Verified'}
                </span>
              </div>

            </div>
          </section>

          {/* SECTION 3: SHOW ME THE PROOF */}
          <section id="section-3-proof" className="min-h-[70vh] flex flex-col justify-center max-w-md mx-auto space-y-6 text-start">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{language === 'ar' ? 'مستندات الإثبات' : 'AUDITED PROOF'}</span>
              <h2 className="text-xl font-black text-gray-900 font-heading mt-0.5">{language === 'ar' ? 'اعرض مستندات وأدلة الصفقات' : 'Show Me The Proof'}</h2>
            </div>

            {/* Apple Wallet-like proof stack */}
            <div className="space-y-3">
              {proofItems.map((item, index) => {
                let symbol = "📄";
                if (index === 1) symbol = "📸";
                if (index >= 2) symbol = "🎥";

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedProof(item)}
                    className="p-5 bg-[#0B1329] text-white rounded-3xl border border-white/10 flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-all shadow-md group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl shrink-0">{symbol}</span>
                      <div className="text-start">
                        <span className="text-[10px] text-[#FAC417] font-black uppercase tracking-wider block">{item.type}</span>
                        <h4 className="font-bold text-xs font-heading leading-tight truncate max-w-[200px]">{item.title}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase group-hover:text-white transition-colors">
                      <span>{language === 'ar' ? 'اضغط للمطابقة' : 'Tap Audits'}</span>
                      <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 4: WHAT DO CLIENTS SAY? */}
          <section id="section-4-reviews" className="min-h-[70vh] flex flex-col justify-center max-w-md mx-auto space-y-6 text-start">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{language === 'ar' ? 'آراء وتوصيات' : 'ENDORSEMENTS'}</span>
              <h2 className="text-xl font-black text-gray-900 font-heading mt-0.5">{language === 'ar' ? 'ماذا يقول المستثمرون والشركاء؟' : 'What Do Clients Say?'}</h2>
            </div>

            {/* Netflix-style horizontal reviews list */}
            <div className="space-y-4">
              
              {/* Media recommendations players */}
              <div className="grid grid-cols-1 gap-2">
                <div 
                  onClick={() => toggleMediaPlay('video', 'vid-net-1')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    playingMedia && playingMedia.id === 'vid-net-1' ? 'bg-[#0A3D62] text-white border-[#0A3D62]' : 'bg-white text-slate-800 border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                      <Video className="w-4 h-4" />
                    </div>
                    <div className="text-start">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Karim Al-Fayed</span>
                      <h4 className="font-bold text-xs">"Best investment advisor."</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" />
                    <span>{language === 'ar' ? 'شاهد' : 'Watch'}</span>
                  </span>
                </div>

                <div 
                  onClick={() => toggleMediaPlay('audio', 'aud-net-1')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    playingMedia && playingMedia.id === 'aud-net-1' ? 'bg-[#0A3D62] text-white border-[#0A3D62]' : 'bg-white text-slate-800 border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div className="text-start">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase">Sarah Refaat</span>
                      <h4 className="font-bold text-xs">"Helped us save 2M"</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current" />
                    <span>{language === 'ar' ? 'شاهد' : 'Watch'}</span>
                  </span>
                </div>
              </div>

              {/* Text review checklist */}
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm text-start space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-800 block">{rev.author}</span>
                        <span className="text-[9px] text-gray-400 uppercase font-semibold">{rev.relationship}</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded text-[8px] font-black uppercase">
                        {language === 'ar' ? 'موثق' : 'Verified'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* SECTION 5: WHY BUYERS FEEL SAFE */}
          <section id="section-5-security" className="min-h-[70vh] flex flex-col justify-center max-w-md mx-auto space-y-6 text-start">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{language === 'ar' ? 'الفحص والحماية' : 'SECURITY & VERIFICATION'}</span>
              <h2 className="text-xl font-black text-gray-900 font-heading mt-0.5">{language === 'ar' ? 'لماذا يشعر المستثمرون بالأمان؟' : 'Why Buyers Feel Safe'}</h2>
            </div>

            {/* Verification checklist with slide-disclosure details */}
            <div className="space-y-2.5">
              
              <div 
                onClick={() => toggleVerificationExpand('ident')}
                className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#0A3D62] transition-all shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 font-black" />
                    <span className="font-bold text-xs text-slate-800 font-heading">{language === 'ar' ? 'التحقق من الهوية الشخصية' : 'Identity Verified'}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedVerification === 'ident' ? 'rotate-90' : ''}`} />
                </div>
                {expandedVerification === 'ident' && (
                  <p className="text-[11px] text-gray-500 border-t border-gray-100 pt-2 animate-fade-up">
                    {language === 'ar' ? "تم التحقق ومطابقة الاسم بالكامل مع بطاقة الهوية القومية بمعدل تطابق 100%." : "Identity documents and national registries fully matched. Checked 100% clean check by R8 Core on Jan 12, 2024."}
                  </p>
                )}
              </div>

              <div 
                onClick={() => toggleVerificationExpand('comp')}
                className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#0A3D62] transition-all shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 font-black" />
                    <span className="font-bold text-xs text-slate-800 font-heading">{language === 'ar' ? 'التحقق من السجل التجاري' : 'Company Affiliation Verified'}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedVerification === 'comp' ? 'rotate-90' : ''}`} />
                </div>
                {expandedVerification === 'comp' && (
                  <p className="text-[11px] text-gray-500 border-t border-gray-100 pt-2 animate-fade-up">
                    {language === 'ar' ? "الشركة العقارية مقيدة في السجل التجاري التجاري النشط وصالحة للتعامل المالي." : "Active business register filing and corporate bank account credentials verified on Mar 18, 2024."}
                  </p>
                )}
              </div>

              <div 
                onClick={() => toggleVerificationExpand('lic')}
                className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#0A3D62] transition-all shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 font-black" />
                    <span className="font-bold text-xs text-slate-800 font-heading">{language === 'ar' ? 'رخصة سارية معتمدة' : 'Government License Active'}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedVerification === 'lic' ? 'rotate-90' : ''}`} />
                </div>
                {expandedVerification === 'lic' && (
                  <p className="text-[11px] text-gray-500 border-t border-gray-100 pt-2 animate-fade-up">
                    {language === 'ar' ? "رخصة السمسرة العقارية الحكومية سارية وتخضع للرقابة المالية." : "Official real estate brokerage license audited and verified active. License Registry verified on Feb 04, 2024."}
                  </p>
                )}
              </div>

              <div 
                onClick={() => toggleVerificationExpand('trans')}
                className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#0A3D62] transition-all shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 font-black" />
                    <span className="font-bold text-xs text-slate-800 font-heading">{language === 'ar' ? 'معاملات حقيقية مسجلة' : 'Real Transactions Registered'}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedVerification === 'trans' ? 'rotate-90' : ''}`} />
                </div>
                {expandedVerification === 'trans' && (
                  <p className="text-[11px] text-gray-500 border-t border-gray-100 pt-2 animate-fade-up">
                    {language === 'ar' ? "تم التحقق من حسابات الضمان وعقود الإغلاق للمستثمرين في الصفقات العقارية." : "Transaction contracts and escrow accounts audited against actual developer ledgers."}
                  </p>
                )}
              </div>

              <div 
                onClick={() => toggleVerificationExpand('comp_free')}
                className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#0A3D62] transition-all shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 font-black" />
                    <span className="font-bold text-xs text-slate-800 font-heading">{language === 'ar' ? 'سجل خالي من الشكاوى' : 'No Consumer Complaints'}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedVerification === 'comp_free' ? 'rotate-90' : ''}`} />
                </div>
                {expandedVerification === 'comp_free' && (
                  <p className="text-[11px] text-gray-500 border-t border-gray-100 pt-2 animate-fade-up">
                    {language === 'ar' ? "تم التدقيق في وزارة التموين وجهاز حماية المستهلك وتبين عدم وجود شكاوى نشطة." : "Checked consumer protection registers and court records. 0 disputes or claims filed in the last 24 months."}
                  </p>
                )}
              </div>

            </div>
          </section>

          {/* SECTION 6: DECISION INTELLIGENCE WIDGET */}
          <section id="section-6-intelligence" className="min-h-[70vh] flex flex-col justify-center max-w-md mx-auto space-y-6 text-start">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{language === 'ar' ? 'تحليل الفرص والملائمة' : 'INTELLIGENCE SUMMARY'}</span>
              <h2 className="text-xl font-black text-gray-900 font-heading mt-0.5">{language === 'ar' ? 'تقرير المطابقة للمستثمرين' : 'Intelligence Match'}</h2>
            </div>

            {/* Single Beautiful Hero Intelligence Widget */}
            <div className="bg-[#0B1329] text-white rounded-3xl p-6 border border-white/10 shadow-xl space-y-6">
              
              <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{language === 'ar' ? 'مؤشر الثقة' : 'CONFIDENCE SCORE'}</span>
                  <span className="text-4xl font-black text-[#FAC417] font-heading block">{buyerConfidenceScore}%</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{language === 'ar' ? 'نسبة المخاطر' : 'DECISION RISK'}</span>
                  <span className="text-4xl font-black text-emerald-400 font-heading block">{riskLevel.toUpperCase()}</span>
                </div>
              </div>

              {/* Best for categories grid */}
              <div className="space-y-3">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">{language === 'ar' ? 'الملائمة للمشتري' : 'BEST MATCH FOR'}</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
                    {language === 'ar' ? 'مستثمرين' : 'HNWI Investors'}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
                    {language === 'ar' ? 'عقارات فاخرة' : 'Luxury Buyers'}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
                    {language === 'ar' ? 'المشاريع قيد الإنشاء' : 'Pre-Construction'}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200">
                    {language === 'ar' ? 'عائلات' : 'Families'}
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 7: CONVERSION HUB (Apple Pay Style CTA) */}
          <section id="section-7-cta" className="min-h-[70vh] flex flex-col justify-center max-w-md mx-auto space-y-6 text-start">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{language === 'ar' ? 'اتخاذ القرار' : 'READY TO DECIDE?'}</span>
              <h2 className="text-xl font-black text-gray-900 font-heading mt-0.5">{language === 'ar' ? 'ابدأ العمل مع أحمد حسن' : `Ready to work with ${name}?`}</h2>
            </div>

            {/* Apple Pay-style action stacked list */}
            <div className="space-y-2.5">
              
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-sm flex items-center justify-between px-5 transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  <span>{language === 'ar' ? 'تواصل عبر WhatsApp' : 'Chat on WhatsApp'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200" />
              </a>

              <a
                href={profile.meetingUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-[#FAC417] hover:bg-[#E5B210] text-slate-900 font-bold rounded-2xl shadow-sm flex items-center justify-between px-5 transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 shrink-0" />
                  <span>{language === 'ar' ? 'احجز اجتماعاً خاصاً' : 'Book Private Meeting'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-700" />
              </a>

              <a
                href={`tel:${phone}`}
                className="w-full py-4 bg-[#0B1329] hover:bg-slate-900 text-white font-bold rounded-2xl shadow-sm flex items-center justify-between px-5 transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-[#FAC417]" />
                  <span>{language === 'ar' ? 'اتصال مباشر' : 'Call Direct Phone'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <button
                onClick={handleSaveContact}
                className="w-full py-4 bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-bold rounded-2xl shadow-sm flex items-center justify-between px-5 transition-all text-xs text-start"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 shrink-0 text-gray-400" />
                  <span>{language === 'ar' ? 'حفظ بطاقة الاتصال (vCard)' : 'Save Contact Card'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="w-full py-4 bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-bold rounded-2xl shadow-sm flex items-center justify-between px-5 transition-all text-xs text-start"
              >
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 shrink-0 text-gray-400" />
                  <span>{language === 'ar' ? 'مشاركة الهوية الموثقة' : 'Share Trust Profile'}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

            </div>
          </section>

        </main>
      </div>

      {/* MOBILE STICKY BOTTOM NAVIGATION BAR */}
      <nav id="mobile-bottom-nav" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 flex items-center justify-around lg:hidden shadow-lg">
        {sections.slice(0, 5).map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => handleScrollTo(sec.id)}
              className={`flex flex-col items-center gap-1 text-[9px] font-extrabold transition-all uppercase tracking-wider ${
                isActive ? 'text-[#0A3D62] scale-105' : 'text-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#FAC417]' : 'text-gray-400'}`} />
              <span>{sec.label.split(' ')[0]}</span>
            </button>
          );
        })}
        {/* Contact shortcut */}
        <button
          onClick={() => handleScrollTo('section-7-cta')}
          className={`flex flex-col items-center gap-1 text-[9px] font-extrabold transition-all uppercase tracking-wider ${
            activeSection === 'section-7-cta' ? 'text-[#0A3D62] scale-105' : 'text-gray-400'
          }`}
        >
          <Phone className={`w-5 h-5 ${activeSection === 'section-7-cta' ? 'text-[#FAC417]' : 'text-gray-400'}`} />
          <span>{language === 'ar' ? 'تواصل' : 'Contact'}</span>
        </button>
      </nav>

      {/* Proof center modal */}
      {selectedProof && (
        <ProofModal proofItem={selectedProof} onClose={() => setSelectedProof(null)} />
      )}

      {/* Share page overlay modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border border-gray-200 text-center text-slate-900 shadow-2xl space-y-4 animate-scale-up">
            <button 
              onClick={() => setShowShareModal(false)} 
              className={`absolute top-4 text-gray-400 hover:text-gray-600 font-bold ${language === 'ar' ? 'left-4' : 'right-4'}`}
            >
              ✕
            </button>
            <h3 className="text-lg font-black text-[#0A3D62] font-heading">{language === 'ar' ? 'مشاركة الهوية الموثقة' : 'Share Verified Identity'}</h3>
            <p className="text-xs text-gray-500">{language === 'ar' ? 'امسح الرمز أو انسخ الرابط لمشاركتها مع شركائك.' : 'Scan QR code or copy link to share verified profile with partners.'}</p>
            
            <div className="p-4 bg-white border border-gray-200 rounded-2xl inline-block shadow-sm mx-auto">
              <QRCodeSVG value={window.location.href} size={160} />
            </div>

            <div className="space-y-2 pt-2">
              <button 
                onClick={handleCopyLink} 
                className="w-full py-3 bg-[#FAC417] hover:bg-[#E5B210] text-slate-900 font-black text-xs rounded-xl font-heading transition-all"
              >
                {copiedLink ? (language === 'ar' ? "تم النسخ!" : "Copied!") : (language === 'ar' ? "نسخ رابط الملف الشخصي" : "Copy Profile Link")}
              </button>
              <button 
                onClick={handleDownloadPDF} 
                className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                {language === 'ar' ? 'تنزيل التقرير المدقق (PDF)' : 'Download Audited PDF'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
