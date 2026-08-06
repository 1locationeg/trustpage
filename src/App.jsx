import React, { useState, useEffect } from 'react';
import { ShieldCheck, Layout, Eye, UserCheck, ArrowRight, Smartphone, Monitor, Check, Star } from 'lucide-react';
import { DEFAULT_PROFILE, MOCK_PRESETS } from './data/mockProfiles';
import LivePreviewCard from './components/LivePreviewCard';
import OnboardingWizard from './components/OnboardingWizard';
import PublicTrustPage from './components/PublicTrustPage';
import AuthModal from './components/AuthModal';
import NavBar from './components/NavBar';
import Button from './components/Button';
import { TRANSLATIONS } from './data/translations';

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

  const [language, setLanguage] = useState('en');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Initialize session from localStorage
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('r8estate_user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // OAuth callback listener (Google / Auth0)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const state = params.get('state');

      if (accessToken) {
        const isAuth0 = state === 'auth0';
        const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN || "dev-1locationeg.us.auth0.com";
        const userinfoUrl = isAuth0
          ? `https://${auth0Domain}/userinfo`
          : `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;

        const fetchOptions = isAuth0
          ? { headers: { Authorization: `Bearer ${accessToken}` } }
          : {};

        fetch(userinfoUrl, fetchOptions)
          .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch user profile');
            return res.json();
          })
          .then((data) => {
            const providerName = isAuth0 ? 'auth0-google' : 'google';
            const oauthUser = {
              provider: providerName,
              email: data.email,
              name: data.name,
              picture: data.picture,
              initials: data.given_name ? data.given_name[0] : (data.name ? data.name[0] : (data.email ? data.email[0].toUpperCase() : 'G'))
            };

            // Prevent duplicate emails in simulated local database
            const registeredStr = localStorage.getItem('r8estate_users') || '[]';
            const registered = JSON.parse(registeredStr);
            if (oauthUser.email && !registered.includes(oauthUser.email)) {
              registered.push(oauthUser.email);
              localStorage.setItem('r8estate_users', JSON.stringify(registered));
            }

            // Save user state & persist
            setUser(oauthUser);
            localStorage.setItem('r8estate_user', JSON.stringify(oauthUser));

            // Clear hash parameters from URL bar
            window.history.replaceState(null, null, window.location.pathname + window.location.search);
          })
          .catch((err) => {
            console.error('OAuth callback processing failed:', err);
          });
      }
    }
  }, []);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('r8estate_user');
  };

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

  return (
    <div 
      id="app-root" 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-[100dvh] bg-[#FAFAF9] text-[#111827] font-sans antialiased selection:bg-[#0A3D62]/10 selection:text-[#0A3D62] flex flex-col justify-between relative md:pb-16 ${language === 'ar' ? 'font-arabic' : ''}`}
    >
      {viewMode === 'public' ? (
        <PublicTrustPage
          profile={profile}
          onBackToBuilder={() => setViewMode('builder')}
          language={language}
        />
      ) : (
        <>
          {/* 1. Global Header Bar (Clean production header, logo linked to home) */}
          <NavBar
            language={language}
            setLanguage={setLanguage}
            user={user}
            onSignOut={handleSignOut}
            onSignInClick={() => setIsAuthOpen(true)}
            translations={t}
            deviceMode={deviceMode}
            setDeviceMode={setDeviceMode}
          />

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
                        language={language}
                        setLanguage={setLanguage}
                        user={user}
                        onSignInClick={() => setIsAuthOpen(true)}
                      />
                    )}
                    {viewMode === 'card' && (
                      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-950 text-white min-h-[80vh] relative">
                        <div className="mb-4">
                          <h2 className="text-lg font-bold font-heading text-[#FAC417]">{t.livePreview}</h2>
                        </div>
                        <LivePreviewCard profile={profile} onOpenFullPage={() => setViewMode('public')} language={language} />
                      </div>
                    )}
                  </main>
                ) : (
                  /* Desktop Screen Simulator - Renders iPhone Bezel Mockup with Status & Home Indicator */
                  <main id="pwa-simulator-main" className="flex-1 flex flex-col items-center justify-center py-8 px-4 bg-[#0B132A] bg-luxury-bezel-ambient min-h-[85vh] transition-all duration-500">
                    <div className="phone-bezel animate-gold-glow">
                      
                      {/* Simulated Notch */}
                      <div className="phone-notch">
                        <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
                      </div>

                      {/* Simulated Screen Body */}
                      <div className="phone-screen bg-white">
                        
                        {/* Status Bar */}
                        <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[10px] text-gray-500 font-bold bg-white relative z-20" dir="ltr">
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
                              language={language}
                              setLanguage={setLanguage}
                              user={user}
                              onSignInClick={() => setIsAuthOpen(true)}
                            />
                          )}
                          {viewMode === 'card' && (
                            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center bg-[#0B132A] text-white py-12">
                              <div className="mb-4">
                                <h2 className="text-sm font-bold font-heading text-[#FAC417]">{t.livePreview}</h2>
                              </div>
                              <div className="scale-90">
                                <LivePreviewCard profile={profile} onOpenFullPage={() => setViewMode('public')} language={language} />
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
                      language={language}
                      user={user}
                      onSignInClick={() => setIsAuthOpen(true)}
                    />
                  )}

                  {/* Standalone Card view */}
                  {viewMode === 'card' && (
                    <div id="desktop-card-view" className="min-h-[75vh] flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto">
                      <div className="mb-6 space-y-2">
                        <h2 className="text-3xl font-extrabold text-slate-900 font-heading">
                          {t.livePreview}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {language === 'ar' ? 'بطاقة الثقة المتميزة التي تم إنشاؤها. جاهزة للإدراج أو البريد الإلكتروني أو المراسلة.' : 'Your generated premium trust card. Ready for listings, emails, or messengers.'}
                        </p>
                      </div>

                      <div className="scale-105 my-4">
                        <LivePreviewCard
                          profile={profile}
                          onOpenFullPage={() => setViewMode('public')}
                          language={language}
                        />
                      </div>

                      <div className="mt-8">
                        <Button
                          id="btn-view-full-page"
                          onClick={() => setViewMode('public')}
                          variant="primary"
                          size="lg"
                          className="flex items-center gap-2"
                        >
                          <span>{language === 'ar' ? 'عرض صفحة القرار الكاملة' : 'View Full Decision Page'}</span>
                          <ArrowRight className="w-4 h-4 shrink-0 ltr:rotate-0 rtl:rotate-180" />
                        </Button>
                      </div>
                    </div>
                  )}

                </main>
              )}
            </div>
          </div>
        </>
      )}

      {/* AuthModal portal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={(provider, email) => {
          setUser({
            provider,
            email: email || (provider === 'google' ? 'user@gmail.com' : 'user@linkedin.com')
          });
        }}
      />
    </div>
  );
}
