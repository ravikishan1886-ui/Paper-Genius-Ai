import React from 'react';
import {
  Sparkles,
  Camera,
  Layers,
  Scale,
  FileCheck2,
  Download,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  Smartphone,
} from 'lucide-react';

interface HomeHeroProps {
  onStartGenerator: () => void;
  onExploreFeatures: () => void;
  onLoadSamplePaper: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onStartGenerator,
  onExploreFeatures,
  onLoadSamplePaper,
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 bg-radial from-indigo-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 shadow-xs mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-indigo-900 tracking-wide">
              Turn Textbook Pages into Exam-Ready Question Papers
            </span>
          </div>

          {/* Prominent Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none max-w-4xl mx-auto">
            Create Your Question Paper <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              in Seconds with AI
            </span>
          </h1>

          {/* Short description */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Snap photos of your textbook pages with a mobile phone. PaperGenius AI extracts key concepts, mathematical formulas, and diagrams to formulate balanced examination papers for <strong className="text-slate-900">CBSE</strong>, <strong className="text-slate-900">PSEB</strong>, and <strong className="text-slate-900">ICSE</strong> boards.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onStartGenerator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 hover:from-blue-800 hover:to-purple-700 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Generate Question Paper</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={onExploreFeatures}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs hover:border-slate-400 transition-all"
            >
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Explore Features</span>
            </button>

            <button
              onClick={onLoadSamplePaper}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>View Sample Paper (80 Marks)</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-slate-600">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CBSE, PSEB & ICSE Formats</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Scale className="w-4 h-4 text-indigo-600" />
              <span>Strict 40–100 Marks Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <span>Complete Step-by-Step Solutions</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Download className="w-4 h-4 text-purple-600" />
              <span>Printable A4 PDF & Word Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* Android App APK Download Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-400 shadow-inner">
                <Smartphone className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Download Native Android APK
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Android 15 Compatible
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                    15.29 MB
                  </span>
                </div>
                <p className="text-sm text-slate-300 max-w-xl">
                  Install PaperGenius AI directly on your Lava Android 15 phone or any Android device (SDK 24+). Full Jetpack Compose & Material 3 native experience.
                </p>
                <div className="pt-2 text-xs text-slate-400 flex items-center gap-4 flex-wrap">
                  <span>✓ Built with Gradle & AndroidX</span>
                  <span>✓ Package: <code className="text-emerald-300 font-mono">com.papergenius.ai</code></span>
                  <span>✓ Fast Offline & Camera Access</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href="/api/download-apk"
                download="PaperGenius-AI.apk"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download APK (15.3 MB)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Engineered for Educators
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need for Official-Grade Examinations
          </h2>
          <p className="mt-2 text-slate-600">
            Designed for teachers, coaching academies, and tutors who want to formulate balanced tests without hours of typing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Photo-to-Paper */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Photo-to-Paper Generation
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload single or multiple mobile photographs of textbook pages. The vision model extracts text, chemical formulas, and diagrams to draft custom questions.
            </p>
          </div>

          {/* Card 2: Multiple Boards */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              CBSE, PSEB & ICSE Boards
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select your specific education board from Class 1 to 12. Generates section structures, competency questions, and internal choices matching the syllabus.
            </p>
          </div>

          {/* Card 3: Marks Allocation Engine */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Customizable Marks Engine
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Choose standard totals (40, 50, 60, 70, 80, 90, 100) or any custom mark. Our distribution engine guarantees that question marks strictly add up to your total.
            </p>
          </div>

          {/* Card 4: Answer Keys */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Separate Answer Keys & Solutions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Generate independent, confidential answer keys with step-by-step mathematical solutions and teacher marking schemes so students only see questions.
            </p>
          </div>

          {/* Card 5: PDF & Print */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Printable PDF & Word Export
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Download clean A4 PDFs formatted for immediate photocopying, print straight from your browser, or copy formatted text for Microsoft Word.
            </p>
          </div>

          {/* Card 6: Interactive Editor */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Interactive Editing & Regeneration
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dislike a specific question? Click one button to have AI regenerate that question with alternative phrasing or adjust marks with live auto-rebalancing.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works 3-Step Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Three Simple Steps to Exam-Ready Papers
            </h3>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              Say goodbye to hours spent re-typing textbook questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-6 rounded-2xl relative">
              <span className="text-3xl font-black text-indigo-400/80 mb-2 block">01</span>
              <h4 className="text-lg font-bold text-white mb-1">Set Exam Blueprint</h4>
              <p className="text-xs text-slate-300">
                Choose Board (CBSE, PSEB, ICSE), Class 1-12, Subject, and Total Marks (40 to 100).
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-6 rounded-2xl relative">
              <span className="text-3xl font-black text-indigo-400/80 mb-2 block">02</span>
              <h4 className="text-lg font-bold text-white mb-1">Upload Page Photos</h4>
              <p className="text-xs text-slate-300">
                Snap photos of textbook chapters or pick sample pages. AI analyzes concepts and formulas.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xs border border-white/15 p-6 rounded-2xl relative">
              <span className="text-3xl font-black text-indigo-400/80 mb-2 block">03</span>
              <h4 className="text-lg font-bold text-white mb-1">Preview, Edit & Print</h4>
              <p className="text-xs text-slate-300">
                Audit marks distribution, reword questions, and download vector A4 Question Paper + Answer Key.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onStartGenerator}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-md"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Get Started Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
