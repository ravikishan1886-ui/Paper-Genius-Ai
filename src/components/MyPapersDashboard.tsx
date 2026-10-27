import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  FileText,
  Search,
  Download,
  Copy,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  Filter,
  Cloud,
  CheckCircle2,
  LogIn,
  UploadCloud,
} from 'lucide-react';
import { GeneratedPaper } from '../types/paper';
import { getSavedPapers, deletePaper, duplicatePaper, savePaper } from '../utils/storage';
import { exportPaperToPdf } from '../utils/pdfExport';
import { DEMO_PREGENERATED_PAPER } from '../data/sampleData';
import { useAuth } from '../context/AuthContext';

interface MyPapersDashboardProps {
  onSelectPaper: (paper: GeneratedPaper) => void;
  onStartGenerator: () => void;
  onOpenAuthModal?: (mode: 'login' | 'signup') => void;
}

export const MyPapersDashboard: React.FC<MyPapersDashboardProps> = ({
  onSelectPaper,
  onStartGenerator,
  onOpenAuthModal,
}) => {
  const { user, savePaperToCloud, getCloudPapers, isFirebaseConfigured } = useAuth();
  const [papers, setPapers] = useState<GeneratedPaper[]>(() => getSavedPapers());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBoard, setFilterBoard] = useState<string>('ALL');
  const [cloudSyncedIds, setCloudSyncedIds] = useState<Set<string>>(new Set());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Sync papers from cloud if user is logged in
  useEffect(() => {
    let isMounted = true;
    if (user && isFirebaseConfigured) {
      setIsSyncing(true);
      getCloudPapers()
        .then((cloudList) => {
          if (!isMounted) return;
          if (cloudList && cloudList.length > 0) {
            // Merge cloud papers with local papers
            const local = getSavedPapers();
            const combinedMap = new Map<string, GeneratedPaper>();
            local.forEach((p) => combinedMap.set(p.id, p));
            cloudList.forEach((p) => {
              combinedMap.set(p.id, p);
              savePaper(p); // update local storage cache
            });
            const merged = Array.from(combinedMap.values());
            setPapers(merged);
            setCloudSyncedIds(new Set(cloudList.map((p) => p.id)));
          }
        })
        .catch((err) => {
          console.warn('Could not sync cloud papers:', err);
        })
        .finally(() => {
          if (isMounted) setIsSyncing(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [user, isFirebaseConfigured, getCloudPapers]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this saved question paper?')) {
      const remaining = deletePaper(id);
      setPapers(remaining);
      setCloudSyncedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleDuplicate = (id: string) => {
    const copy = duplicatePaper(id);
    if (copy) {
      setPapers(getSavedPapers());
    }
  };

  const handleRestoreDemo = () => {
    savePaper(DEMO_PREGENERATED_PAPER);
    setPapers(getSavedPapers());
  };

  const handleSyncToCloud = async (paper: GeneratedPaper) => {
    if (!user) {
      if (onOpenAuthModal) onOpenAuthModal('login');
      return;
    }
    try {
      await savePaperToCloud(paper);
      setCloudSyncedIds((prev) => new Set([...prev, paper.id]));
    } catch (e) {
      console.error('Failed to sync paper to cloud', e);
    }
  };

  const filteredPapers = papers.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.schoolName && p.schoolName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesBoard = filterBoard === 'ALL' || p.board === filterBoard;
    return matchesSearch && matchesBoard;
  });

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 mb-2">
            <FolderKanban className="w-3.5 h-3.5 text-blue-600" />
            <span>Saved Papers Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Question Papers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your previously generated question papers, download vector PDFs, or edit them anytime.
          </p>
        </div>

        <button
          onClick={onStartGenerator}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 shadow-md shadow-indigo-600/20 transition-all active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>New Question Paper</span>
        </button>
      </div>

      {/* Cloud Sync Status Card */}
      {user ? (
        <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-indigo-950">
                Connected as {user.email}
              </p>
              <p className="text-indigo-700 text-[11px]">
                {isSyncing ? 'Syncing with Firebase Cloud...' : 'Your question papers are securely saved to your Firebase cloud account.'}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Cloud Active
          </span>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-amber-300">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">Save your papers across all your devices</p>
              <p className="text-slate-300 text-[11px]">
                Sign in to back up your question papers to your personal Firebase cloud account.
              </p>
            </div>
          </div>
          {onOpenAuthModal && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenAuthModal('login')}
                className="w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors text-center shrink-0"
              >
                Log In / Sign Up
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search & Board Filter Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by subject, title or school..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Board:
          </span>
          {(['ALL', 'CBSE', 'PSEB', 'ICSE'] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setFilterBoard(b)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterBoard === b
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Papers Grid */}
      {filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPapers.map((item) => {
            const isCloudSynced = cloudSyncedIds.has(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Board & Marks Tags */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {item.board} • {item.classLevel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {user && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 ${
                            isCloudSynced
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                          title={isCloudSynced ? 'Synced to Firebase Cloud' : 'Click cloud icon to sync'}
                        >
                          <Cloud className="w-3 h-3" />
                          {isCloudSynced ? 'Cloud' : 'Local'}
                        </span>
                      )}
                      <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.totalMarks} Marks
                      </span>
                    </div>
                  </div>

                  {/* Title & Subject */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {item.subject} {item.schoolName ? `• ${item.schoolName}` : ''}
                    </p>
                  </div>

                  {/* Meta Details */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.sections?.length || 0} Sections</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.sections?.reduce((acc, s) => acc + s.questions.length, 0) || 0} Questions</span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => exportPaperToPdf(item, 'question_paper')}
                      className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Download Question Paper PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(item.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      title="Duplicate Question Paper"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {user && !isCloudSynced && (
                      <button
                        onClick={() => handleSyncToCloud(item)}
                        className="p-2 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        title="Upload to Firebase Cloud"
                      >
                        <UploadCloud className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Question Paper"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectPaper(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    <span>Open & Edit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FolderKanban className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">No question papers found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {searchTerm || filterBoard !== 'ALL'
                ? 'Try adjusting your search query or board filter.'
                : 'You have not saved any examination papers yet. You can generate a new one from textbook photos or restore the official CBSE sample paper.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartGenerator}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate First Paper</span>
            </button>
            <button
              onClick={handleRestoreDemo}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Load Official Sample Paper</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
