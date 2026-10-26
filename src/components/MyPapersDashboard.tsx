import React, { useState } from 'react';
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
} from 'lucide-react';
import { GeneratedPaper } from '../types/paper';
import { getSavedPapers, deletePaper, duplicatePaper, savePaper } from '../utils/storage';
import { exportPaperToPdf } from '../utils/pdfExport';
import { DEMO_PREGENERATED_PAPER } from '../data/sampleData';

interface MyPapersDashboardProps {
  onSelectPaper: (paper: GeneratedPaper) => void;
  onStartGenerator: () => void;
}

export const MyPapersDashboard: React.FC<MyPapersDashboardProps> = ({
  onSelectPaper,
  onStartGenerator,
}) => {
  const [papers, setPapers] = useState<GeneratedPaper[]>(() => getSavedPapers());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterBoard, setFilterBoard] = useState<string>('ALL');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this saved question paper?')) {
      const remaining = deletePaper(id);
      setPapers(remaining);
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
          {filteredPapers.map((item) => (
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
                  <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.totalMarks} Marks
                  </span>
                </div>

                {/* Title & Subject */}
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Subject: <strong className="text-slate-700">{item.subject}</strong>
                  </p>
                  {item.schoolName && (
                    <p className="text-[11px] text-slate-400 truncate">
                      {item.schoolName}
                    </p>
                  )}
                </div>

                {/* Metadata info */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span>{item.sections?.length || 0} Sections</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPaper(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Paper</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => exportPaperToPdf(item, 'question_paper')}
                    title="Download Question Paper PDF"
                    className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDuplicate(item.id)}
                    title="Duplicate Paper"
                    className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    title="Delete Paper"
                    className="p-2 rounded-lg border border-slate-200 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No question papers found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You don't have any question papers matching your filter. Generate your first paper from textbook page photos or restore the sample CBSE paper.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestoreDemo}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Restore Sample Paper
            </button>
            <button
              onClick={onStartGenerator}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Generate New Paper
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
