import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

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
}) {
  const t = translations;
  
  return (
    <header 
      id={id} 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3.5 shadow-sm hidden md:block"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
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
            <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <span className="text-[13px] font-black text-slate-800 leading-none tracking-tight">
                <span className="text-[#FF1744]">R8</span> ESTATE
              </span>
            </div>
          </a>
          
          <div className="h-6 w-px bg-gray-200" />
          
          <div className="text-start">
            <span className="text-base font-serif-premium font-black tracking-tight text-slate-900 uppercase">
              TRUST CARD™
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-500">
          <a href="#desktop-landing-how" className="hover:text-[#FAC417] transition-colors">{language === 'ar' ? 'كيف يعمل' : 'How It Works'}</a>
          <a href="#desktop-landing-stats" className="hover:text-[#FAC417] transition-colors">{language === 'ar' ? 'للمحترفين' : 'For Professionals'}</a>
          <a href="#btn-hero-fallback-cta" className="hover:text-[#FAC417] transition-colors">{language === 'ar' ? 'صفحة الثقة' : 'Trust Page'}</a>
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

          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
            <button 
              onClick={() => setLanguage('en')}
              className={`hover:text-slate-900 cursor-pointer ${language === 'en' ? 'text-slate-900 underline underline-offset-4 decoration-[#FF1744] decoration-2' : ''}`}
            >
              EN
            </button>
            <span className="text-gray-300">/</span>
            <button 
              onClick={() => setLanguage('ar')}
              className={`hover:text-slate-900 font-arabic cursor-pointer ${language === 'ar' ? 'text-slate-900 underline underline-offset-4 decoration-[#FF1744] decoration-2' : ''}`}
            >
              ع
            </button>
          </div>

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
                className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer"
              >
                {t.signOut}
              </button>
            </div>
          ) : (
            <button 
              onClick={onSignInClick}
              className="text-xs font-bold text-gray-600 hover:text-slate-900 cursor-pointer"
            >
              {t.signIn}
            </button>
          )}

          <Button 
            variant="dark"
            size="sm"
            onClick={onSignInClick}
            className="shadow-sm flex items-center gap-1 bg-gold-gradient text-slate-950 hover:bg-[#E5B210]"
          >
            <span>{language === 'ar' ? 'احصل على بطاقة الثقة الخاصة بي' : 'Get My Trust Card™'}</span>
            <ArrowRight className="w-3 h-3 text-slate-950 shrink-0 ltr:rotate-0 rtl:rotate-180" />
          </Button>
        </div>

      </div>
    </header>
  );
}
