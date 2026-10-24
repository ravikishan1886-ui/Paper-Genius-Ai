import { EducationBoard, GeneratedPaper, QuestionType, PaperSection } from '../types/paper';

export interface SectionPlan {
  name: string;
  title: string;
  questionType: QuestionType;
  questionCount: number;
  marksPerQuestion: number;
  totalMarks: number;
}

/**
 * Calculates the exact sum of all marks across all questions in the paper.
 */
export function calculateTotalMarks(sections: PaperSection[]): number {
  if (!sections || !Array.isArray(sections)) return 0;
  return sections.reduce((secAcc, section) => {
    const qSum = (section.questions || []).reduce((qAcc, q) => qAcc + (Number(q.marks) || 0), 0);
    return secAcc + qSum;
  }, 0);
}

/**
 * Validates whether the paper's questions sum matches targetTotal.
 */
export function validateMarks(sections: PaperSection[], targetTotal: number): {
  valid: boolean;
  currentTotal: number;
  difference: number;
  sectionBreakdown: { name: string; marks: number; count: number }[];
} {
  const breakdown = (sections || []).map((sec) => {
    const marks = (sec.questions || []).reduce((acc, q) => acc + (Number(q.marks) || 0), 0);
    return {
      name: sec.name,
      marks,
      count: sec.questions?.length || 0,
    };
  });

  const currentTotal = breakdown.reduce((acc, item) => acc + item.marks, 0);
  const difference = targetTotal - currentTotal;

  return {
    valid: currentTotal === targetTotal,
    currentTotal,
    difference,
    sectionBreakdown: breakdown,
  };
}

/**
 * Generates an educational board-aligned section breakdown blueprint
 * for any total marks (40 to 100).
 * Guarantees sum of section marks == totalMarks.
 */
