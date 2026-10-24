import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Sparkles,
  Edit3,
  Trash2,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Eye,
  BookOpen,
  Save,
  Share2,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { GeneratedPaper, QuestionItem, PaperSection } from '../types/paper';
import { calculateTotalMarks, validateMarks, formatPaperAsText } from '../utils/marksDistribution';
import { exportPaperToPdf } from '../utils/pdfExport';
import { savePaper } from '../utils/storage';

interface PaperPreviewProps {
  paper: GeneratedPaper;
  onUpdatePaper: (updated: GeneratedPaper) => void;
  onBackToGenerator: () => void;
}

export const PaperPreview: React.FC<PaperPreviewProps> = ({
  paper,
  onUpdatePaper,
  onBackToGenerator,
}) => {
  // Tabs: 'student' (Question Paper only) vs 'teacher' (Answer Key & Solutions)
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);
  const [regeneratingQuestionId, setRegeneratingQuestionId] = useState<string | null>(null);

  // Live marks audit
  const currentTotal = calculateTotalMarks(paper.sections);
  const marksValidation = validateMarks(paper.sections, paper.totalMarks);

  // Regenerate an individual question using AI
  const handleRegenerateQuestion = async (q: QuestionItem) => {
    setRegeneratingQuestionId(q.id);
    try {
      const response = await fetch('/api/regenerate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          board: paper.board,
          classLevel: paper.classLevel,
          subject: paper.subject,
          topics: paper.topicsCovered,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to regenerate question.');
      }

      const data = await response.json();
      if (data.success && data.question) {
        // Replace question in the section
        const updatedSections = paper.sections.map((section) => ({
          ...section,
          questions: section.questions.map((item) => (item.id === q.id ? data.question : item)),
        }));

        const updatedPaper = {
          ...paper,
          sections: updatedSections,
          updatedAt: new Date().toISOString(),
        };
        onUpdatePaper(updatedPaper);
        savePaper(updatedPaper);
      }
    } catch (err: any) {
      alert(err.message || 'Could not regenerate question.');
    } finally {
      setRegeneratingQuestionId(null);
    }
  };

  // Modify question text
  const handleUpdateQuestionText = (sectionIdx: number, qIdx: number, newText: string) => {
    const updatedSections = [...paper.sections];
    updatedSections[sectionIdx].questions[qIdx].questionText = newText;
    const updatedPaper = { ...paper, sections: updatedSections, updatedAt: new Date().toISOString() };
    onUpdatePaper(updatedPaper);
  };

  // Modify question answer
  const handleUpdateAnswerText = (sectionIdx: number, qIdx: number, newAnswer: string) => {
    const updatedSections = [...paper.sections];
    updatedSections[sectionIdx].questions[qIdx].answerKey = newAnswer;
    const updatedPaper = { ...paper, sections: updatedSections, updatedAt: new Date().toISOString() };
    onUpdatePaper(updatedPaper);
  };

  // Modify question marks
  const handleUpdateQuestionMarks = (sectionIdx: number, qIdx: number, delta: number) => {
    const updatedSections = [...paper.sections];
    const q = updatedSections[sectionIdx].questions[qIdx];
    const newMarks = Math.max(1, q.marks + delta);
    q.marks = newMarks;

    // Recalculate section total
    updatedSections[sectionIdx].totalMarks = updatedSections[sectionIdx].questions.reduce(
      (sum, item) => sum + (Number(item.marks) || 0),
      0
    );

    const updatedPaper = { ...paper, sections: updatedSections, updatedAt: new Date().toISOString() };
    onUpdatePaper(updatedPaper);
  };

  // Delete question
  const handleDeleteQuestion = (sectionIdx: number, qIdx: number) => {
    if (confirm('Are you sure you want to delete this question?')) {
      const updatedSections = [...paper.sections];
      updatedSections[sectionIdx].questions.splice(qIdx, 1);
      // Recalculate section total
      updatedSections[sectionIdx].totalMarks = updatedSections[sectionIdx].questions.reduce(
        (sum, item) => sum + (Number(item.marks) || 0),
        0
      );

      // Re-number sequentially across paper
      let counter = 1;
      updatedSections.forEach((sec) => {
        sec.questions.forEach((q) => {
          q.questionNumber = counter++;
        });
      });

      const updatedPaper = { ...paper, sections: updatedSections, updatedAt: new Date().toISOString() };
      onUpdatePaper(updatedPaper);
      savePaper(updatedPaper);
    }
  };

  // Add question to section
  const handleAddQuestion = (sectionIdx: number) => {
    const targetSection = paper.sections[sectionIdx];
    const defaultMarks = targetSection.questions.length > 0 ? targetSection.questions[0].marks : 1;
    const newQuestion: QuestionItem = {
      id: 'q_user_' + Date.now(),
      questionNumber: 0,
      type: targetSection.questions.length > 0 ? targetSection.questions[0].type : 'short_answer',
      sectionName: targetSection.name,
      questionText: 'Type your custom question text here...',
      marks: defaultMarks,
      answerKey: 'Type the official answer or marking criteria here...',
      solutionSteps: ['Step 1: Explanation.'],
    };

    const updatedSections = [...paper.sections];
    updatedSections[sectionIdx].questions.push(newQuestion);
    updatedSections[sectionIdx].totalMarks = updatedSections[sectionIdx].questions.reduce(
      (sum, item) => sum + (Number(item.marks) || 0),
      0
    );

    // Re-number sequentially
    let counter = 1;
    updatedSections.forEach((sec) => {
      sec.questions.forEach((q) => {
        q.questionNumber = counter++;
      });
    });

    const updatedPaper = { ...paper, sections: updatedSections, updatedAt: new Date().toISOString() };
    onUpdatePaper(updatedPaper);
    savePaper(updatedPaper);
  };

  // Reorder question within section
  const handleMoveQuestion = (sectionIdx: number, qIdx: number, direction: 'up' | 'down') => {
    const updatedSections = [...paper.sections];
    const questions = updatedSections[sectionIdx].questions;
    const targetIdx = direction === 'up' ? qIdx - 1 : qIdx + 1;
    if (targetIdx < 0 || targetIdx >= questions.length) return;

    const [moved] = questions.splice(qIdx, 1);
    questions.splice(targetIdx, 0, moved);

    // Re-number sequentially
    let counter = 1;
    updatedSections.forEach((sec) => {
      sec.questions.forEach((q) => {
        q.questionNumber = counter++;
      });
    });

    const updatedPaper = { ...paper, sections: updatedSections, updatedAt: new Date().toISOString() };
    onUpdatePaper(updatedPaper);
  };

  // Copy plain text to clipboard
  const handleCopyText = () => {
    const formatted = formatPaperAsText(paper, activeTab === 'teacher');
    navigator.clipboard.writeText(formatted);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Save to persistent storage
  const handleSaveToMyPapers = () => {
    savePaper(paper);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  // Browser Print
  const handleBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Controls Bar (Hidden during Print) */}
      <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToGenerator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Generator</span>
            </button>

            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
              {paper.board} • {paper.classLevel}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                isEditMode
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditMode ? 'Done Editing' : 'Edit Paper'}</span>
            </button>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 bg-white transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedToast ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleBrowserPrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 bg-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print A4</span>
            </button>

            <button
              onClick={handleSaveToMyPapers}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedToast ? 'Saved in My Papers!' : 'Save Paper'}</span>
            </button>

            {/* Direct Vector PDF Export Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => exportPaperToPdf(paper, 'question_paper')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold text-white bg-blue-700 hover:bg-blue-800 shadow-xs transition-colors"
                title="Download Question Paper PDF without answers"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Question Paper PDF</span>
              </button>

              <button
                onClick={() => exportPaperToPdf(paper, 'answer_key')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold text-white bg-purple-700 hover:bg-purple-800 shadow-xs transition-colors"
                title="Download Teacher Answer Key PDF with marking scheme"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Answer Key PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Switcher & Marks Audit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Document Switcher */}
          <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'student'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📄 Student Question Paper
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'teacher'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔑 Teacher Answer Key & Solutions
            </button>
          </div>

          {/* Marks Validation Live Status */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Marks Status:</span>
            {marksValidation.valid ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Balanced: {currentTotal} / {paper.totalMarks} Marks (100% Match)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Current: {currentTotal} / {paper.totalMarks} Marks (Difference: {marksValidation.difference}M)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Examination Sheet Preview (Rendered as physical paper) */}
      <div className="print-page bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-12 space-y-6 text-slate-900 font-serif">
        {/* Paper Header / Title Block */}
        <div className="text-center space-y-1 pb-4 border-b-2 border-slate-900">
          {paper.schoolName ? (
            <h1 className="text-xl sm:text-2xl font-black tracking-wide text-slate-950 uppercase font-sans">
              {paper.schoolName}
            </h1>
          ) : (
            <h1 className="text-xl sm:text-2xl font-black tracking-wide text-slate-950 uppercase font-sans">
              EXAMINATION BOARD ASSESSMENT
            </h1>
          )}

          <h2 className="text-base sm:text-lg font-bold text-indigo-900 tracking-tight uppercase font-sans">
            {paper.examinationHeading || `${paper.examType} 2026-27`}
          </h2>

          {activeTab === 'teacher' && (
            <div className="py-1 px-3 inline-block rounded bg-red-100 border border-red-300 text-red-700 text-xs font-bold uppercase font-sans tracking-wider">
              CONFIDENTIAL TEACHER ANSWER KEY & MARKING SCHEME
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-between text-xs sm:text-sm font-sans font-bold text-slate-800 px-2">
            <div>
              Board: <span className="font-semibold text-slate-700">{paper.board}</span> | {paper.classLevel}
            </div>
            <div>
              Subject: <span className="font-semibold text-slate-700">{paper.subject}</span>
            </div>
            <div>
              Time Allowed: <span className="font-semibold text-slate-700">{Math.floor(paper.durationMinutes / 60)}h {paper.durationMinutes % 60}m</span>
            </div>
            <div>
              Maximum Marks: <span className="font-semibold text-slate-700">{paper.totalMarks}</span>
            </div>
          </div>
        </div>

        {/* General Instructions Block (Student View) */}
        {activeTab === 'student' && paper.generalInstructions && paper.generalInstructions.length > 0 && (
          <div className="text-xs sm:text-sm font-sans bg-slate-50/60 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900 uppercase tracking-wide">
              General Instructions:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-slate-700">
              {paper.generalInstructions.map((instruction, idx) => (
                <li key={idx} className="leading-relaxed">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-8">
          {paper.sections.map((section, sIdx) => (
            <div key={section.name} className="space-y-4">
              {/* Section Header Bar */}
              <div className="bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 flex items-center justify-between font-sans">
                <div>
                  <span className="font-extrabold text-blue-900 uppercase text-sm tracking-wide">
                    {section.name}:
                  </span>{' '}
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">
                    {section.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-sm border border-slate-200">
                    {section.totalMarks} Marks
                  </span>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => handleAddQuestion(sIdx)}
                      className="no-print inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Question</span>
                    </button>
                  )}
                </div>
              </div>

              {section.instructions && activeTab === 'student' && (
                <p className="text-xs italic text-slate-500 font-sans px-1">
                  {section.instructions}
                </p>
              )}

              {/* Questions in Section */}
              <div className="space-y-5">
                {section.questions.map((q, qIdx) => (
                  <div
                    key={q.id}
                    className={`p-3 rounded-xl transition-all font-sans relative group ${
                      isEditMode
                        ? 'border border-dashed border-amber-300 bg-amber-50/20'
                        : 'border-b border-slate-100 hover:bg-slate-50/40'
                    }`}
                  >
                    {/* Question Header & Marks */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        {isEditMode ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">
                                Q{q.questionNumber}.
                              </span>
                              <input
                                type="text"
                                value={q.questionText}
                                onChange={(e) => handleUpdateQuestionText(sIdx, qIdx, e.target.value)}
                                className="flex-1 p-2 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                            <strong className="font-bold text-slate-950 mr-1.5">
                              Q{q.questionNumber}.
                            </strong>
                            {q.questionText}
                          </p>
                        )}

                        {/* MCQ Options */}
                        {q.options && q.options.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-4 text-xs sm:text-sm text-slate-700">
                            {q.options.map((opt, oIdx) => {
                              const labels = ['(A)', '(B)', '(C)', '(D)'];
                              return (
                                <div key={oIdx} className="flex items-start gap-2">
                                  <span className="font-bold text-slate-900">
                                    {labels[oIdx] || `(${oIdx + 1})`}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Internal Choice ("OR" Question) */}
                        {q.internalChoice && activeTab === 'student' && (
                          <div className="pt-2 pl-4 border-l-2 border-indigo-200 mt-2 space-y-1">
                            <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                              --- OR ---
                            </p>
                            <p className="text-sm text-slate-800 leading-relaxed">
                              {q.internalChoice.questionText}
                            </p>
                            {q.internalChoice.options && q.internalChoice.options.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-700">
                                {q.internalChoice.options.map((opt, oIdx) => {
                                  const labels = ['(A)', '(B)', '(C)', '(D)'];
                                  return (
                                    <div key={oIdx} className="flex items-start gap-1.5">
                                      <span className="font-bold text-slate-900">{labels[oIdx]}</span>
                                      <span>{opt}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Teacher View: Answer Key & Solutions */}
                        {activeTab === 'teacher' && (
                          <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm space-y-1.5 font-sans">
                            <div className="flex items-center gap-2 text-emerald-900 font-bold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Official Answer:</span>
                              {isEditMode ? (
                                <input
                                  type="text"
                                  value={q.answerKey}
                                  onChange={(e) => handleUpdateAnswerText(sIdx, qIdx, e.target.value)}
                                  className="flex-1 p-1 rounded-sm border border-emerald-300 text-xs"
                                />
                              ) : (
                                <span className="font-semibold text-emerald-800">{q.answerKey}</span>
                              )}
                            </div>

                            {q.solutionSteps && q.solutionSteps.length > 0 && (
                              <div className="pl-6 space-y-1 text-slate-700">
                                <span className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                                  Step-by-Step Marking Scheme:
                                </span>
                                {q.solutionSteps.map((step, sIdx) => (
                                  <p key={sIdx} className="text-xs leading-relaxed">
                                    • {step}
                                  </p>
                                ))}
                              </div>
                            )}

                            {q.markingScheme && (
                              <p className="pl-6 text-[11px] text-slate-500 italic">
                                [Criteria: {q.markingScheme}]
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Marks Badge & Quick Edit Controls */}
                      <div className="flex flex-col items-end gap-1 shrink-0 font-sans">
                        <span className="text-xs font-extrabold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-200">
                          [{q.marks} Mark{q.marks > 1 ? 's' : ''}]
                        </span>

                        {/* Edit Mode Buttons */}
                        {isEditMode && (
                          <div className="no-print flex items-center gap-1 mt-1">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuestionMarks(sIdx, qIdx, 1)}
                              title="Increase Marks (+1)"
                              className="px-1.5 py-0.5 rounded-sm bg-slate-200 hover:bg-slate-300 text-xs font-bold"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuestionMarks(sIdx, qIdx, -1)}
                              title="Decrease Marks (-1)"
                              className="px-1.5 py-0.5 rounded-sm bg-slate-200 hover:bg-slate-300 text-xs font-bold"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveQuestion(sIdx, qIdx, 'up')}
                              disabled={qIdx === 0}
                              title="Move Up"
                              className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveQuestion(sIdx, qIdx, 'down')}
                              disabled={qIdx === section.questions.length - 1}
                              title="Move Down"
                              className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteQuestion(sIdx, qIdx)}
                              title="Delete Question"
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Regenerate Question Button */}
                        <button
                          type="button"
                          onClick={() => handleRegenerateQuestion(q)}
                          disabled={regeneratingQuestionId === q.id}
                          className="no-print opacity-0 group-hover:opacity-100 focus:opacity-100 inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-sm border border-indigo-200 transition-all mt-1"
                          title="Generate a fresh alternative question using AI"
                        >
                          <RefreshCw
                            className={`w-3 h-3 ${regeneratingQuestionId === q.id ? 'animate-spin' : ''}`}
                          />
                          <span>{regeneratingQuestionId === q.id ? 'Regenerating...' : 'Regenerate'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Paper Footer */}
        <div className="pt-6 border-t-2 border-slate-900 text-center font-sans text-xs text-slate-500 font-bold tracking-widest uppercase">
          *** END OF {activeTab === 'teacher' ? 'OFFICIAL ANSWER KEY & SOLUTIONS' : 'QUESTION PAPER'} ***
        </div>
      </div>
    </div>
  );
};
