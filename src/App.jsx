import React, { useState, useEffect } from 'react';
import { ShieldCheck, Layout, Eye, UserCheck, ArrowRight, Smartphone, Monitor, Check, Star } from 'lucide-react';
import { DEFAULT_PROFILE, MOCK_PRESETS } from './data/mockProfiles';
import LivePreviewCard from './components/LivePreviewCard';
import OnboardingWizard from './components/OnboardingWizard';
import PublicTrustPage from './components/PublicTrustPage';

export default function App() {
  const [profile, setProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const profileId = params.get('profile') || params.get('id');
      if (profileId) {
        const found = MOCK_PRESETS.find((p) => p.id === profileId);
        if (found) {
          return found.data;
        }
      }
    }
    return DEFAULT_PROFILE;
  });

  const [viewMode, setViewMode] = useState('builder'); // 'builder' | 'public' | 'card'
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile_sim'
  const [actualMobile, setActualMobile] = useState(false);
  const [timeString, setTimeString] = useState("09:41");

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

  const isMobileView = actualMobile || deviceMode === 'mobile_sim';

  // If we are viewing the public profile page directly, render it full page (no double headers)
  if (viewMode === 'public') {
    return (
      <div id="app-root" className="min-h-[100dvh] bg-[#FAFAF9] text-[#111827] font-sans antialiased selection:bg-[#0A3D62]/10 selection:text-[#0A3D62]">
        <PublicTrustPage
          profile={profile}
          onBackToBuilder={() => setViewMode('builder')}
        />
      </div>
    );
  }

  return (
    <div id="app-root" className="min-h-[100dvh] bg-[#FAFAF9] text-[#111827] font-sans antialiased selection:bg-[#0A3D62]/10 selection:text-[#0A3D62] flex flex-col justify-between relative md:pb-16">
      
      {/* 1. Global Header Bar (Clean production header, logo linked to home) */}
      <header id="global-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3.5 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand area */}
          <a href="/" className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
            <div id="app-brand-logo" className="flex items-center shrink-0">
              <img
                src="/favicon.svg"
                alt="R8ESTATE Icon"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[19px] sm:text-[20px] font-extrabold text-slate-900 leading-none tracking-tight">
                <span className="text-[#FF1744]">R8</span> ESTATE
              </span>
              <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-[0.18em] leading-none mt-1">
                Decision Intelligence
              </span>
            </div>
          </a>

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
              onClick={() => { setViewMode('builder'); setDeviceMode('desktop'); }}
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
                <OnboardingWizard
                  profile={profile}
                  setProfile={setProfile}
                  onFinish={() => setViewMode('public')}
                  isMobileView={false}
                />
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
      </div>

    </div>
  );
}
