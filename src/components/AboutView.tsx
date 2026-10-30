import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onNavigateToSecurity?: (tab: 'privacy' | 'security' | 'terms') => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateToSecurity }) => {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-10">
      <div className="text-center space-y-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-indigo-200 mx-auto bg-indigo-950">
          <img
            src="/assets/aistudio/Screenshot_20261026-183944_2_d8c50829.jpg"
            alt="PaperGenius Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          About PaperGenius AI
        </h1>
        <p className="text-xs sm:text-sm font-bold text-indigo-700 uppercase tracking-widest">
          Turn Textbook Pages into Exam-Ready Question Papers
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-8 shadow-xs space-y-4 sm:space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Our Educational Mission
        </h2>
        <p>
          Teachers and tutors spend countless late hours typing questions, formatting math equations, and balancing total marks for unit tests and annual examinations. PaperGenius AI was built to solve this friction entirely.
        </p>
        <p>
          By bridging Google Gemini's advanced multimodal vision capabilities with an educational board syllabus blueprint engine, educators can snap a photo of a textbook chapter on their phone and receive a complete, balanced examination paper in under 30 seconds.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacy &amp; Zero Photo Retention Policy</span>
            </h3>
            {onNavigateToSecurity && (
              <button
                type="button"
                onClick={() => onNavigateToSecurity('privacy')}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 underline"
              >
                <span>Read Policy</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <p className="text-xs text-slate-600">
            Uploaded textbook page photographs are transmitted securely to our server-side API solely to perform OCR and question synthesis. We do not permanently store your photos. Generated question papers and answer keys are stored securely in your private Firebase cloud account and local browser cache.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-indigo-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Board Examination Disclaimer</span>
            </h3>
            {onNavigateToSecurity && (
              <button
                type="button"
                onClick={() => onNavigateToSecurity('terms')}
                className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5 underline"
              >
                <span>View Disclaimer</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <p className="text-xs text-indigo-950">
            PaperGenius AI generates textbook-based practice and assessment papers aligned with standard board patterns (CBSE, PSEB, and ICSE). They are intended as classroom assessment aids, unit tests, and pre-board practice tests, rather than official prediction papers.
          </p>
        </div>
      </div>
    </div>
  );
};