export function generateSectionPlan(
  totalMarks: number,
  board: EducationBoard = 'CBSE',
  selectedTypes?: QuestionType[]
): SectionPlan[] {
  const safeMarks = Math.max(40, Math.min(100, Math.round(totalMarks)));

  // Standard Indian Board Distribution Models
  // E.g., for 80 marks (CBSE Class 10/12 standard blueprint):
  // Sec A: 20 MCQs x 1m = 20
  // Sec B: 6 VSA x 2m = 12
  // Sec C: 7 SA x 3m = 21
  // Sec D: 3 LA x 5m = 15
  // Sec E: 3 Case/Source x 4m = 12
  // Total = 20 + 12 + 21 + 15 + 12 = 80 marks!

  if (safeMarks === 80) {
    return [
      { name: 'Section A', title: 'Multiple Choice & Objective Questions', questionType: 'mcq', questionCount: 20, marksPerQuestion: 1, totalMarks: 20 },
      { name: 'Section B', title: 'Very Short Answer Type Questions', questionType: 'very_short', questionCount: 6, marksPerQuestion: 2, totalMarks: 12 },
      { name: 'Section C', title: 'Short Answer Type Questions', questionType: 'short_answer', questionCount: 7, marksPerQuestion: 3, totalMarks: 21 },
      { name: 'Section D', title: 'Long Answer Type Questions', questionType: 'long_answer', questionCount: 3, marksPerQuestion: 5, totalMarks: 15 },
      { name: 'Section E', title: 'Case-Based / Competency Questions', questionType: 'case_based', questionCount: 3, marksPerQuestion: 4, totalMarks: 12 },
    ];
  }

  if (safeMarks === 70) {
    // E.g., Physics/Chemistry 70 marks theory
    // Sec A: 16 MCQs x 1m = 16
    // Sec B: 5 VSA x 2m = 10
    // Sec C: 7 SA x 3m = 21
    // Sec D: 2 Case x 4m = 8
    // Sec E: 3 LA x 5m = 15
    // Total = 16 + 10 + 21 + 8 + 15 = 70 marks!
    return [
      { name: 'Section A', title: 'Multiple Choice Questions & Assertion-Reason', questionType: 'mcq', questionCount: 16, marksPerQuestion: 1, totalMarks: 16 },
      { name: 'Section B', title: 'Very Short Answer Questions', questionType: 'very_short', questionCount: 5, marksPerQuestion: 2, totalMarks: 10 },
      { name: 'Section C', title: 'Short Answer Questions', questionType: 'short_answer', questionCount: 7, marksPerQuestion: 3, totalMarks: 21 },
      { name: 'Section D', title: 'Case Study / Competency Questions', questionType: 'case_based', questionCount: 2, marksPerQuestion: 4, totalMarks: 8 },
      { name: 'Section E', title: 'Long Answer Questions', questionType: 'long_answer', questionCount: 3, marksPerQuestion: 5, totalMarks: 15 },
    ];
  }

  if (safeMarks === 100) {
    // 100 marks full paper
    // Sec A: 25 MCQs x 1m = 25
    // Sec B: 10 VSA x 2m = 20
    // Sec C: 9 SA x 3m = 27
    // Sec D: 4 LA x 5m = 20
    // Sec E: 2 Case x 4m = 8
    // Total = 25 + 20 + 27 + 20 + 8 = 100 marks!
    return [
      { name: 'Section A', title: 'Multiple Choice & Objective Questions', questionType: 'mcq', questionCount: 25, marksPerQuestion: 1, totalMarks: 25 },
      { name: 'Section B', title: 'Very Short Answer Questions', questionType: 'very_short', questionCount: 10, marksPerQuestion: 2, totalMarks: 20 },
      { name: 'Section C', title: 'Short Answer Questions', questionType: 'short_answer', questionCount: 9, marksPerQuestion: 3, totalMarks: 27 },
      { name: 'Section D', title: 'Long Answer Questions', questionType: 'long_answer', questionCount: 4, marksPerQuestion: 5, totalMarks: 20 },
      { name: 'Section E', title: 'Case-Based / Applied Problems', questionType: 'case_based', questionCount: 2, marksPerQuestion: 4, totalMarks: 8 },
    ];
  }

  if (safeMarks === 40) {
    // 40 marks unit/periodic test
    // Sec A: 10 MCQs x 1m = 10
    // Sec B: 4 VSA x 2m = 8
    // Sec C: 4 SA x 3m = 12
    // Sec D: 2 LA x 5m = 10
    // Total = 10 + 8 + 12 + 10 = 40 marks!
    return [
      { name: 'Section A', title: 'Objective Type Questions', questionType: 'mcq', questionCount: 10, marksPerQuestion: 1, totalMarks: 10 },
      { name: 'Section B', title: 'Very Short Answer Questions', questionType: 'very_short', questionCount: 4, marksPerQuestion: 2, totalMarks: 8 },
      { name: 'Section C', title: 'Short Answer Questions', questionType: 'short_answer', questionCount: 4, marksPerQuestion: 3, totalMarks: 12 },
      { name: 'Section D', title: 'Long Answer Questions', questionType: 'long_answer', questionCount: 2, marksPerQuestion: 5, totalMarks: 10 },
    ];
  }

  if (safeMarks === 50) {
    // 50 marks test
    // Sec A: 12 MCQs x 1m = 12
    // Sec B: 5 VSA x 2m = 10
    // Sec C: 6 SA x 3m = 18
    // Sec D: 2 LA x 5m = 10
    // Total = 12 + 10 + 18 + 10 = 50 marks!
    return [
      { name: 'Section A', title: 'Objective Questions', questionType: 'mcq', questionCount: 12, marksPerQuestion: 1, totalMarks: 12 },
      { name: 'Section B', title: 'Very Short Answer Questions', questionType: 'very_short', questionCount: 5, marksPerQuestion: 2, totalMarks: 10 },
      { name: 'Section C', title: 'Short Answer Questions', questionType: 'short_answer', questionCount: 6, marksPerQuestion: 3, totalMarks: 18 },
      { name: 'Section D', title: 'Long Answer Questions', questionType: 'long_answer', questionCount: 2, marksPerQuestion: 5, totalMarks: 10 },
    ];
  }

  if (safeMarks === 60) {
    // 60 marks test
    // Sec A: 15 MCQs x 1m = 15
    // Sec B: 6 VSA x 2m = 12
    // Sec C: 6 SA x 3m = 18
    // Sec D: 3 LA x 5m = 15
    // Total = 15 + 12 + 18 + 15 = 60 marks!
    return [
      { name: 'Section A', title: 'Objective Questions', questionType: 'mcq', questionCount: 15, marksPerQuestion: 1, totalMarks: 15 },
      { name: 'Section B', title: 'Very Short Answer Questions', questionType: 'very_short', questionCount: 6, marksPerQuestion: 2, totalMarks: 12 },
      { name: 'Section C', title: 'Short Answer Questions', questionType: 'short_answer', questionCount: 6, marksPerQuestion: 3, totalMarks: 18 },
      { name: 'Section D', title: 'Long Answer Questions', questionType: 'long_answer', questionCount: 3, marksPerQuestion: 5, totalMarks: 15 },
    ];
  }

  if (safeMarks === 90) {
    // 90 marks test
    // Sec A: 20 MCQs x 1m = 20
    // Sec B: 8 VSA x 2m = 16
    // Sec C: 8 SA x 3m = 24
    // Sec D: 4 LA x 5m = 20
    // Sec E: 2 Case x 5m = 10
    // Total = 20 + 16 + 24 + 20 + 10 = 90 marks!
    return [
      { name: 'Section A', title: 'Multiple Choice Questions', questionType: 'mcq', questionCount: 20, marksPerQuestion: 1, totalMarks: 20 },
      { name: 'Section B', title: 'Very Short Answer Questions', questionType: 'very_short', questionCount: 8, marksPerQuestion: 2, totalMarks: 16 },
      { name: 'Section C', title: 'Short Answer Questions', questionType: 'short_answer', questionCount: 8, marksPerQuestion: 3, totalMarks: 24 },
      { name: 'Section D', title: 'Long Answer Questions', questionType: 'long_answer', questionCount: 4, marksPerQuestion: 5, totalMarks: 20 },
      { name: 'Section E', title: 'Case-Based Analysis', questionType: 'case_based', questionCount: 2, marksPerQuestion: 5, totalMarks: 10 },
    ];
  }

  // Dynamic distribution for any custom mark between 40 and 100:
  // Allocate proportional percentages:
  // Objective (1m): ~25%
  // VSA (2m): ~20%
  // SA (3m): ~30%
  // LA (5m): ~25%
  let remaining = safeMarks;

  // LA: multiples of 5 marks
  const laCount = Math.max(1, Math.floor((safeMarks * 0.25) / 5));
  const laMarks = laCount * 5;
  remaining -= laMarks;

  // SA: multiples of 3 marks
  const saCount = Math.max(2, Math.floor((remaining * 0.45) / 3));
  const saMarks = saCount * 3;
  remaining -= saMarks;

  // VSA: multiples of 2 marks
  const vsaCount = Math.max(2, Math.floor((remaining * 0.45) / 2));
  const vsaMarks = vsaCount * 2;
  remaining -= vsaMarks;

  // Sec A gets whatever remains (1 mark questions)
  const mcqCount = remaining;
  const mcqMarks = mcqCount;

  return [
    { name: 'Section A', title: 'Objective Type Questions', questionType: 'mcq', questionCount: mcqCount, marksPerQuestion: 1, totalMarks: mcqMarks },
    { name: 'Section B', title: 'Very Short Answer Questions', questionType: 'very_short', questionCount: vsaCount, marksPerQuestion: 2, totalMarks: vsaMarks },
    { name: 'Section C', title: 'Short Answer Questions', questionType: 'short_answer', questionCount: saCount, marksPerQuestion: 3, totalMarks: saMarks },
    { name: 'Section D', title: 'Long Answer Questions', questionType: 'long_answer', questionCount: laCount, marksPerQuestion: 5, totalMarks: laMarks },
  ];
}

