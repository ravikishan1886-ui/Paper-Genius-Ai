import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Laptop,
  Apple,
  ShieldCheck,
  Copy,
  Check,
  QrCode,
  ArrowRight,
  Info,
} from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
}

type DeviceTab = 'android' | 'ios' | 'desktop';

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<DeviceTab>('android');
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);

  // Auto-detect user's device on open
  useEffect(() => {
    if (!isOpen) return;
    const ua = navigator.userAgent || '';
    if (/android/i.test(ua)) {
      setActiveTab('android');
    } else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      setActiveTab('ios');
    } else {
      setActiveTab('desktop');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDirectApkDownload = () => {
    setDownloadStarted(true);
    // Trigger download
    const link = document.createElement('a');
    link.href = '/api/download-apk';
    link.download = 'PaperGenius-AI.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsPwaInstalled(true);
        }
      } catch (err) {
        console.warn('PWA install prompt notice:', err);
      }
    } else {
      alert('To install on your current browser: Tap your browser menu (3 dots ⋮ or Share icon) and select "Install app" or "Add to Home screen".');
    }
  };

  const handleCopyLink = () => {
    const url = window.location.origin;
    navigator.clipboard?.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-indigo-400/30 bg-indigo-950 shrink-0 shadow-md">
              <img
                src="/assets/aistudio/Screenshot_20261026-183944_2_d8c50829.jpg"
                alt="PaperGenius Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Get PaperGenius AI App
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  All Devices Ready
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Download APK for Android or install as a Web App on iOS, Mac &amp; PC
              </p>
            </div>
          </div>

          {/* Device Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-indigo-800/60 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('android')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'android'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android (APK)</span>
            </button>

            <button
              onClick={() => setActiveTab('ios')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'ios'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iPhone / iPad (iOS)</span>
            </button>

            <button
              onClick={() => setActiveTab('desktop')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>PC / Mac / Web</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700">
          {/* ANDROID TAB */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              {/* Option A: Direct APK Download */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      1
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Direct APK File (For All Android Phones)
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Recommended
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  Compiled native Android app (15.6 MB). Compatible with Samsung, Xiaomi, Redmi, OnePlus, Vivo, Oppo, Realme, Motorola, Google Pixel, and all Android devices (Android 8.0 to 15+).
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <a
                    href="https://github.com/ravikishan1886-ui/Paper-Genius-Ai/actions/runs/41067433503"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-center"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official APK (15.6 MB)</span>
                  </a>

                  <a
                    href="/api/download-apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 text-xs text-center"
                    title="Direct Download Route"
                  >
                    <span>Direct Link</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>On GitHub Actions: Tap <strong>app-debug-apk</strong> under &quot;Artifacts&quot; to download the 15.6 MB package.</span>
                </div>
              </div>

              {/* Option B: 1-Tap Instant App (PWA) - 100% Zero Warnings */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <h4 className="font-bold text-indigo-950 text-sm">
                      Instant App (Zero Warnings Guarantee)
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                    No APK Prompts
                  </span>
                </div>

                <p className="text-xs text-indigo-900">
                  Want to skip sideloading prompts completely? Install directly from Chrome or Brave. It opens in full screen like a native app.
                </p>

                <button
                  type="button"
                  onClick={handleInstallPwa}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-indigo-700 bg-white border border-indigo-300 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>{isPwaInstalled ? 'App Already Installed!' : 'Install Instant App to Home Screen'}</span>
                </button>
              </div>

              {/* Android Installation Help Box */}
              <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 space-y-2 text-xs">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Quick Android Installation Steps:</span>
                </h5>
                <ol className="list-decimal pl-5 space-y-1 text-[11px] text-slate-600 leading-relaxed">
                  <li>Tap <strong>Download PaperGenius-AI.apk</strong> above.</li>
                  <li>When downloaded, open the notification or find <code>PaperGenius-AI.apk</code> in your <strong>Files / Downloads</strong> app.</li>
                  <li>Tap <strong>Install</strong>. If your phone asks permission to install from your browser/files, tap <strong>Allow</strong>.</li>
                  <li>If Google Play Protect displays a prompt, tap <strong>&quot;More details ⌄&quot;</strong> then <strong>&quot;Install anyway&quot;</strong>.</li>
                </ol>
              </div>
            </div>
          )}

          {/* IPHONE / IPAD TAB */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Apple className="w-5 h-5 text-slate-900" />
                  <span>How to Install on iPhone &amp; iPad</span>
                </div>

                <p className="text-xs text-blue-950 leading-relaxed">
                  Apple iOS does not run <code>.apk</code> files directly (Apple restricts sideloading). However, you can add PaperGenius AI directly to your iPhone / iPad home screen as a standalone application:
                </p>

                <div className="bg-white p-3.5 rounded-xl border border-blue-200 space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="text-slate-800">
                      Open this website in <strong>Apple Safari</strong> on your iPhone or iPad.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="text-slate-800">
                      Tap the <strong>Share button</strong> at the bottom of the screen (the square with an arrow pointing up: <Share2 className="w-3.5 h-3.5 inline text-blue-600 mx-0.5" />).
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="text-slate-800">
                      Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong> (⊞).
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      4
                    </span>
                    <p className="text-slate-800">
                      Tap <strong>&quot;Add&quot;</strong> in the top-right corner. The PaperGenius icon is now on your home screen!
                    </p>
                  </div>
                </div>
              </div>

              {/* Download APK anyway for transfer */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <h5 className="font-bold text-slate-900 text-xs">
                  Need the Android APK file from your iPhone?
                </h5>
                <p className="text-slate-600 text-[11px]">
                  You can download the <code>.apk</code> to your iCloud Drive or Files app to AirDrop or send to an Android phone or school tablet.
                </p>
                <button
                  type="button"
                  onClick={handleDirectApkDownload}
                  className="py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Download .APK to Files</span>
                </button>
              </div>
            </div>
          )}

          {/* DESKTOP / PC / MAC TAB */}
          {activeTab === 'desktop' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Laptop className="w-5 h-5 text-indigo-600" />
                  <span>Desktop App &amp; Transfer Options</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  You can install PaperGenius AI as a lightweight desktop application on your computer, or download the APK to transfer to an Android phone or test in an Android emulator.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleInstallPwa}
                    className="py-2.5 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <Laptop className="w-4 h-4" />
                    <span>Install on Chrome / Edge</span>
                  </button>

                  <a
                    href="https://github.com/ravikishan1886-ui/Paper-Genius-Ai/actions/runs/41067433503"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-xs text-center"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>Download APK (15.6 MB)</span>
                  </a>
                </div>
              </div>

              {/* Share link to mobile phone */}
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-950 text-xs flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Open directly on your phone</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-600">
                  Send this link to your phone via WhatsApp or email to open and install instantly:
                </p>
                <div className="p-2 rounded-lg bg-white border border-slate-200 font-mono text-[11px] text-slate-700 truncate select-all">
                  {window.location.origin}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500 text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Package: com.papergenius.ai • 100% Verified</span>
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
