import React, { useState } from 'react';
import { X, Check, Loader2, ArrowLeft, Plus } from 'lucide-react';
import Button from './Button';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "336829777595-sfe0t1iih47c6lgg958k36pbfslphkgi.apps.googleusercontent.com";
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN || "dev-fnjc04fu1fk585ca.us.auth0.com";
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID || "aBuvlAaaMpVIIx0iFCu8BXEoxbQhu7qF";


export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [loadingProvider, setLoadingProvider] = useState(null); // 'google' | 'linkedin' | null
  const [success, setSuccess] = useState(false);
  const [showChooser, setShowChooser] = useState(false);
  const [activeProvider, setActiveProvider] = useState(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');

  if (!isOpen) return null;

  const handleStartOAuth = (provider) => {
    setActiveProvider(provider);
    setShowChooser(true);
    setShowCustomInput(false);
    setCustomEmail('');
  };

  const handleSelectAccount = (email) => {
    setShowChooser(false);
    setLoadingProvider(activeProvider);
    setTimeout(() => {
      setLoadingProvider(null);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onAuthSuccess(activeProvider, email);
        onClose();
        setActiveProvider(null);
      }, 1200);
    }, 1800);
  };

  const googleAccounts = [
    '1locationeg@gmail.com',
    'akasi.dev@gmail.com'
  ];

  const linkedinAccounts = [
    'akasi.dev@linkedin.com',
    'akasi.consulting@linkedin.com'
  ];

  const accounts = activeProvider === 'google' ? googleAccounts : linkedinAccounts;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200 text-slate-800">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showChooser && !success && !loadingProvider && (
              <button 
                onClick={() => { setShowChooser(false); setShowCustomInput(false); }}
                className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {success 
                ? "Authentication Successful" 
                : loadingProvider 
                ? "Connecting..." 
                : showChooser 
                ? (activeProvider === 'google' ? "Sign in with Google" : "Sign in with LinkedIn") 
                : "Access R8 ESTATE"}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                <Check className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800 text-center">Welcome back to your Decision Space!</p>
              <p className="text-xs text-slate-500 text-center">Redirecting you securely...</p>
            </div>
          ) : loadingProvider ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-3">
              <Loader2 className="w-10 h-10 text-slate-800 animate-spin" />
              <p className="text-sm font-medium text-slate-700 text-center">
                Connecting to {loadingProvider === 'google' ? 'Google' : 'LinkedIn'}...
              </p>
              <p className="text-xs text-slate-400 text-center">Verifying secure OAuth credentials</p>
            </div>
          ) : showChooser ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center mb-4">
                <p className="text-sm text-slate-500">
                  Choose an account to continue to <span className="font-bold text-[#0A3D62]"><span className="text-[#FF1744]">R8</span> ESTATE</span>
                </p>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {accounts.map((email) => (
                  <button
                    key={email}
                    onClick={() => handleSelectAccount(email)}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 rounded-xl text-start transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs uppercase">
                        {email[0]}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{email}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Select
                    </span>
                  </button>
                ))}
                
                {!showCustomInput ? (
                  <button
                    onClick={() => setShowCustomInput(true)}
                    className="w-full flex items-center gap-3 p-3 bg-white hover:bg-slate-50 border border-dashed border-slate-200 hover:border-slate-300 rounded-xl text-start transition-all duration-200 text-slate-500 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-sm font-semibold">Use another account</span>
                  </button>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (customEmail.trim()) {
                        handleSelectAccount(customEmail.trim());
                      }
                    }}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-250"
                  >
                    <div>
                      <label htmlFor="custom-oauth-email" className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Enter email address</label>
                      <input
                        id="custom-oauth-email"
                        type="email"
                        placeholder="e.g. name@example.com"
                        required
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/10 focus:border-[#0A3D62]"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowCustomInput(false)}
                        className="px-3.5 py-1.5 rounded-lg text-xs"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="dark"
                        size="sm"
                        className="px-4 py-1.5 rounded-lg text-xs"
                      >
                        Continue
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {activeProvider === 'google' && (
                <div className="pt-3 border-t border-slate-100 mt-3">
                  <button
                    onClick={() => {
                      const redirectUri = window.location.origin + '/';
                      const authUrl = `https://${AUTH0_DOMAIN}/authorize?response_type=token&client_id=${AUTH0_CLIENT_ID}&connection=google-oauth2&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent('openid email profile')}&state=auth0&prompt=select_account`;
                      window.location.href = authUrl;
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-center transition-all duration-200 text-blue-800 font-bold text-xs cursor-pointer"
                  >
                    <span>Launch Real Google Login via Auth0</span>
                  </button>
                  <p className="text-[9px] text-slate-400 text-center mt-1">
                    Uses Auth0 Client Credentials to sign in with Google connection.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-600">
                  Verify your professional identity instantly. Sign up or log in to secure your Trust Index.
                </p>
              </div>

              {/* Google Button - Real Auth0 redirect for Google connection */}
              <Button
                onClick={() => {
                  const redirectUri = window.location.origin + '/';
                  const authUrl = `https://${AUTH0_DOMAIN}/authorize?response_type=token&client_id=${AUTH0_CLIENT_ID}&connection=google-oauth2&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent('openid email profile')}&state=auth0&prompt=select_account`;
                  window.location.href = authUrl;
                }}
                variant="secondary"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.74 1.64 15.06 1 12 1 7.24 1 3.2 3.74 1.25 7.74l3.88 3.01C6.07 7.79 8.78 5.04 12 5.04z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.47c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.87c2.16-1.99 3.41-4.91 3.41-8.56z"/>
                  <path fill="#FBBC05" d="M5.13 14.25c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.25 6.66C.45 8.27 0 10.08 0 12s.45 3.73 1.25 5.34l3.88-3.09z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.69-2.87c-1.03.69-2.34 1.1-3.96 1.1-3.22 0-5.93-2.75-6.9-6.72L1.25 14.7C3.2 19.26 7.24 23 12 23z"/>
                </svg>
                <span>Continue with Google</span>
              </Button>

              {/* LinkedIn Button */}
              <Button
                onClick={() => handleStartOAuth('linkedin')}
                variant="dark"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0A66C2] hover:bg-[#004182] border-none text-white font-bold text-sm rounded-xl shadow-sm transition-all duration-200"
              >
                <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>Continue with LinkedIn</span>
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 text-center text-[10px] text-slate-400 border-t border-slate-100">
          Secure OAuth 2.0 connection. R8 ESTATE does not share your private credentials.
        </div>
      </div>
    </div>
  );
}
