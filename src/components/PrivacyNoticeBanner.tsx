import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, X } from 'lucide-react';

interface PrivacyNoticeBannerProps {
  onOpenPrivacyPolicy: () => void;
}

const PRIVACY_DISMISS_KEY = 'papergenius_privacy_notice_dismissed_v1';

export const PrivacyNoticeBanner: React.FC<PrivacyNoticeBannerProps> = ({
  onOpenPrivacyPolicy,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(PRIVACY_DISMISS_KEY);
      if (!dismissed) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(PRIVACY_DISMISS_KEY, 'true');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="no-print fixed bottom-3 inset-x-3 sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700/60 text-xs space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-xs">
              Privacy &amp; Data Security Guarantee
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-300 text-[11px] leading-relaxed">
          Textbook page photos are processed in temporary memory for OCR question extraction and <strong>never permanently stored or used for public AI training</strong>. Cloud papers are AES-256 encrypted in Firebase.
        </p>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
          <button
            type="button"
            onClick={() => {
              onOpenPrivacyPolicy();
              handleDismiss();
            }}
            className="text-[11px] font-bold text-indigo-300 hover:text-indigo-200 underline flex items-center gap-1"
          >
            <span>Read Full Policy &amp; Security Audit</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
