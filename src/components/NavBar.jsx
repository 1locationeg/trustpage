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
}) {
  const t = translations;
  
  return (
    <header 
      id={id} 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-3.5 shadow-sm hidden md:block"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo Brand area */}
        <a href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
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
              {t.decisionIntelligence}
            </span>
          </div>
        </a>

        {/* Inspiration Header Controls */}
        <div className="flex items-center gap-4">
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
              <div className="w-6 h-6 rounded-full bg-slate-950 text-[#FAC417] font-extrabold text-[10px] flex items-center justify-center border border-[#FAC417]/40 shadow-sm uppercase">
                {user.provider[0]}
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
            className="shadow-sm flex items-center gap-1"
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-3 h-3 text-[#FAC417] shrink-0 ltr:rotate-0 rtl:rotate-180" />
          </Button>
        </div>

      </div>
    </header>
  );
}
