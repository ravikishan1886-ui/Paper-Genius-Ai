import React from 'react';
import {
  Sparkles,
  Camera,
  Layers,
  Scale,
  FileCheck2,
  Download,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface FeaturesViewProps {
  onStartGenerator: () => void;
}

export const FeaturesView: React.FC<FeaturesViewProps> = ({ onStartGenerator }) => {
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
      <div className="text-center space-y-2 sm:space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Core Capabilities
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How PaperGenius AI Works
        </h1>
        <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto">
          Combining vision-capable Gemini AI with a strict marks-balancing allocation engine to generate reliable Indian school question papers.
        </p>
      </div>

      {/* Deep Dive Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Camera className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Multimodal OCR & Vision Understanding
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our vision pipeline inspects textbook photographs taken on Android and iOS mobile devices. It reads complex mathematical notation, balance chemical equations (e.g., redox, precipitates), circuit diagrams, and biological definitions.
          </p>
          <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Detects blurry or unreadable sections and warns before generation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Synthesizes original conceptual questions rather than rote copy-pasting</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Strict Marks Distribution Engine
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike generic AI chat models that frequently produce papers with arithmetic errors, PaperGenius AI runs a deterministic marks distribution blueprint.
          </p>
          <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Strictly guarantees: Sum of all question marks = Selected Total (40 to 100)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Automatic section breakdowns (MCQ, VSA, Short Answer, Long Answer, Case-based)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Education Board Compliance
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Support for the three primary Indian education boards with class-specific subject taxonomy and section structures.
          </p>
          <div className="space-y-2 pt-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <strong className="text-slate-900">CBSE:</strong> 20 MCQs with Assertion-Reason, 2-mark VSA, 3-mark SA, 5-mark LA with internal choices, 4-mark case studies.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <strong className="text-slate-900">PSEB:</strong> Punjab board curriculum alignment including Punjabi language and bilingual terminologies.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <strong className="text-slate-900">ICSE:</strong> Council for the Indian School Certificate Examinations pattern with structured sub-questions.
            </div>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Separated Teacher Answer Keys & Solutions
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            By default, questions and answers are completely segregated. Students receive a clean, unblemished exam sheet, while evaluators receive step-by-step marking schemes.
          </p>
          <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Step marking: 1 mark for formula, 1 mark for substitution, 1 mark for final unit</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant download of both Question Paper PDF and Answer Key PDF</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onStartGenerator}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 shadow-lg shadow-indigo-600/25 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>Launch Generator Now</span>
        </button>
      </div>
    </div>
  );
};
