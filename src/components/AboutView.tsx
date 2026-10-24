import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, BookOpen, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-7 h-7 text-amber-300" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          About PaperGenius AI
        </h1>
        <p className="text-sm font-bold text-indigo-700 uppercase tracking-widest">
          Turn Textbook Pages into Exam-Ready Question Papers
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Our Educational Mission
        </h2>
        <p>
          Teachers and tutors spend countless late hours typing questions, formatting math equations, and balancing total marks for unit tests and annual examinations. PaperGenius AI was built to solve this friction entirely.
        </p>
        <p>
          By bridging Google Gemini's advanced multimodal vision capabilities with an educational board syllabus blueprint engine, educators can snap a photo of a textbook chapter on their phone and receive a complete, balanced examination paper in under 30 seconds.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Privacy & Photo Retention Policy</span>
          </h3>
          <p className="text-xs text-slate-600">
            Uploaded textbook page photographs are transmitted securely to our server-side API solely to perform OCR and question synthesis. We do not permanently store your photos. Generated question papers and answer keys are kept securely on your local browser device.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2">
          <h3 className="font-bold text-indigo-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Board Examination Disclaimer</span>
          </h3>
          <p className="text-xs text-indigo-950">
            PaperGenius AI generates textbook-based practice and assessment papers aligned with standard board patterns (CBSE, PSEB, and ICSE). They are intended as classroom assessment aids, unit tests, and pre-board practice tests, rather than official prediction papers.
          </p>
        </div>
      </div>
    </div>
  );
};
