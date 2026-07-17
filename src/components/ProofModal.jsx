import React from 'react';
import { ShieldCheck, X, CheckCircle2, FileText, Lock, Award, Building2, Calendar, Database } from 'lucide-react';

export default function ProofModal({ proofItem, onClose }) {
  if (!proofItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-card-gold rounded-3xl p-6 border border-[#D4AF37]/50 text-slate-100 shadow-2xl overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2 text-[#F3C66B] text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>R8ESTATE VERIFIED AUDIT PROOF</span>
        </div>

        <h3 className="text-xl font-bold text-white font-heading mb-3">
          {proofItem.title}
        </h3>

        {/* Verification Pill */}
        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold mb-4">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{proofItem.confidence}% Verified Audit Match</span>
        </div>

        {/* Audit Details Grid */}
        <div className="space-y-3 bg-[#0E1422]/90 rounded-2xl p-4 border border-slate-800 text-xs mb-4">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Verification Source:</span>
            <span className="font-semibold text-white">{proofItem.source}</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Evidence Level:</span>
            <span className="font-semibold text-[#F3C66B]">{proofItem.evidenceLevel}</span>
          </div>

          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Transaction Date:</span>
            <span className="font-semibold text-slate-200">{proofItem.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Verified By:</span>
            <span className="font-semibold text-emerald-400">{proofItem.verifiedBy}</span>
          </div>
        </div>

        {/* Summary Description */}
        <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-5">
          <p className="font-medium text-slate-200 mb-1">Audit Record Overview:</p>
          {proofItem.details}
        </div>

        {/* Bottom Lock / Security notice */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#D4AF37]" />
            Encrypted Immutable Record
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-[#F3C66B] transition-all font-heading"
          >
            Close Proof Record
          </button>
        </div>
      </div>
    </div>
  );
}
