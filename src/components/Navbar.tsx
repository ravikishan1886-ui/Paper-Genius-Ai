import { FileText, Sparkles, FolderKanban, CheckCircle2, BookOpen, Smartphone, Download } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'generator' | 'preview' | 'my-papers' | 'features' | 'about';
  onNavigate: (view: 'home' | 'generator' | 'preview' | 'my-papers' | 'features' | 'about') => void;
  savedPapersCount: number;
  hasActivePaper: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedPapersCount,
  hasActivePaper,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo & Brand */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-hidden min-w-0 shrink"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform bg-indigo-950 flex items-center justify-center shrink-0 border border-indigo-200">
              <img
                src="/assets/aistudio/Screenshot_20261026-183944_2_d8c50829.jpg"
                alt="PaperGenius Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                  PaperGenius<span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                  CBSE • PSEB • ICSE
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block truncate">
                Turn Textbook Pages into Exam-Ready Question Papers
              </p>
            </div>
          </button>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'home'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('generator')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'generator'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Generate Paper
            </button>

            {hasActivePaper && (
              <button
                onClick={() => onNavigate('preview')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  currentView === 'preview'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4 text-blue-600" />
                Active Paper
              </button>
            )}

            <button
              onClick={() => onNavigate('my-papers')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'my-papers'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-slate-500" />
              My Papers
              {savedPapersCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-xs font-bold rounded-full bg-slate-200 text-slate-700">
                  {savedPapersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('features')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'features'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Features
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'about'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              About
            </button>
          </nav>

          {/* Action Buttons (Header Right) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="/api/download-apk"
              download="PaperGenius-AI.apk"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-xs"
              title="Download Android APK (15.3 MB)"
            >
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
              <span>APK</span>
            </a>

            <button
              onClick={() => onNavigate('generator')}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:from-blue-800 hover:to-purple-700 shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all active:scale-95 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">Generate Paper</span>
              <span className="sm:hidden">Generate</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Horizontal Scroll Strip */}
        <div className="flex md:hidden items-center gap-1.5 py-2 border-t border-slate-100 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => onNavigate('home')}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[34px] ${
              currentView === 'home'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('generator')}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all min-h-[34px] ${
              currentView === 'generator'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Generate
          </button>
          {hasActivePaper && (
            <button
              onClick={() => onNavigate('preview')}
              className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all min-h-[34px] ${
                currentView === 'preview'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-700 bg-blue-50 border border-blue-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Active Paper
            </button>
          )}
          <button
            onClick={() => onNavigate('my-papers')}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all min-h-[34px] ${
              currentView === 'my-papers'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5 text-slate-500" />
            My Papers {savedPapersCount > 0 ? `(${savedPapersCount})` : ''}
          </button>
          <a
            href="/api/download-apk"
            download="PaperGenius-AI.apk"
            className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1 min-h-[34px]"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            Download APK
          </a>
          <button
            onClick={() => onNavigate('features')}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[34px] ${
              currentView === 'features'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[34px] ${
              currentView === 'about'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            About
          </button>
        </div>
      </div>
    </header>
  );
};
