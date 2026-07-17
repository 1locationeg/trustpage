import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Layout, Eye, UserCheck, RefreshCw, Layers, ExternalLink, ArrowRight } from 'lucide-react';
import { DEFAULT_PROFILE, MOCK_PRESETS } from './data/mockProfiles';
import LivePreviewCard from './components/LivePreviewCard';
import OnboardingWizard from './components/OnboardingWizard';
import PublicTrustPage from './components/PublicTrustPage';

export default function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [viewMode, setViewMode] = useState('builder'); // 'builder' | 'public' | 'card'
  const [selectedPresetId, setSelectedPresetId] = useState('ahmed-hassan');

  const handlePresetChange = (presetId) => {
    setSelectedPresetId(presetId);
    const found = MOCK_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setProfile(found.data);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 font-sans">
      
      {/* Global Header Bar */}
      <header className="sticky top-0 z-50 bg-[#0E1422]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Category Subtitle */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 font-extrabold text-[#D4AF37] font-heading text-xl tracking-tight">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
              <span>R8ESTATE</span>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#F3C66B] border border-[#D4AF37]/30 font-semibold hidden sm:inline">
              Decision Infrastructure
            </span>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('builder')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all flex items-center space-x-1.5 ${
                viewMode === 'builder'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3C66B] text-slate-950 shadow-md font-heading'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>12-Step Builder</span>
            </button>

            <button
              onClick={() => setViewMode('public')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all flex items-center space-x-1.5 ${
                viewMode === 'public'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3C66B] text-slate-950 shadow-md font-heading'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Public Trust Page (12 Screens)</span>
            </button>

            <button
              onClick={() => setViewMode('card')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all flex items-center space-x-1.5 ${
                viewMode === 'card'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3C66B] text-slate-950 shadow-md font-heading'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Card View</span>
            </button>
          </div>

          {/* Preset Selector */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 hidden lg:inline">Preset:</span>
            <select
              value={selectedPresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            >
              {MOCK_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </header>

      {/* VIEW MODE 1: BUILDER & LIVE PREVIEW (MATCHING SCREENSHOT) */}
      {viewMode === 'builder' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F3C66B] px-3 py-1 rounded-full text-xs font-bold font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VALUE-FIRST ONBOARDING BUILDER</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white font-heading mt-2">
              Transform <span className="gold-gradient-text">Unknown Professional → Confident Decision</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Watch your live Trust Card update in real-time as you complete each guided step.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 12 Step Wizard */}
            <div className="lg:col-span-7">
              <OnboardingWizard
                profile={profile}
                setProfile={setProfile}
                onFinish={() => setViewMode('public')}
              />
            </div>

            {/* Right Column: Live Updating Card Preview */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  REAL-TIME LIVE PREVIEW
                </span>
              </div>
              <LivePreviewCard
                profile={profile}
                onOpenFullPage={() => setViewMode('public')}
              />
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FULL PUBLIC DECISION INFRASTRUCTURE TRUST PAGE */}
      {viewMode === 'public' && (
        <PublicTrustPage
          profile={profile}
          onBackToBuilder={() => setViewMode('builder')}
        />
      )}

      {/* VIEW MODE 3: STANDALONE TRUST CARD VIEW */}
      {viewMode === 'card' && (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white font-heading">Your Shareable R8ESTATE Trust Card</h2>
            <p className="text-xs text-slate-400">Embed anywhere or share as a high-impact digital card.</p>
          </div>

          <LivePreviewCard
            profile={profile}
            onOpenFullPage={() => setViewMode('public')}
          />

          <div className="mt-6">
            <button
              onClick={() => setViewMode('public')}
              className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#F3C66B] to-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 shadow-xl font-heading flex items-center space-x-2"
            >
              <span>View Full 12-Screen Intelligence Memo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