/**
 * Provides accurate curriculum subjects based on Board and Class.
 */
export function getAvailableSubjects(board: EducationBoard, classLevel: string): string[] {
  const numericClass = parseInt(classLevel.replace(/\D/g, ''), 10) || 10;

  if (numericClass <= 5) {
    return ['Mathematics', 'Environmental Studies (EVS)', 'English', 'Hindi', 'Punjabi', 'General Science'];
  }

  if (numericClass <= 8) {
    const list = ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'];
    if (board === 'PSEB') list.push('Punjabi', 'Computer Science');
    if (board === 'ICSE') list.push('History & Civics', 'Geography', 'Physics', 'Chemistry', 'Biology');
    return list;
  }

  if (numericClass <= 10) {
    if (board === 'CBSE') {
      return ['Mathematics (Standard)', 'Mathematics (Basic)', 'Science', 'Social Science', 'English Language & Literature', 'Hindi Course A', 'Hindi Course B', 'Information Technology'];
    }
    if (board === 'PSEB') {
      return ['Mathematics', 'Science', 'Social Science', 'Punjabi (A & B)', 'English', 'Hindi', 'Computer Science', 'Physical Education'];
    }
    if (board === 'ICSE') {
      return ['English Language', 'Literature in English', 'History & Civics', 'Geography', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Applications', 'Commercial Studies'];
    }
  }

  // Class 11 & 12 (Higher Secondary)
  if (board === 'CBSE' || board === 'PSEB') {
    const common = [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Biology',
      'Computer Science (Python)',
      'Accountancy',
      'Business Studies',
      'Economics',
      'History',
      'Political Science',
      'Geography',
      'English Core',
      'Physical Education',
    ];
    if (board === 'PSEB') common.unshift('Punjabi General');
    return common;
  }

  if (board === 'ICSE') {
    return [
      'English Paper 1 (Language)',
      'English Paper 2 (Literature)',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Biology',
      'Computer Science',
      'Accounts',
      'Commerce',
      'Economics',
      'History',
      'Political Science',
    ];
  }

  return ['Mathematics', 'Science', 'English', 'Social Science', 'Physics', 'Chemistry', 'Biology'];
}

/**
 * Formats full question paper and/or answer key into clean, standardized plain text
 * for copying to clipboard or saving as text files.
 */
export function formatPaperAsText(paper: GeneratedPaper, includeAnswers: boolean): string {
  const lines: string[] = [];
  lines.push('================================================================');
  if (paper.schoolName) {
    lines.push(paper.schoolName.toUpperCase());
  }
  lines.push(paper.examinationHeading || 'EXAMINATION QUESTION PAPER');
  lines.push(`Board: ${paper.board} | ${paper.classLevel} | Subject: ${paper.subject}`);
  lines.push(`Time Allowed: ${Math.floor(paper.durationMinutes / 60)}h ${paper.durationMinutes % 60}m | Maximum Marks: ${paper.totalMarks}`);
  lines.push('================================================================');
  lines.push('');

  if (paper.generalInstructions && paper.generalInstructions.length > 0) {
    lines.push('GENERAL INSTRUCTIONS:');
    paper.generalInstructions.forEach((inst, idx) => {
      lines.push(`${idx + 1}. ${inst}`);
    });
    lines.push('');
  }

  paper.sections.forEach((section) => {
    lines.push('----------------------------------------------------------------');
    lines.push(`${section.name.toUpperCase()} : ${section.title.toUpperCase()} (${section.totalMarks} Marks)`);
    if (section.instructions) {
      lines.push(`[${section.instructions}]`);
    }
    lines.push('----------------------------------------------------------------');
    lines.push('');

    section.questions.forEach((q) => {
      lines.push(`Q${q.questionNumber}. ${q.questionText}   [${q.marks} Mark${q.marks > 1 ? 's' : ''}]`);

      if (q.options && q.options.length > 0) {
        const labels = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, oIdx) => {
          lines.push(`    (${labels[oIdx] || oIdx + 1}) ${opt}`);
        });
      }

      if (q.internalChoice) {
        lines.push('');
        lines.push('    --- OR ---');
        lines.push(`    ${q.internalChoice.questionText}`);
        if (q.internalChoice.options && q.internalChoice.options.length > 0) {
          const labels = ['A', 'B', 'C', 'D'];
          q.internalChoice.options.forEach((opt, oIdx) => {
            lines.push(`    (${labels[oIdx] || oIdx + 1}) ${opt}`);
          });
        }
      }

      if (includeAnswers) {
        lines.push(`    >> ANSWER: ${q.answerKey}`);
        if (q.solutionSteps && q.solutionSteps.length > 0) {
          lines.push('    >> SOLUTION / MARKING SCHEME:');
          q.solutionSteps.forEach((step, sIdx) => {
            lines.push(`       Step ${sIdx + 1}: ${step}`);
          });
        }
        if (q.markingScheme) {
          lines.push(`    >> MARKING CRITERIA: ${q.markingScheme}`);
        }
      }

      lines.push('');
    });
  });

  lines.push('================================================================');
  lines.push('                     END OF QUESTION PAPER                      ');
  lines.push('================================================================');

  return lines.join('\n');
}
