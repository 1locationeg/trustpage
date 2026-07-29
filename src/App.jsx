import React, { useState, useEffect } from 'react';
import { ShieldCheck, Layout, Eye, UserCheck, ArrowRight, Download, Smartphone, Monitor, Check, Star } from 'lucide-react';
import { DEFAULT_PROFILE, MOCK_PRESETS } from './data/mockProfiles';
import LivePreviewCard from './components/LivePreviewCard';
import OnboardingWizard from './components/OnboardingWizard';
import PublicTrustPage from './components/PublicTrustPage';

export default function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [viewMode, setViewMode] = useState('builder'); // 'builder' | 'public' | 'card'
  const [selectedPresetId, setSelectedPresetId] = useState('ahmed-hassan');
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile_sim'
  const [actualMobile, setActualMobile] = useState(false);
  const [timeString, setTimeString] = useState("09:41");
  
  // Check if we are running in the production environment (live website)
  const isProduction = typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1';

  // App-level Visual Editor mode: 'visual_flat' | 'interactive'
  // Default to 'interactive' in production so users see the live site, and 'visual_flat' locally
  const [appMode, setAppMode] = useState(isProduction ? 'interactive' : 'visual_flat');

  // Keyboard Shortcut Alt + S to toggle modes (only active locally)
  useEffect(() => {
    if (isProduction) return;
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setAppMode((prev) => (prev === 'visual_flat' ? 'interactive' : 'visual_flat'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProduction]);

  // Visual Editor Click Bypass: Hold Ctrl, Cmd, or Shift while clicking to interact (only active locally)
  useEffect(() => {
    if (isProduction) return;
    const handleCaptureClick = (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        const clickable = e.target.closest('button, select, a, [role="button"]');
        if (clickable) {
          // Stop visual editor bridge from intercepting the click
          e.stopPropagation();
          if (e.isTrusted) {
            e.preventDefault();
            // Dispatch a normal click event that will bubble to React onClick handlers
            const newEvent = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            clickable.dispatchEvent(newEvent);
          }
        }
      }
    };
    window.addEventListener('click', handleCaptureClick, true); // true = capture phase!
    return () => window.removeEventListener('click', handleCaptureClick, true);
  }, [isProduction]);


  // Detect actual mobile screen sizes
  useEffect(() => {
    const handleResize = () => {
      setActualMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simple clock for simulated phone header
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePresetChange = (presetId) => {
    setSelectedPresetId(presetId);
    const found = MOCK_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setProfile(found.data);
    }
  };

  const isMobileView = actualMobile || deviceMode === 'mobile_sim';

  return (
    <div id="app-root" className="min-h-[100dvh] bg-[#FAFAF9] text-[#111827] font-sans antialiased selection:bg-[#0A3D62]/10 selection:text-[#0A3D62] flex flex-col justify-between relative pb-16">
      
      {/* 1. Global Header Bar */}
      <header id="global-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand area */}
          <div className="flex items-center space-x-3">
            <div id="app-brand-logo" className="flex items-center">
              <img
                src="/r8estate-logo.svg"
                alt="R8ESTATE Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <span className="text-[11px] text-gray-400 font-extrabold uppercase tracking-wider hidden sm:inline border-l border-gray-200 pl-3">
              Decision Intelligence
            </span>
          </div>

          {/* Device & View Switchers Wrapper (Active only in Sandbox mode) */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {appMode === 'interactive' ? (
              <div className="flex flex-wrap items-center gap-2">
                {/* Active Mode selector */}
                <div className="flex items-center p-1 bg-gray-150 rounded-lg text-xs font-semibold border border-gray-200">
                  <button
                    id="btn-mode-builder"
                    onClick={() => setViewMode('builder')}
                    className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                      viewMode === 'builder'
                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Layout className="w-3.5 h-3.5 pointer-events-none" />
                    <span className="pointer-events-none">Builder</span>
                  </button>

                  <button
                    id="btn-mode-public"
                    onClick={() => setViewMode('public')}
                    className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                      viewMode === 'public'
                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 pointer-events-none" />
                    <span className="pointer-events-none">Page Preview</span>
                  </button>

                  <button
                    id="btn-mode-card"
                    onClick={() => setViewMode('card')}
                    className={`px-3 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                      viewMode === 'card'
                        ? 'bg-white text-slate-900 shadow-sm font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5 pointer-events-none" />
                    <span className="pointer-events-none">Trust Card</span>
                  </button>
                </div>

                {/* Device Switcher Toggle */}
                {!actualMobile && (
                  <div className="flex items-center p-1 bg-gray-150 rounded-lg text-xs font-semibold border border-gray-200">
                    <button
                      id="btn-device-desktop"
                      onClick={() => setDeviceMode('desktop')}
                      className={`px-2.5 py-1.5 rounded-md transition-all flex items-center space-x-1 ${
                        deviceMode === 'desktop'
                          ? 'bg-white text-slate-900 shadow-sm font-bold'
                          : 'text-gray-500 hover:text-slate-900'
                      }`}
                      title="View Desktop Site"
                    >
                      <Monitor className="w-3.5 h-3.5 pointer-events-none" />
                      <span className="pointer-events-none">Desktop</span>
                    </button>
                    
                    <button
                      id="btn-device-mobile"
                      onClick={() => setDeviceMode('mobile_sim')}
                      className={`px-2.5 py-1.5 rounded-md transition-all flex items-center space-x-1 ${
                        deviceMode === 'mobile_sim'
                          ? 'bg-white text-slate-900 shadow-sm font-bold'
                          : 'text-gray-500 hover:text-slate-900'
                      }`}
                      title="View Mobile PWA App"
                    >
                      <Smartphone className="w-3.5 h-3.5 pointer-events-none" />
                      <span className="pointer-events-none">Mobile PWA</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-xs bg-[#FAC417]/10 text-slate-900 px-3 py-1.5 rounded-lg border border-[#FAC417]/25 font-bold uppercase tracking-wider">
                🛠️ Visual Editing Mode (Flat Layout)
              </span>
            )}

            {/* Preset Selector */}
            <div className="flex items-center">
              <select
                id="preset-select"
                value={selectedPresetId}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950"
              >
                {MOCK_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Inspiration Header Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-600">
              <button className="hover:text-slate-900">EN</button>
              <span className="text-gray-300">/</span>
              <button className="hover:text-slate-900 font-arabic">ع</button>
            </div>
            <button className="text-xs font-bold text-gray-600 hover:text-slate-900">
              Sign in
            </button>
            <button 
              onClick={() => { setViewMode('builder'); setDeviceMode('desktop'); setAppMode('interactive'); }}
              className="px-4 py-2 bg-slate-950 text-white hover:bg-slate-900 font-bold text-xs rounded-full shadow-sm flex items-center space-x-1 transition-all"
            >
              <span>Get started</span>
              <ArrowRight className="w-3 h-3 text-[#FAC417]" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Layout Area */}
      <div id="main-content-wrapper" className="flex-1 flex flex-col bg-[#FAFAF9]">
        
        {/* APP MODE 1: VISUAL FLAT EDITOR VIEW */}
        {appMode === 'visual_flat' ? (
          <main id="flat-editor-layout" className="max-w-[1600px] mx-auto px-6 py-8 space-y-12 w-full text-left">
            
            {/* Context Info Banner */}
            <div id="flat-banner-info" className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-slate-800">
              <div>
                <h1 className="text-xl font-bold font-heading text-white">Visual Editing Mode Enabled</h1>
                <p className="text-xs text-gray-400 mt-1">
                  All screens and forms are laid out flat. **To click buttons or select options, HOLD the Ctrl key (or Shift / Cmd) while clicking them.** Press **Alt + S** or use the switcher below to Turn Off Visual Edit.
                </p>
              </div>
              <button 
                onClick={() => setAppMode('interactive')}
                className="px-4 py-2 bg-[#FAC417] text-slate-950 hover:bg-[#E5B210] font-bold text-xs rounded-xl shadow-sm whitespace-nowrap"
              >
                Turn Off Visual Edit
              </button>
            </div>

            {/* Row A: Landings & Outcome Card */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              
              {/* Panel 1: Desktop Hero Landing */}
              <section id="flat-panel-desktop-landing" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Panel 1 · Desktop Hero Area</span>
                  <span className="text-[9px] bg-slate-100 text-slate-700 font-extrabold px-1.5 py-0.5 rounded">Desktop</span>
                </div>
                
                <div className="text-center space-y-6 max-w-sm mx-auto">
                  <div className="mx-auto flex items-center justify-center space-x-2 text-[10px] font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 w-fit">
                    <span>Egypt · UAE · Saudi Arabia Verified</span>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase block">FOR REAL ESTATE PROFESSIONALS</span>
                    <h2 className="text-4xl font-black text-gold-gradient font-serif-premium leading-tight">MORE CLIENTS</h2>
                    <p className="text-lg font-bold text-slate-900">Get them all now 👇</p>
                    <span className="text-xs text-slate-400 font-semibold block">⭐ Powered by R8ESTATE</span>
                  </div>

                  <button className="w-full py-3.5 bg-slate-950 text-white font-bold text-xs rounded-full flex items-center justify-center space-x-2">
                    <span>Get My Trust Card</span>
                    <ArrowRight className="w-4 h-4 text-[#FAC417]" />
                  </button>
                  <span className="text-[10px] text-slate-400 block mt-1">90 seconds - Instant preview - No signup</span>
                </div>
              </section>

              {/* Panel 2: Mobile PWA Landing */}
              <section id="flat-panel-mobile-landing" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Panel 2 · Mobile PWA Landing</span>
                  <span className="text-[9px] bg-slate-100 text-slate-700 font-extrabold px-1.5 py-0.5 rounded">Mobile PWA</span>
                </div>

                <div className="max-w-xs mx-auto border border-gray-200 rounded-[32px] p-5 bg-white shadow-sm flex flex-col justify-between min-h-[420px]">
                  <div className="flex items-center justify-center space-x-2 text-[9px] font-semibold text-gray-500 bg-gray-50 p-1.5 rounded-lg border border-gray-200 w-full mb-4">
                    <span>Egypt · UAE · Saudi Arabia Verified</span>
                  </div>
                  
                  <div className="text-center space-y-3 my-auto">
                    <span className="text-[8px] font-extrabold tracking-widest text-[#0A3D62] uppercase block">FOR REAL ESTATE PROFESSIONALS</span>
                    <h3 className="text-3xl font-extrabold text-gold-gradient font-serif-premium leading-none">MORE CLIENTS</h3>
                    <p className="text-sm font-bold text-gray-800 leading-tight">Get them all now 👇</p>
                    <span className="text-[9px] text-gray-400 font-semibold block">⭐ Powered by R8ESTATE</span>

                    <button className="w-full py-3 bg-slate-950 text-white font-bold text-xs rounded-full flex items-center justify-center space-x-2">
                      <span>Get My Trust Card</span>
                      <ArrowRight className="w-4 h-4 text-[#FAC417]" />
                    </button>
                    <span className="text-[8px] text-gray-400 block mt-1">90 seconds - Instant preview - No signup</span>
                  </div>
                </div>
              </section>

              {/* Panel 3: Live Output Card (Editable) */}
              <section id="flat-panel-live-card" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Panel 3 · Premium Dark Gold Card</span>
                  <span className="text-[9px] bg-slate-100 text-slate-700 font-extrabold px-1.5 py-0.5 rounded">Core Outcome</span>
                </div>
                <div className="scale-95 origin-top">
                  <LivePreviewCard profile={profile} />
                </div>
              </section>

            </div>

            {/* Row B: Mobile PWA Overview & Flat Onboarding Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Panel 4: Mobile PWA Overview Dashboard */}
              <section id="flat-panel-mobile-dashboard" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Panel 4 · Mobile PWA Dashboard</span>
                  <span className="text-[9px] bg-slate-100 text-slate-700 font-extrabold px-1.5 py-0.5 rounded">Analytics</span>
                </div>
                
                <div className="max-w-sm mx-auto border border-gray-200 rounded-[32px] p-5 bg-[#FAFAF9] shadow-sm space-y-5">
                  <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Trust Analytics</span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">High Confidence</span>
                    </div>
                    <div className="flex items-center justify-around py-2">
                      <div className="text-center">
                        <span className="text-2xl font-extrabold text-slate-900 block font-heading">{profile.trustScore}%</span>
                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Trust Score</span>
                      </div>
                      <div className="h-8 w-px bg-gray-200" />
                      <div className="text-center">
                        <span className="text-2xl font-extrabold text-[#0A3D62] block font-heading">{profile.opportunityScore}</span>
                        <span className="text-[9px] text-gray-400 font-semibold uppercase">Opportunity</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-[#0A3D62] h-1.5 rounded-full w-[96%]" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span>Profile Completion</span>
                      <span className="font-bold text-[#0A3D62]">{profile.completionPercentage}%</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">Next Steps Checklist</span>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center space-x-3 shadow-sm text-xs">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Define Profession Profile (Active)</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center space-x-3 shadow-sm text-xs">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Set Official Identity ({profile.name})</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center space-x-3 shadow-sm text-xs">
                      <Star className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Upload Professional Photo</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Panel 5: Mobile PWA Accordion Forms (Fully Flattened) */}
              <section id="flat-panel-mobile-editors" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Panel 5 · Mobile PWA Input Forms</span>
                  <span className="text-[9px] bg-slate-100 text-slate-700 font-extrabold px-1.5 py-0.5 rounded">All Fields</span>
                </div>
                
                <div className="max-w-md mx-auto w-full">
                  <OnboardingWizard
                    profile={profile}
                    setProfile={setProfile}
                    onFinish={() => setViewMode('public')}
                    isMobileView={true}
                    flatMode={true}
                  />
                </div>
              </section>

            </div>

          </main>
        ) : (
          /* APP MODE 2: INTERACTIVE preview router */
          <div id="interactive-sandbox-layout" className="flex-1 flex flex-col bg-[#FAFAF9]">
            {isMobileView ? (
              actualMobile ? (
                /* Actual Mobile Screen - Full width responsive native view (Safe Area Aware) */
                <main id="pwa-native-main" className="flex-1 flex flex-col min-h-[90vh] bg-white relative pb-safe-bottom pt-safe-top">
                  {viewMode === 'builder' && (
                    <OnboardingWizard
                      profile={profile}
                      setProfile={setProfile}
                      onFinish={() => setViewMode('public')}
                      isMobileView={true}
                    />
                  )}
                  {viewMode === 'public' && (
                    <div className="flex-1 overflow-y-auto pb-12">
                      <PublicTrustPage
                        profile={profile}
                        onBackToBuilder={() => setViewMode('builder')}
                      />
                    </div>
                  )}
                  {viewMode === 'card' && (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-950 text-white min-h-[80vh] relative">
                      <div className="mb-4">
                        <h2 className="text-lg font-bold font-heading text-[#FAC417]">Your Trust Card</h2>
                      </div>
                      <LivePreviewCard profile={profile} onOpenFullPage={() => setViewMode('public')} />
                    </div>
                  )}
                </main>
              ) : (
                /* Desktop Screen Simulator - Renders iPhone Bezel Mockup with Status & Home Indicator */
                <main id="pwa-simulator-main" className="flex-1 flex flex-col items-center justify-center py-8 px-4 bg-slate-50 min-h-[85vh]">
                  <div className="phone-bezel animate-gold-glow">
                    
                    {/* Simulated Notch */}
                    <div className="phone-notch">
                      <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
                    </div>

                    {/* Simulated Screen Body */}
                    <div className="phone-screen bg-white">
                      
                      {/* Status Bar */}
                      <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[10px] text-gray-500 font-bold bg-white relative z-20">
                        <span>{timeString}</span>
                        <div className="flex items-center space-x-1">
                          <span>5G</span>
                          <div className="w-4 h-2.5 border border-gray-400 rounded-sm p-px flex items-center">
                            <div className="h-full bg-gray-600 rounded-sm w-full" />
                          </div>
                        </div>
                      </div>

                      {/* Simulated App Router viewport */}
                      <div className="flex-1 flex flex-col overflow-y-auto relative">
                        {viewMode === 'builder' && (
                          <OnboardingWizard
                            profile={profile}
                            setProfile={setProfile}
                            onFinish={() => setViewMode('public')}
                            isMobileView={true}
                          />
                        )}
                        {viewMode === 'public' && (
                          <div className="flex-1 overflow-y-auto pb-12">
                            <PublicTrustPage
                              profile={profile}
                              onBackToBuilder={() => setViewMode('builder')}
                            />
                          </div>
                        )}
                        {viewMode === 'card' && (
                          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center bg-[#0B132A] text-white py-12">
                            <div className="mb-4">
                              <h2 className="text-sm font-bold font-heading text-[#FAC417]">Your Shareable Card</h2>
                            </div>
                            <div className="scale-90">
                              <LivePreviewCard profile={profile} onOpenFullPage={() => setViewMode('public')} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Simulated Home Indicator Bar */}
                      <div className="phone-home-indicator" />

                    </div>
                  </div>
                </main>
              )
            ) : (
              /* VIEW MODE B: STANDARD DESKTOP SITE */
              <main id="desktop-builder-main" className="flex-1">
                
                {/* Outcome-First Builder View */}
                {viewMode === 'builder' && (
                  <div id="desktop-builder-grid" className="max-w-7xl mx-auto px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Form & Onboarding */}
                    <div className="lg:col-span-7">
                      <OnboardingWizard
                        profile={profile}
                        setProfile={setProfile}
                        onFinish={() => setViewMode('public')}
                        isMobileView={false}
                      />
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
                          onOpenFullPage={() => setViewMode('public')}
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* Full Decision Page View */}
                {viewMode === 'public' && (
                  <div id="desktop-public-view">
                    <PublicTrustPage
                      profile={profile}
                      onBackToBuilder={() => setViewMode('builder')}
                    />
                  </div>
                )}

                {/* Standalone Card view */}
                {viewMode === 'card' && (
                  <div id="desktop-card-view" className="min-h-[75vh] flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto">
                    <div className="mb-6 space-y-2">
                      <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                        Shareable Trust Identity
                      </h2>
                      <p className="text-sm text-gray-600">
                        Your generated premium trust card. Ready for listings, emails, or messengers.
                      </p>
                    </div>

                    <div className="scale-105 my-4">
                      <LivePreviewCard
                        profile={profile}
                        onOpenFullPage={() => setViewMode('public')}
                      />
                    </div>

                    <div className="mt-8">
                      <button
                        id="btn-view-full-page"
                        onClick={() => setViewMode('public')}
                        className="px-7 py-3 bg-[#FAC417] text-slate-900 font-bold text-sm rounded-full hover:bg-[#E5B210] transition-all shadow-sm font-heading flex items-center space-x-2"
                      >
                        <span>View Full Decision Page</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

              </main>
            )}
          </div>
        )}

      </div>

      {/* Floating App Mode Controller for Visual Editor overlay */}
      {!isProduction && (
        <div 
          id="app-mode-floating-widget" 
          data-antigravity-ignore="true"
          contentEditable={false}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-xl shadow-2xl p-2.5 flex items-center space-x-2 border border-slate-700 hover:scale-105 transition-transform"
        >
          <div className="flex flex-col text-[10px] font-bold text-gray-400 px-1 leading-tight text-left pointer-events-none">
            <span>EDITOR VIEW</span>
            <span className={appMode === 'visual_flat' ? 'text-amber-400' : 'text-emerald-400'}>
              {appMode === 'visual_flat' ? 'Visual Edit: ON' : 'Visual Edit: OFF'}
            </span>
            <span className="text-[8px] text-amber-200 mt-0.5">Press Alt + S</span>
            <span className="text-[8px] text-emerald-300 mt-0.5 font-extrabold">Hold Ctrl + Click to Switch</span>
          </div>
          
          <button
            onClick={() => setAppMode('visual_flat')}
            data-antigravity-ignore="true"
            contentEditable={false}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              appMode === 'visual_flat' ? 'bg-[#FAC417] text-slate-950 font-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            <span className="pointer-events-none">🛠️ Turn On Visual Edit</span>
          </button>
          
          <button
            onClick={() => setAppMode('interactive')}
            data-antigravity-ignore="true"
            contentEditable={false}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
              appMode === 'interactive' ? 'bg-[#FAC417] text-slate-950 font-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            <span className="pointer-events-none">🕹️ Turn Off Visual Edit</span>
          </button>
        </div>
      )}

    </div>
  );
}
