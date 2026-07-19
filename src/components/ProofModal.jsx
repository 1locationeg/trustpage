import React from 'react';
import { ShieldCheck, X, CheckCircle2, Lock } from 'lucide-react';

export default function ProofModal({ proofItem, onClose }) {
  if (!proofItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-xl p-6 border border-gray-200 text-gray-900 shadow-xl overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-1.5 text-[#0A3D62] text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-[#0A3D62]" />
          <span>R8ESTATE VERIFIED AUDIT PROOF</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 font-heading mb-3">
          {proofItem.title}
        </h3>

        {/* Verification Badge */}
        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{proofItem.confidence}% Verified Audit Match</span>
        </div>

        {/* Audit Details Grid */}
        <div className="space-y-3 bg-gray-50 rounded-lg p-4 border border-gray-200 text-xs mb-4">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Verification Source:</span>
            <span className="font-semibold text-gray-900">{proofItem.source}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Evidence Level:</span>
            <span className="font-semibold text-[#0A3D62]">{proofItem.evidenceLevel}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Transaction Date:</span>
            <span className="font-semibold text-gray-800">{proofItem.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Verified By:</span>
            <span className="font-semibold text-emerald-700">{proofItem.verifiedBy}</span>
          </div>
        </div>

        {/* Summary Description */}
        <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-700 leading-relaxed mb-5">
          <p className="font-semibold text-gray-900 mb-1">Audit Record Overview:</p>
          {proofItem.details}
        </div>

        {/* Bottom Lock / Security notice */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#0A3D62]" />
            Encrypted Immutable Record
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FAC417] text-slate-900 font-semibold text-xs rounded-full hover:bg-[#E5B210] transition-all font-heading"
          >
            Close Proof Record
          </button>
        </div>
      </div>
    </div>
  );
}
