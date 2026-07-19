import React, { useState } from 'react';
import { ShieldCheck, Layout, Eye, UserCheck, ArrowRight } from 'lucide-react';
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
    <div id="app-root" className="min-h-[100dvh] bg-[#FAFAF9] text-[#111827] font-sans antialiased selection:bg-[#0A3D62]/10 selection:text-[#0A3D62]">
      
      {/* Global Header Bar */}
      <header id="global-header" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 font-bold text-[#0A3D62] font-heading text-xl tracking-tight">
              <ShieldCheck className="w-6 h-6 text-[#0A3D62]" />
              <span>R8ESTATE</span>
            </div>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline border-l border-gray-200 pl-3">
              Universal Decision Intelligence
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-gray-100 rounded-lg text-xs font-medium border border-gray-200">
            <button
              id="btn-mode-builder"
              onClick={() => setViewMode('builder')}
              className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                viewMode === 'builder'
                  ? 'bg-white text-[#0A3D62] shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Outcome-First Builder</span>
            </button>

            <button
              id="btn-mode-public"
              onClick={() => setViewMode('public')}
              className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                viewMode === 'public'
                  ? 'bg-white text-[#0A3D62] shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Public Decision Page</span>
            </button>

            <button
              id="btn-mode-card"
              onClick={() => setViewMode('card')}
              className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
                viewMode === 'card'
                  ? 'bg-white text-[#0A3D62] shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Trust Card</span>
            </button>
          </div>

          {/* Ecosystem Preset Selector */}
          <div className="flex items-center space-x-2 text-xs">
            <label htmlFor="preset-select" className="text-gray-500 font-medium hidden lg:inline">
              Ecosystem Preset:
            </label>
            <select
              id="preset-select"
              value={selectedPresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/20 focus:border-[#0A3D62]"
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

      {/* VIEW MODE 1: OUTCOME-FIRST BUILDER */}
      {viewMode === 'builder' && (
        <main id="builder-main" className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Form Column */}
            <div className="lg:col-span-7">
              <OnboardingWizard
                profile={profile}
                setProfile={setProfile}
                onFinish={() => setViewMode('public')}
              />
            </div>

            {/* Right Live Preview Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-20">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Live Preview
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time Sync</span>
                </span>
              </div>
              <LivePreviewCard
                profile={profile}
                onOpenFullPage={() => setViewMode('public')}
              />
            </div>

          </div>
        </main>
      )}

      {/* VIEW MODE 2: PUBLIC DECISION PAGE */}
      {viewMode === 'public' && (
        <PublicTrustPage
          profile={profile}
          onBackToBuilder={() => setViewMode('builder')}
        />
      )}

      {/* VIEW MODE 3: STANDALONE TRUST CARD */}
      {viewMode === 'card' && (
        <main id="card-main" className="min-h-[80dvh] flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto">
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">
              Your Shareable Trust Card
            </h2>
            <p className="text-sm text-gray-600">
              Embed anywhere or share as a high-impact digital identity.
            </p>
          </div>

          <LivePreviewCard
            profile={profile}
            onOpenFullPage={() => setViewMode('public')}
          />

          <div className="mt-8">
            <button
              id="btn-view-full-page"
              onClick={() => setViewMode('public')}
              className="px-6 py-3 bg-[#FAC417] text-slate-900 font-semibold text-sm rounded-full hover:bg-[#E5B210] transition-all shadow-sm font-heading flex items-center space-x-2"
            >
              <span>View Full Decision Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      )}

    </div>
  );
}
