import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { GeneratorForm } from './components/GeneratorForm';
import { PaperPreview } from './components/PaperPreview';
import { MyPapersDashboard } from './components/MyPapersDashboard';
import { FeaturesView } from './components/FeaturesView';
import { AboutView } from './components/AboutView';
import { SecurityPrivacyView } from './components/SecurityPrivacyView';
import { PrivacyNoticeBanner } from './components/PrivacyNoticeBanner';
import { DownloadAppModal } from './components/DownloadAppModal';
import { AuthModal } from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { GeneratedPaper } from './types/paper';
import { getSavedPapers, savePaper } from './utils/storage';
import { DEMO_PREGENERATED_PAPER } from './data/sampleData';

type ViewType = 'home' | 'generator' | 'preview' | 'my-papers' | 'features' | 'about' | 'security-privacy';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [securityTab, setSecurityTab] = useState<'privacy' | 'security' | 'terms' | 'controls'>('privacy');
  const [activePaper, setActivePaper] = useState<GeneratedPaper | null>(null);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Capture PWA install prompt for 1-click installation
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Load saved count on mount
  useEffect(() => {
    const list = getSavedPapers();
    setSavedCount(list.length);
  }, [currentView]);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSecurity = (tab: 'privacy' | 'security' | 'terms' | 'controls' = 'privacy') => {
    setSecurityTab(tab);
    setCurrentView('security-privacy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaperGenerated = (paper: GeneratedPaper) => {
    setActivePaper(paper);
    savePaper(paper);
    const updated = getSavedPapers();
    setSavedCount(updated.length);
    setCurrentView('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSample = () => {
    setActivePaper(DEMO_PREGENERATED_PAPER);
    setCurrentView('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPaperFromDashboard = (paper: GeneratedPaper) => {
    setActivePaper(paper);
    setCurrentView('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        savedPapersCount={savedCount}
        hasActivePaper={Boolean(activePaper)}
        onOpenAuthModal={handleOpenAuth}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeHero
            onStartGenerator={() => handleNavigate('generator')}
            onExploreFeatures={() => handleNavigate('features')}
            onLoadSamplePaper={handleLoadSample}
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        )}

        {currentView === 'generator' && (
          <GeneratorForm onPaperGenerated={handlePaperGenerated} />
        )}

        {currentView === 'preview' && activePaper && (
          <PaperPreview
            paper={activePaper}
            onUpdatePaper={(updated) => setActivePaper(updated)}
            onBackToGenerator={() => handleNavigate('generator')}
          />
        )}

        {currentView === 'my-papers' && (
          <MyPapersDashboard
            onSelectPaper={handleSelectPaperFromDashboard}
            onStartGenerator={() => handleNavigate('generator')}
            onOpenAuthModal={handleOpenAuth}
          />
        )}

        {currentView === 'features' && (
          <FeaturesView onStartGenerator={() => handleNavigate('generator')} />
        )}

        {currentView === 'about' && (
          <AboutView onNavigateToSecurity={handleNavigateToSecurity} />
        )}

        {currentView === 'security-privacy' && (
          <SecurityPrivacyView
            initialTab={securityTab}
            onNavigateToGenerator={() => handleNavigate('generator')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-10 mt-16 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-indigo-950 shrink-0">
                <img
                  src="/assets/aistudio/Screenshot_20261026-183944_2_d8c50829.jpg"
                  alt="PaperGenius Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm">
                  PaperGenius <span className="text-indigo-600">AI</span>
                </span>
                <p className="text-[11px] text-slate-400">
                  Turn Textbook Pages into Exam-Ready Question Papers
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold">
              <button
                onClick={() => handleNavigate('home')}
                className="hover:text-indigo-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate('generator')}
                className="hover:text-indigo-600 transition-colors"
              >
                Generate Paper
              </button>
              <button
                onClick={() => handleNavigate('my-papers')}
                className="hover:text-indigo-600 transition-colors"
              >
                My Papers
              </button>
              <button
                onClick={() => handleNavigate('features')}
                className="hover:text-indigo-600 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => handleNavigate('about')}
                className="hover:text-indigo-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigateToSecurity('privacy')}
                className="hover:text-indigo-600 transition-colors text-emerald-700 font-bold"
              >
                Privacy &amp; Security
              </button>
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="hover:text-emerald-700 transition-colors text-emerald-600 font-bold flex items-center gap-1"
              >
                <span>Download App / APK</span>
              </button>
            </div>
          </div>

          {/* Privacy & Legal Sub-Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] text-slate-500 font-medium">
            <button
              onClick={() => handleNavigateToSecurity('privacy')}
              className="hover:text-slate-900 underline underline-offset-2"
            >
              Privacy Policy (DPDP Act 2023)
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => handleNavigateToSecurity('security')}
              className="hover:text-slate-900 underline underline-offset-2"
            >
              Security Architecture &amp; Encryption
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => handleNavigateToSecurity('terms')}
              className="hover:text-slate-900 underline underline-offset-2"
            >
              Terms of Service &amp; Board Disclaimer
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => handleNavigateToSecurity('controls')}
              className="hover:text-slate-900 underline underline-offset-2 text-indigo-600"
            >
              Your Data Sovereignty Controls
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="hover:text-emerald-700 underline underline-offset-2 text-emerald-700 font-bold"
            >
              Get APK (All Devices)
            </button>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-center sm:text-left text-[11px]">
            <p>
              © {new Date().getFullYear()} PaperGenius AI • Made by Ravi Kishan. All rights reserved.
            </p>
            <p className="flex items-center justify-center gap-1">
              Zero photo retention • TLS 1.3 in-transit • Firebase AES-256 cloud encryption.
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Notice Banner on First Visit */}
      <PrivacyNoticeBanner
        onOpenPrivacyPolicy={() => handleNavigateToSecurity('privacy')}
      />

      {/* Download App (All Devices) Modal */}
      <DownloadAppModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        deferredPrompt={deferredPrompt}
      />

      {/* Educator Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
