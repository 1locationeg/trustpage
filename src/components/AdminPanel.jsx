import React, { useState, useEffect } from 'react';
import { 
  Settings, Layout, CreditCard, Image, Palette, Link as LinkIcon, 
  QrCode, Globe, Shield, RefreshCw, Eye, Save, Send, LogOut, Check,
  Plus, Trash2, ArrowUp, ArrowDown, ChevronRight, Upload, Sparkles, AlertCircle,
  FileText, Activity, Layers, BarChart2, CheckCircle2, ChevronLeft
} from 'lucide-react';
import LivePreviewCard from './LivePreviewCard';

// Sample Revision logs
const INITIAL_REVISIONS = [
  { id: 1, time: "2026-08-09 02:40:12", user: "Admin (akasi)", action: "Updated Arabic Hero translation" },
  { id: 2, time: "2026-08-08 19:15:45", user: "Admin (akasi)", action: "Auth0 connection credentials updated" },
  { id: 3, time: "2026-08-06 21:12:00", user: "System", action: "Initial draft published" }
];

export default function AdminPanel({ 
  profile, 
  onUpdateProfile, 
  websiteConfig, 
  onUpdateConfig,
  onCloseAdmin 
}) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // CMS state variables
  const [activeTab, setActiveTab] = useState('overview');
  const [currentConfig, setCurrentConfig] = useState(JSON.parse(JSON.stringify(websiteConfig)));
  const [currentProfile, setCurrentProfile] = useState(JSON.parse(JSON.stringify(profile)));
  const [activeLangTab, setActiveLangTab] = useState('en'); // 'en' | 'ar'
  const [revisions, setRevisions] = useState(INITIAL_REVISIONS);
  
  // Media manager state
  const [mediaAssets, setMediaAssets] = useState([
    { id: 'logo-r8', name: 'R8ESTATE Logo', url: '/favicon.svg', type: 'vector', alt: 'R8ESTATE corporate icon' },
    { id: 'avatar-ahmed', name: 'Ahmed Hassan Portrait', url: '/profile_man_ahmed.png', type: 'image', alt: 'Ahmed Hassan portrait photograph' },
    { id: 'avatar-elena', name: 'Elena Rostova Portrait', url: '/profile_woman_elena.png', type: 'image', alt: 'Elena Rostova portrait photograph' },
    { id: 'bg-grid', name: 'Gold Grid Ambient', url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500', type: 'image', alt: 'Golden luxury corporate offices' }
  ]);
  const [newMediaName, setNewMediaName] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaAlt, setNewMediaAlt] = useState("");
  
  // Custom toast notification
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "r8estate" || password === "admin") {
      setIsAuthenticated(true);
      showToast("Welcome back, administrator.");
    } else {
      setLoginError("Invalid administrator passcode.");
    }
  };

  const handleSaveDraft = () => {
    showToast("Draft saved successfully.");
    const newRev = {
      id: Date.now(),
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: "Admin (akasi)",
      action: "Saved unpublished draft changes"
    };
    setRevisions([newRev, ...revisions]);
  };

  const handlePublish = () => {
    // Commit the local admin changes to the parent state
    onUpdateConfig(currentConfig);
    onUpdateProfile(currentProfile);
    showToast("Changes published to production!");
    
    const newRev = {
      id: Date.now(),
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: "Admin (akasi)",
      action: "Published revisions to live website"
    };
    setRevisions([newRev, ...revisions]);
  };

  const handleRestoreRevision = (rev) => {
    showToast(`Restored to version from ${rev.time}`);
    // Simulate restoration by reverting to original prop values
    setCurrentConfig(JSON.parse(JSON.stringify(websiteConfig)));
    setCurrentProfile(JSON.parse(JSON.stringify(profile)));
  };

  // Reorder sections helper
  const moveSection = (index, direction) => {
    const sectionsCopy = [...currentConfig.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sectionsCopy.length) return;
    
    // Swap
    const temp = sectionsCopy[index];
    sectionsCopy[index] = sectionsCopy[targetIndex];
    sectionsCopy[targetIndex] = temp;
    
    // Update order values
    sectionsCopy.forEach((sec, idx) => {
      sec.order = idx + 1;
    });

    setCurrentConfig({
      ...currentConfig,
      sections: sectionsCopy
    });
    showToast("Section order updated.");
  };

  // Toggle section visibility helper
  const toggleSection = (id) => {
    const sectionsCopy = currentConfig.sections.map(s => {
      if (s.id === id) {
        return { ...s, isActive: !s.isActive };
      }
      return s;
    });
    setCurrentConfig({
      ...currentConfig,
      sections: sectionsCopy
    });
    showToast("Section visibility toggled.");
  };

  // Add rotating outcome helper
  const addOutcome = () => {
    const outcomeEn = prompt("Enter English outcome (e.g. MORE PROFIT):");
    const outcomeAr = prompt("Enter Arabic outcome (e.g. المزيد من الأرباح):");
    if (outcomeEn && outcomeAr) {
      const outcomesCopy = [...currentConfig.hero.outcomes];
      outcomesCopy.push({
        text: { en: outcomeEn.toUpperCase(), ar: outcomeAr }
      });
      setCurrentConfig({
        ...currentConfig,
        hero: {
          ...currentConfig.hero,
          outcomes: outcomesCopy
        }
      });
      showToast("Outcome added.");
    }
  };

  // Remove rotating outcome helper
  const removeOutcome = (index) => {
    if (currentConfig.hero.outcomes.length <= 2) {
      alert("Must maintain at least two rotating outcomes.");
      return;
    }
    const outcomesCopy = currentConfig.hero.outcomes.filter((_, idx) => idx !== index);
    setCurrentConfig({
      ...currentConfig,
      hero: {
        ...currentConfig.hero,
        outcomes: outcomesCopy
      }
    });
    showToast("Outcome removed.");
  };

  // Add verification helper
  const addVerification = () => {
    const title = prompt("Verification Title (e.g. Broker License):");
    const source = prompt("Verification Authority (e.g. Government Registry):");
    if (title && source) {
      const verCopy = [...currentProfile.verifications];
      verCopy.push({
        title,
        status: "Verified",
        date: new Date().toLocaleDateString(),
        source,
        confidence: 100
      });
      setCurrentProfile({
        ...currentProfile,
        verifications: verCopy
      });
      showToast("Verification item added.");
    }
  };

  // Remove verification helper
  const removeVerification = (index) => {
    const verCopy = currentProfile.verifications.filter((_, idx) => idx !== index);
    setCurrentProfile({
      ...currentProfile,
      verifications: verCopy
    });
    showToast("Verification item removed.");
  };

  // Add media asset helper
  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newMediaName || !newMediaUrl) {
      alert("Name and URL are required.");
      return;
    }
    const asset = {
      id: 'media-' + Date.now(),
      name: newMediaName,
      url: newMediaUrl,
      type: newMediaUrl.endsWith('.svg') ? 'vector' : 'image',
      alt: newMediaAlt || newMediaName
    };
    setMediaAssets([...mediaAssets, asset]);
    setNewMediaName("");
    setNewMediaUrl("");
    setNewMediaAlt("");
    showToast("Media asset registered.");
  };

  // Pre-load theme presets
  const applyThemePreset = (preset) => {
    let presetTokens = {};
    if (preset === 'gold') {
      presetTokens = { accent: "#FAC417", navy: "#0A3D62", danger: "#FF1744", radius: "24px", shadow: "shadow-premium-soft" };
    } else if (preset === 'platinum') {
      presetTokens = { accent: "#94A3B8", navy: "#0F172A", danger: "#EF4444", radius: "12px", shadow: "shadow-lg" };
    } else if (preset === 'emerald') {
      presetTokens = { accent: "#10B981", navy: "#064E3B", danger: "#F43F5E", radius: "16px", shadow: "shadow-md" };
    } else if (preset === 'stealth') {
      presetTokens = { accent: "#F8FAFC", navy: "#020617", danger: "#E2E8F0", radius: "9999px", shadow: "shadow-xl" };
    }
    
    setCurrentConfig({
      ...currentConfig,
      theme: {
        ...currentConfig.theme,
        ...presetTokens
      }
    });
    showToast(`Applied ${preset} preset.`);
  };

  // Unauthenticated Guard Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080c16] flex items-center justify-center p-6 relative overflow-hidden text-start">
        {/* Luxury Glowing spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FAC417]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0A3D62]/40 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0A3D62]/80 border border-[#FAC417]/20 flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-[#FAC417]" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-white font-heading">
              R8ESTATE CMS
            </h1>
            <p className="text-xs text-slate-400">
              Please enter the administrator passcode to access website configurations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Passcode / Credentials
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FAC417]/30 transition-all placeholder-slate-700"
                autoFocus
              />
              {loginError && (
                <p className="text-red-400 text-[10px] mt-1 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FAC417] hover:bg-[#E5B210] text-slate-900 text-xs font-bold py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Authorize Credentials
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={onCloseAdmin}
              className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              ← Back to trust card website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans text-start relative">
      
      {/* Toast notifications */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-[#FAC417] text-slate-950 text-xs font-bold rounded-xl shadow-xl flex items-center gap-2 animate-fade-up">
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Admin Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-white/5 px-6 py-3.5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0A3D62] flex items-center justify-center border border-[#FAC417]/20">
            <Shield className="w-4 h-4 text-[#FAC417]" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white leading-none">R8ESTATE CONTROL PANEL</h2>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Content Management & Presets</span>
          </div>
        </div>

        {/* Global Save / Publish buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onCloseAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg border border-white/5 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Exit CMS</span>
          </button>
          <button 
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-[#FAC417] text-xs font-bold rounded-lg border border-white/5 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button 
            onClick={handlePublish}
            className="flex items-center gap-1.5 px-4.5 py-1.5 bg-[#FAC417] text-slate-900 text-xs font-black rounded-lg shadow-md hover:bg-[#E5B210] transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Changes</span>
          </button>
        </div>
      </header>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 overflow-hidden">
        
        {/* Left Side: Navigation Links & Submenus */}
        <aside className="xl:col-span-2 bg-slate-900/40 border-r border-white/5 p-4 space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2 block">CMS Modules</span>
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: Activity },
                { id: 'global', label: 'Global & Hero Manager', icon: Layout },
                { id: 'card', label: 'Trust Card Profile', icon: CreditCard },
                { id: 'sections', label: 'Page Section Editor', icon: Layers },
                { id: 'media', label: 'Media Library', icon: Image },
                { id: 'theme', label: 'Theme & presets', icon: Palette },
                { id: 'links', label: 'Link Manager', icon: LinkIcon },
                { id: 'qr', label: 'QR / Barcode', icon: QrCode },
                { id: 'seo', label: 'SEO & Metadata', icon: FileText },
                { id: 'revisions', label: 'Revision History', icon: RefreshCw },
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all text-start cursor-pointer ${
                      isActive 
                        ? 'bg-[#FAC417] text-slate-950 font-bold shadow-md shadow-[#FAC417]/10' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="pt-4 border-t border-white/5">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-start cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Lock Admin Session</span>
            </button>
          </div>
        </aside>

        {/* Center: Editing Form Area */}
        <main className="xl:col-span-6 bg-slate-950 border-r border-white/5 p-6 overflow-y-auto max-h-[calc(100vh-65px)]">
          
          {/* Header language switcher for bilingual tabs */}
          {['global', 'hero', 'card', 'sections', 'seo'].includes(activeTab) && (
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div>
                <h1 className="text-base font-extrabold text-white uppercase tracking-wide">
                  Editing: {activeTab.toUpperCase()}
                </h1>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Select tab language below to localize page content inputs.
                </p>
              </div>

              <div className="flex bg-slate-900 p-1 rounded-lg border border-white/5">
                <button
                  onClick={() => setActiveLangTab('en')}
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    activeLangTab === 'en' 
                      ? 'bg-slate-800 text-[#FAC417]' 
                      : 'text-slate-400 hover:text-white'
                  } cursor-pointer`}
                >
                  English (LTR)
                </button>
                <button
                  onClick={() => setActiveLangTab('ar')}
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    activeLangTab === 'ar' 
                      ? 'bg-slate-800 text-[#FAC417]' 
                      : 'text-slate-400 hover:text-white'
                  } cursor-pointer`}
                >
                  العربية (RTL)
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-base font-extrabold text-white uppercase">DASHBOARD OVERVIEW</h1>
                <p className="text-[11px] text-slate-400">Real-time status indicators and system health summaries.</p>
              </div>

              {/* Cards Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Profiles</span>
                  <div className="text-3xl font-black text-white font-heading">6 Active</div>
                  <p className="text-[10px] text-slate-500 font-semibold">1 Draft Profile pending publication</p>
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Credentials Audited</span>
                  <div className="text-3xl font-black text-emerald-400 font-heading">4 / 4 Valid</div>
                  <p className="text-[10px] text-emerald-500/80 font-semibold">Last checked: Today 01:22</p>
                </div>
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Global Language Config</span>
                  <div className="text-3xl font-black text-[#FAC417] font-heading">Bilingual</div>
                  <p className="text-[10px] text-slate-500 font-semibold">English LTR & Arabic RTL active</p>
                </div>
              </div>

              {/* Quick action list */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quick Actions Shortcuts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button 
                    onClick={() => setActiveTab('card')}
                    className="p-3 bg-slate-800 hover:bg-slate-700/80 text-start rounded-xl border border-white/5 font-semibold flex items-center justify-between cursor-pointer"
                  >
                    <span>Edit Trust Card details</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('theme')}
                    className="p-3 bg-slate-800 hover:bg-slate-700/80 text-start rounded-xl border border-white/5 font-semibold flex items-center justify-between cursor-pointer"
                  >
                    <span>Change site accents & branding</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GLOBAL & HERO MANAGER */}
          {activeTab === 'global' && (
            <div className="space-y-6">
              
              {/* Site Announcement */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase">Announcement Banner</h3>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Banner Text ({activeLangTab.toUpperCase()})</label>
                  <input
                    type="text"
                    value={currentConfig.global.announcement[activeLangTab]}
                    onChange={(e) => {
                      const updated = { ...currentConfig };
                      updated.global.announcement[activeLangTab] = e.target.value;
                      setCurrentConfig(updated);
                    }}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                  />
                </div>
              </div>

              {/* Hero Copy */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Hero Messaging & Inputs</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Eyebrow Title ({activeLangTab.toUpperCase()})</label>
                    <input
                      type="text"
                      value={currentConfig.hero.eyebrow[activeLangTab]}
                      onChange={(e) => {
                        const updated = { ...currentConfig };
                        updated.hero.eyebrow[activeLangTab] = e.target.value;
                        setCurrentConfig(updated);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Supporting Text ({activeLangTab.toUpperCase()})</label>
                    <textarea
                      rows="3"
                      value={currentConfig.hero.supportingText[activeLangTab]}
                      onChange={(e) => {
                        const updated = { ...currentConfig };
                        updated.hero.supportingText[activeLangTab] = e.target.value;
                        setCurrentConfig(updated);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>
                </div>
              </div>

              {/* Personalization Prompt */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Personalization Interactive Prompt</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Prompt Header Label ({activeLangTab.toUpperCase()})</label>
                    <input
                      type="text"
                      value={currentConfig.hero.personalizationPrompt[activeLangTab]}
                      onChange={(e) => {
                        const updated = { ...currentConfig };
                        updated.hero.personalizationPrompt[activeLangTab] = e.target.value;
                        setCurrentConfig(updated);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Input Placeholder Text ({activeLangTab.toUpperCase()})</label>
                    <input
                      type="text"
                      value={currentConfig.hero.personalizationPlaceholder[activeLangTab]}
                      onChange={(e) => {
                        const updated = { ...currentConfig };
                        updated.hero.personalizationPlaceholder[activeLangTab] = e.target.value;
                        setCurrentConfig(updated);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>
                </div>
              </div>

              {/* Rotating Outcomes */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase">Rotating Hero Benefits (Outcomes)</h3>
                  <button
                    onClick={addOutcome}
                    className="p-1 bg-[#FAC417] text-slate-900 rounded hover:bg-[#E5B210] flex items-center justify-center cursor-pointer"
                    title="Add Outcome"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {currentConfig.hero.outcomes.map((out, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">EN: {out.text.en}</div>
                        <div className="text-slate-400 mt-0.5">AR: {out.text.ar}</div>
                      </div>
                      <button
                        onClick={() => removeOutcome(idx)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                        title="Delete Outcome"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: TRUST CARD PROFILE */}
          {activeTab === 'card' && (
            <div className="space-y-6">
              
              {/* Identity fields */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Card Owner Identity</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Official Name</label>
                    <input
                      type="text"
                      value={currentProfile.name}
                      onChange={(e) => {
                        setCurrentProfile({ ...currentProfile, name: e.target.value });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={currentProfile.title}
                      onChange={(e) => {
                        setCurrentProfile({ ...currentProfile, title: e.target.value });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Affiliated Company</label>
                    <input
                      type="text"
                      value={currentProfile.company}
                      onChange={(e) => {
                        setCurrentProfile({ ...currentProfile, company: e.target.value });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Profile Photo (URL)</label>
                    <input
                      type="text"
                      value={currentProfile.photo}
                      onChange={(e) => {
                        setCurrentProfile({ ...currentProfile, photo: e.target.value });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>
                </div>
              </div>

              {/* Core numbers & values */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Trust Scores & Metrics</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Trust Score</label>
                    <input
                      type="number"
                      value={currentProfile.trustScore}
                      onChange={(e) => {
                        setCurrentProfile({ ...currentProfile, trustScore: parseInt(e.target.value) || 0 });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Deals Closed</label>
                    <input
                      type="number"
                      value={currentProfile.dealsClosed}
                      onChange={(e) => {
                        setCurrentProfile({ ...currentProfile, dealsClosed: parseInt(e.target.value) || 0 });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Years Exp</label>
                    <input
                      type="number"
                      value={currentProfile.yearsExp}
                      onChange={(e) => {
                        setCurrentProfile({ ...currentProfile, yearsExp: parseInt(e.target.value) || 0 });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Response Time</label>
                    <input
                      type="text"
                      value={currentProfile.avgResponseTime}
                      onChange={(e) => {
                        setCurrentProfile({ ...currentProfile, avgResponseTime: e.target.value });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>
                </div>
              </div>

              {/* Official Verifications List */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase">Official Verification Checklist</h3>
                  <button
                    onClick={addVerification}
                    className="p-1 bg-[#FAC417] text-slate-900 rounded hover:bg-[#E5B210] flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {currentProfile.verifications.map((v, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{v.title}</div>
                        <div className="text-slate-400 text-[10px] mt-0.5">Authority: {v.source} • Verified on {v.date}</div>
                      </div>
                      <button
                        onClick={() => removeVerification(idx)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PAGE SECTION EDITOR */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-base font-extrabold text-white uppercase">PAGE SECTION EDITOR</h1>
                <p className="text-[11px] text-slate-400">Reorder decision-wallet sections, hide/show, or edit labels.</p>
              </div>

              <div className="space-y-2">
                {currentConfig.sections.map((sec, idx) => (
                  <div key={sec.id} className="p-4 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => moveSection(idx, 'up')}
                          disabled={idx === 0}
                          className="text-slate-400 hover:text-[#FAC417] disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => moveSection(idx, 'down')}
                          disabled={idx === currentConfig.sections.length - 1}
                          className="text-slate-400 hover:text-[#FAC417] disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-black font-heading">
                            STAGE {sec.order}
                          </span>
                          <span className="text-xs font-semibold text-white">{sec.id}</span>
                        </div>
                        <input
                          type="text"
                          value={sec.label[activeLangTab]}
                          onChange={(e) => {
                            const sectionsCopy = [...currentConfig.sections];
                            sectionsCopy[idx].label[activeLangTab] = e.target.value;
                            setCurrentConfig({
                              ...currentConfig,
                              sections: sectionsCopy
                            });
                          }}
                          className="mt-2 bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417] w-64"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-[10px] text-slate-400 uppercase font-semibold">Active</label>
                      <input
                        type="checkbox"
                        checked={sec.isActive}
                        onChange={() => toggleSection(sec.id)}
                        className="w-4 h-4 text-[#FAC417] border-slate-700 bg-slate-800 rounded focus:ring-[#FAC417]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-base font-extrabold text-white uppercase">MEDIA LIBRARY</h1>
                <p className="text-[11px] text-slate-400">Register new asset links, copy URLs, and manage alternative texts.</p>
              </div>

              {/* Add asset form */}
              <form onSubmit={handleAddMedia} className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Register New Media Reference</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Asset Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Executive Headshot"
                      value={newMediaName}
                      onChange={(e) => setNewMediaName(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Asset URL</label>
                    <input
                      type="text"
                      placeholder="/custom_photo.png"
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Alternative Text (SEO)</label>
                  <input
                    type="text"
                    placeholder="Describe image description..."
                    value={newMediaAlt}
                    onChange={(e) => setNewMediaAlt(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FAC417] text-slate-950 text-xs font-bold rounded-lg hover:bg-[#E5B210] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Register Asset</span>
                </button>
              </form>

              {/* Media assets grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mediaAssets.map((asset) => (
                  <div key={asset.id} className="bg-slate-900 border border-white/5 rounded-2xl p-3 flex flex-col justify-between space-y-2">
                    <div className="h-24 bg-slate-950 rounded-lg flex items-center justify-center overflow-hidden border border-white/5 relative group">
                      <img 
                        src={asset.url} 
                        alt={asset.alt} 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          // fallback icon
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(asset.url);
                            showToast("Asset URL copied to clipboard.");
                          }}
                          className="px-2 py-1 bg-[#FAC417] text-slate-900 text-[9px] font-bold rounded cursor-pointer"
                        >
                          Copy Path
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-[11px] truncate">{asset.name}</div>
                      <div className="text-[9px] text-slate-500 truncate">{asset.url}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: THEME & STYLE MANAGER */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              
              {/* Presets */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase">Theme Presets</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'gold', name: 'Luxury Gold', color: '#FAC417' },
                    { id: 'platinum', name: 'Platinum', color: '#94A3B8' },
                    { id: 'emerald', name: 'Emerald', color: '#10B981' },
                    { id: 'stealth', name: 'Stealth', color: '#F8FAFC' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => applyThemePreset(p.id)}
                      className="p-3 bg-slate-950 border border-white/5 hover:border-white/20 rounded-xl text-center space-y-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded-full mx-auto" style={{ backgroundColor: p.color }} />
                      <div className="text-[10px] text-white font-bold">{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color swatches */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Core Styling Parameters</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Accent Brand Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentConfig.theme.accent}
                        onChange={(e) => {
                          setCurrentConfig({
                            ...currentConfig,
                            theme: { ...currentConfig.theme, accent: e.target.value }
                          });
                        }}
                        className="w-10 h-8 rounded bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentConfig.theme.accent}
                        onChange={(e) => {
                          setCurrentConfig({
                            ...currentConfig,
                            theme: { ...currentConfig.theme, accent: e.target.value }
                          });
                        }}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Navy / Primary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentConfig.theme.navy}
                        onChange={(e) => {
                          setCurrentConfig({
                            ...currentConfig,
                            theme: { ...currentConfig.theme, navy: e.target.value }
                          });
                        }}
                        className="w-10 h-8 rounded bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentConfig.theme.navy}
                        onChange={(e) => {
                          setCurrentConfig({
                            ...currentConfig,
                            theme: { ...currentConfig.theme, navy: e.target.value }
                          });
                        }}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Danger State Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={currentConfig.theme.danger}
                        onChange={(e) => {
                          setCurrentConfig({
                            ...currentConfig,
                            theme: { ...currentConfig.theme, danger: e.target.value }
                          });
                        }}
                        className="w-10 h-8 rounded bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={currentConfig.theme.danger}
                        onChange={(e) => {
                          setCurrentConfig({
                            ...currentConfig,
                            theme: { ...currentConfig.theme, danger: e.target.value }
                          });
                        }}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Border Radius</label>
                    <select
                      value={currentConfig.theme.radius}
                      onChange={(e) => {
                        setCurrentConfig({
                          ...currentConfig,
                          theme: { ...currentConfig.theme, radius: e.target.value }
                        });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="8px">8px (Modern Rounded)</option>
                      <option value="12px">12px (Smooth Rounded)</option>
                      <option value="24px">24px (Luxury Smooth)</option>
                      <option value="9999px">9999px (Pill Capsule)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Shadow Token</label>
                    <select
                      value={currentConfig.theme.shadow}
                      onChange={(e) => {
                        setCurrentConfig({
                          ...currentConfig,
                          theme: { ...currentConfig.theme, shadow: e.target.value }
                        });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="shadow-sm">shadow-sm (Very subtle)</option>
                      <option value="shadow-md">shadow-md (Clean depth)</option>
                      <option value="shadow-lg">shadow-lg (Premium height)</option>
                      <option value="shadow-premium-soft">shadow-premium-soft (Bespoke Luxury Glow)</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 7: LINK MANAGER */}
          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-base font-extrabold text-white uppercase">LINK & NAVIGATION MANAGER</h1>
                <p className="text-[11px] text-slate-400">Configure action redirects and validation links.</p>
              </div>

              {/* Nav links */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Header Menu Navigation Destinations</h3>
                
                <div className="space-y-3">
                  {currentConfig.global.navigation.links.map((link, idx) => (
                    <div key={link.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-white/5">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold block mb-1">Menu Label (EN)</span>
                        <input
                          type="text"
                          value={link.label.en}
                          onChange={(e) => {
                            const updated = { ...currentConfig };
                            updated.global.navigation.links[idx].label.en = e.target.value;
                            setCurrentConfig(updated);
                          }}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold block mb-1">Destination URL / Anchor</span>
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => {
                            const updated = { ...currentConfig };
                            updated.global.navigation.links[idx].href = e.target.value;
                            setCurrentConfig(updated);
                          }}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Primary Action Call-To-Action (CTA)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">CTA Button Label (EN)</label>
                    <input
                      type="text"
                      value={currentConfig.global.navigation.cta.label.en}
                      onChange={(e) => {
                        const updated = { ...currentConfig };
                        updated.global.navigation.cta.label.en = e.target.value;
                        setCurrentConfig(updated);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">CTA Destination URL</label>
                    <input
                      type="text"
                      value={currentConfig.global.navigation.cta.href}
                      onChange={(e) => {
                        const updated = { ...currentConfig };
                        updated.global.navigation.cta.href = e.target.value;
                        setCurrentConfig(updated);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: QR / BARCODE MANAGER */}
          {activeTab === 'qr' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-base font-extrabold text-white uppercase">QR & BARCODE ASSIGNMENTS</h1>
                <p className="text-[11px] text-slate-400">Manage digital card identity scan destinations.</p>
              </div>

              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Verification Redirect Destination</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">QR Target URL Destination</label>
                    <input
                      type="text"
                      value={currentConfig.qrSettings.destinationUrl}
                      onChange={(e) => {
                        setCurrentConfig({
                          ...currentConfig,
                          qrSettings: { ...currentConfig.qrSettings, destinationUrl: e.target.value }
                        });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                    <p className="text-[9px] text-slate-500 mt-1">
                      Real-time changes immediately update generated vector SVGs displayed on user trust cards.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Trust Card Scan Badge Level</label>
                    <select
                      value={currentConfig.qrSettings.badgeType}
                      onChange={(e) => {
                        setCurrentConfig({
                          ...currentConfig,
                          qrSettings: { ...currentConfig.qrSettings, badgeType: e.target.value }
                        });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Silver">Silver Badge (Baseline Verify)</option>
                      <option value="Gold">Gold Badge (Biometric & Registry)</option>
                      <option value="Platinum">Platinum Badge (Finance Audited)</option>
                      <option value="Elite">Elite Custom Skin Badge</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SEO & METADATA */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Search Engine Optimization (SEO)</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Meta Browser Title ({activeLangTab.toUpperCase()})</label>
                    <input
                      type="text"
                      value={currentConfig.seo.title[activeLangTab]}
                      onChange={(e) => {
                        const updated = { ...currentConfig };
                        updated.seo.title[activeLangTab] = e.target.value;
                        setCurrentConfig(updated);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Meta Description ({activeLangTab.toUpperCase()})</label>
                    <textarea
                      rows="3"
                      value={currentConfig.seo.description[activeLangTab]}
                      onChange={(e) => {
                        const updated = { ...currentConfig };
                        updated.seo.description[activeLangTab] = e.target.value;
                        setCurrentConfig(updated);
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#FAC417]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">Social Share (Open Graph)</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">OG Image Path</label>
                    <input
                      type="text"
                      value={currentConfig.seo.ogImage}
                      onChange={(e) => {
                        setCurrentConfig({
                          ...currentConfig,
                          seo: { ...currentConfig.seo, ogImage: e.target.value }
                        });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Canonical URL</label>
                    <input
                      type="text"
                      value={currentConfig.seo.canonicalUrl}
                      onChange={(e) => {
                        setCurrentConfig({
                          ...currentConfig,
                          seo: { ...currentConfig.seo, canonicalUrl: e.target.value }
                        });
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 10: REVISION HISTORY */}
          {activeTab === 'revisions' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-base font-extrabold text-white uppercase">AUDIT TRAILS & REVISIONS</h1>
                <p className="text-[11px] text-slate-400">View previous published checkpoints and restore drafts.</p>
              </div>

              <div className="space-y-2">
                {revisions.map((rev) => (
                  <div key={rev.id} className="p-4 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{rev.action}</div>
                      <div className="text-[10px] text-slate-500 mt-1">Logged: {rev.time} • User: {rev.user}</div>
                    </div>

                    <button
                      onClick={() => handleRestoreRevision(rev)}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[#FAC417] text-[10px] font-bold rounded-lg border border-white/5 cursor-pointer"
                    >
                      Restore Draft
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* Right Side: Live Device Mockup Simulator (Side-by-Side Preview panel) */}
        <section className="hidden xl:flex xl:col-span-4 bg-slate-950 p-6 flex-col items-center justify-start border-l border-white/5 overflow-y-auto max-h-[calc(100vh-65px)]">
          <div className="sticky top-0 w-full space-y-4 text-center">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                <Eye className="w-4 h-4 text-[#FAC417]" />
                <span>Live Card Preview Simulator</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Sync Active
              </span>
            </div>

            {/* Premium Simulated Trust Card Bezel */}
            <div className="w-full max-w-sm mx-auto p-4 rounded-[32px] bg-slate-900 border-4 border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-4 bg-slate-800 flex justify-center items-center">
                <div className="w-16 h-3 bg-black rounded-full" />
              </div>
              
              <div className="pt-4">
                <LivePreviewCard 
                  profile={currentProfile}
                  activeStateIndex={0}
                  theme="gold"
                  language="en"
                  onOpenFullPage={() => {}}
                />
              </div>
            </div>

            {/* Quick configuration specs summary sheet */}
            <div className="w-full max-w-sm mx-auto bg-slate-900/60 border border-white/5 p-4 rounded-2xl text-start text-xs space-y-2.5">
              <div className="font-extrabold text-white text-[10px] uppercase tracking-wider border-b border-white/5 pb-1">
                Active Theme Tokens
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-slate-500 block">Accent Color</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: currentConfig.theme.accent }} />
                    {currentConfig.theme.accent}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Primary Navy</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: currentConfig.theme.navy }} />
                    {currentConfig.theme.navy}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Border Radius</span>
                  <span className="font-bold text-white">{currentConfig.theme.radius}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Shadow Layout</span>
                  <span className="font-bold text-white">{currentConfig.theme.shadow}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
      
    </div>
  );
}
