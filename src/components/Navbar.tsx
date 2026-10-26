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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  PaperGenius<span className="text-indigo-600">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 border border-indigo-200">
                  CBSE • PSEB • ICSE
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Turn Textbook Pages into Exam-Ready Question Papers
              </p>
            </div>
          </button>

          {/* Navigation Links */}
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

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <a
              href="/api/download-apk"
              download="PaperGenius-AI.apk"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-xs"
              title="Download Android APK (15.3 MB)"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Download APK</span>
              <span className="sm:hidden">APK</span>
            </a>

            <button
              onClick={() => onNavigate('generator')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:from-blue-800 hover:to-purple-700 shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Generate Paper</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`py-1 px-2 rounded-sm ${currentView === 'home' ? 'text-indigo-600 font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('generator')}
            className={`py-1 px-2 rounded-sm ${currentView === 'generator' ? 'text-indigo-600 font-bold' : ''}`}
          >
            Generate
          </button>
          <a
            href="/api/download-apk"
            download="PaperGenius-AI.apk"
            className="py-1 px-2 rounded-sm text-emerald-700 font-bold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            APK
          </a>
          {hasActivePaper && (
            <button
              onClick={() => onNavigate('preview')}
              className={`py-1 px-2 rounded-sm ${currentView === 'preview' ? 'text-indigo-600 font-bold' : ''}`}
            >
              Active Paper
            </button>
          )}
          <button
            onClick={() => onNavigate('my-papers')}
            className={`py-1 px-2 rounded-sm ${currentView === 'my-papers' ? 'text-indigo-600 font-bold' : ''}`}
          >
            My Papers ({savedPapersCount})
          </button>
          <button
            onClick={() => onNavigate('features')}
            className={`py-1 px-2 rounded-sm ${currentView === 'features' ? 'text-indigo-600 font-bold' : ''}`}
          >
            Features
          </button>
        </div>
      </div>
    </header>
  );
};
