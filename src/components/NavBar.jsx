import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import Button from './Button';

const toSentenceCase = (str) => {
  if (!str) return '';
  if (/[\u0600-\u06FF]/.test(str)) return str; // Leave Arabic untouched
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function NavBar({
  id = 'global-header',
  language,
  setLanguage,
  user,
  onSignOut,
  onSignInClick,
  translations,
  deviceMode,
  setDeviceMode,
  websiteConfig,
  onAdminClick
}) {
  const t = translations;
  
  return (
    <header 
      id={id} 
      className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3.5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Brand area - R8ESTATE (infrastructure) + TRUST CARD (product) */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div id="app-brand-logo" className="flex items-center shrink-0">
              <img
                src="/favicon.svg"
                alt="R8ESTATE Icon"
                className="h-6 w-6 object-contain"
              />
            </div>
            <div className={`flex flex-col text-start`}>
              <span className="text-[13px] font-black text-slate-800 leading-none tracking-tight">
                <span className="text-[#ed1b40]">R8</span> ESTATE
              </span>
            </div>
          </a>
          
          <div className="h-6 w-px bg-gray-200" />
          
          <div className="text-start">
            <span className="text-base font-black tracking-tight text-[#0a3d62] uppercase">
              {websiteConfig?.global?.siteName || "TRUST CARD™"}
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-[#5b6b7a]">
          {(websiteConfig?.global?.navigation?.links || [
            { id: "nav-how", label: { en: "How It Works", ar: "كيف يعمل" }, href: "#desktop-landing-how" },
            { id: "nav-stats", label: { en: "For Professionals", ar: "للمحترفين" }, href: "#desktop-landing-stats" },
            { id: "nav-trust", label: { en: "Trust Page", ar: "صفحة الثقة" }, href: "#btn-hero-fallback-cta" }
          ]).map(link => (
            <a 
              key={link.id} 
              href={link.href} 
              className="hover:text-[#0a3d62] transition-colors"
            >
              {(link.label[language] || link.label.en).toUpperCase()}
            </a>
          ))}
        </div>

        {/* Inspiration Header Controls */}
        <div className="flex items-center gap-4">
          {/* Device Simulator Toggle */}
          {setDeviceMode && (
            <div className="hidden md:flex items-center bg-slate-100/80 rounded-full p-0.5 border border-slate-200/50 shadow-sm mr-1">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  deviceMode === 'desktop'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setDeviceMode('mobile_sim')}
                className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  deviceMode === 'mobile_sim'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Mobile Sim
              </button>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#5b6b7a]">
            <button 
              onClick={() => setLanguage('en')}
              className={`hover:text-[#0a3d62] cursor-pointer ${language === 'en' ? 'text-[#0a3d62] underline underline-offset-4 decoration-[#ed1b40] decoration-2' : ''}`}
            >
              EN
            </button>
            <span className="text-gray-300">/</span>
            <button 
              onClick={() => setLanguage('ar')}
              className={`hover:text-[#0a3d62] font-arabic cursor-pointer ${language === 'ar' ? 'text-[#0a3d62] underline underline-offset-4 decoration-[#ed1b40] decoration-2' : ''}`}
            >
              ع
            </button>
          </div>

          {/* CMS Admin Panel Trigger Button */}
          <button
            onClick={onAdminClick}
            className="text-xs font-bold text-[#FAC417] bg-slate-950 border border-[#FAC417]/25 hover:bg-slate-900 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm shadow-[#FAC417]/10"
            title="Admin CMS Settings"
          >
            <Shield className="w-3.5 h-3.5 text-[#FAC417]" />
            <span className="hidden sm:inline">{language === 'ar' ? 'التحكم' : 'CMS'}</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full bg-slate-950 text-[#FAC417] font-extrabold text-[10px] flex items-center justify-center border border-[#FAC417]/40 shadow-sm uppercase"
                title={user.email}
              >
                {user.email ? user.email[0] : user.provider[0]}
              </div>
              <button 
                onClick={onSignOut}
                className="text-xs font-bold text-[#ed1b40] hover:text-[#D50000] cursor-pointer"
              >
                {toSentenceCase(t.signOut)}
              </button>
            </div>
          ) : (
            <button 
              onClick={onSignInClick}
              className="text-xs font-bold text-[#5b6b7a] hover:text-[#0a3d62] cursor-pointer"
            >
              {toSentenceCase(t.signIn)}
            </button>
          )}

          <Button 
            variant="dark"
            size="sm"
            onClick={onSignInClick}
            className="shadow-sm flex items-center gap-1 bg-gold-gradient text-slate-950 hover:bg-[#E5B210] !text-sm !font-medium"
          >
            <span>{toSentenceCase(websiteConfig?.global?.navigation?.cta?.label[language] || websiteConfig?.global?.navigation?.cta?.label.en || (language === 'ar' ? 'احصل على بطاقة الثقة الخاصة بي' : 'Get My Trust Card™'))}</span>
            <ArrowRight className="w-3 h-3 text-slate-950 shrink-0 ltr:rotate-0 rtl:rotate-180" />
          </Button>
        </div>

      </div>
    </header>
  );
}
