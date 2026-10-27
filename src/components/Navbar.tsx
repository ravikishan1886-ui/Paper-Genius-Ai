import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  FolderKanban,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Cloud,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: 'home' | 'generator' | 'preview' | 'my-papers' | 'features' | 'about';
  onNavigate: (view: 'home' | 'generator' | 'preview' | 'my-papers' | 'features' | 'about') => void;
  savedPapersCount: number;
  hasActivePaper: boolean;
  onOpenAuthModal: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedPapersCount,
  hasActivePaper,
  onOpenAuthModal,
}) => {
  const { user, logout, isFirebaseConfigured } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

          {/* Action Buttons & Auth (Header Right) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* User Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {user.displayName ? user.displayName[0] : (user.email ? user.email[0] : 'U')}
                  </div>
                  <div className="hidden lg:block text-left pr-1">
                    <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                      {user.displayName || user.email?.split('@')[0]}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Cloud className="w-2.5 h-2.5" />
                      Cloud Synced
                    </p>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user.displayName || 'Educator Account'}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('my-papers');
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <FolderKanban className="w-3.5 h-3.5 text-indigo-600" />
                      <span>My Saved Papers</span>
                    </button>
                    <button
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await logout();
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAuthModal('login')}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuthModal('signup')}
                  className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors hidden sm:inline-flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Quick Generator CTA */}
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
          {!user ? (
            <button
              onClick={() => onOpenAuthModal('login')}
              className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 flex items-center gap-1 min-h-[34px]"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-600" />
              Log In
            </button>
          ) : (
            <button
              onClick={logout}
              className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 flex items-center gap-1 min-h-[34px]"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
