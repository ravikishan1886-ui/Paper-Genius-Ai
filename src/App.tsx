import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { GeneratorForm } from './components/GeneratorForm';
import { PaperPreview } from './components/PaperPreview';
import { MyPapersDashboard } from './components/MyPapersDashboard';
import { FeaturesView } from './components/FeaturesView';
import { AboutView } from './components/AboutView';
import { AuthModal } from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { GeneratedPaper } from './types/paper';
import { getSavedPapers, savePaper } from './utils/storage';
import { DEMO_PREGENERATED_PAPER } from './data/sampleData';

type ViewType = 'home' | 'generator' | 'preview' | 'my-papers' | 'features' | 'about';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activePaper, setActivePaper] = useState<GeneratedPaper | null>(null);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Load saved count on mount
  useEffect(() => {
    const list = getSavedPapers();
    setSavedCount(list.length);
  }, [currentView]);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
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
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeHero
            onStartGenerator={() => handleNavigate('generator')}
            onExploreFeatures={() => handleNavigate('features')}
            onLoadSamplePaper={handleLoadSample}
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

        {currentView === 'about' && <AboutView />}
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-10 mt-16 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} PaperGenius AI • Made by Ravi Kishan.
            </p>
            <p className="flex items-center justify-center gap-1 text-[11px]">
              Designed for CBSE, PSEB, and ICSE schools & educators.
            </p>
          </div>
        </div>
      </footer>

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
