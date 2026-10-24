import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTotalMarks,
  validateMarks,
  generateSectionPlan,
  getAvailableSubjects,
  formatPaperAsText,
} from './marksDistribution';
import { PaperSection, GeneratedPaper } from '../types/paper';

test('generateSectionPlan sums up strictly to target marks for all standard marks', () => {
  const marksToTest = [40, 50, 60, 70, 80, 90, 100, 45, 65, 75, 85];
  for (const mark of marksToTest) {
    const plan = generateSectionPlan(mark, 'CBSE');
    const total = plan.reduce((acc, s) => acc + s.totalMarks, 0);
    assert.equal(total, mark, `Plan for ${mark} marks should sum to exactly ${mark}`);
    // Also check that questionCount * marksPerQuestion equals totalMarks for each section
    for (const section of plan) {
      assert.equal(
        section.questionCount * section.marksPerQuestion,
        section.totalMarks,
        `Section ${section.name} math mismatch in ${mark} mark paper`
      );
    }
  }
});

test('calculateTotalMarks and validateMarks correctly calculate arithmetic', () => {
  const sampleSections: PaperSection[] = [
    {
      name: 'Section A',
      title: 'MCQs',
      totalMarks: 5,
      questions: [
        { id: '1', questionNumber: 1, type: 'mcq', sectionName: 'Section A', questionText: 'Q1', marks: 1, answerKey: 'A' },
        { id: '2', questionNumber: 2, type: 'mcq', sectionName: 'Section A', questionText: 'Q2', marks: 1, answerKey: 'B' },
        { id: '3', questionNumber: 3, type: 'mcq', sectionName: 'Section A', questionText: 'Q3', marks: 1, answerKey: 'C' },
        { id: '4', questionNumber: 4, type: 'mcq', sectionName: 'Section A', questionText: 'Q4', marks: 1, answerKey: 'D' },
        { id: '5', questionNumber: 5, type: 'mcq', sectionName: 'Section A', questionText: 'Q5', marks: 1, answerKey: 'A' },
      ],
    },
    {
      name: 'Section B',
      title: 'Short Answers',
      totalMarks: 6,
      questions: [
        { id: '6', questionNumber: 6, type: 'short_answer', sectionName: 'Section B', questionText: 'Q6', marks: 3, answerKey: 'Ans 6' },
        { id: '7', questionNumber: 7, type: 'short_answer', sectionName: 'Section B', questionText: 'Q7', marks: 3, answerKey: 'Ans 7' },
      ],
    },
  ];

  const total = calculateTotalMarks(sampleSections);
  assert.equal(total, 11);

  const validationMatch = validateMarks(sampleSections, 11);
  assert.equal(validationMatch.valid, true);
  assert.equal(validationMatch.difference, 0);

  const validationMismatch = validateMarks(sampleSections, 15);
  assert.equal(validationMismatch.valid, false);
  assert.equal(validationMismatch.difference, 4);
});

test('getAvailableSubjects returns relevant subjects for different classes and boards', () => {
  const cbseClass10 = getAvailableSubjects('CBSE', 'Class 10');
  assert.ok(cbseClass10.includes('Science'));
  assert.ok(cbseClass10.some(s => s.includes('Mathematics')));

  const psebClass10 = getAvailableSubjects('PSEB', 'Class 10');
  assert.ok(psebClass10.some(s => s.includes('Punjabi')));

  const icseClass12 = getAvailableSubjects('ICSE', 'Class 12');
  assert.ok(icseClass12.includes('Physics'));
});

test('formatPaperAsText generates formatted question paper text with header and sections', () => {
  const samplePaper: GeneratedPaper = {
    id: 'test-1',
    title: 'Science Periodic Test',
    schoolName: 'Delhi Public School',
    examinationHeading: 'Periodic Assessment I (2026-27)',
    board: 'CBSE',
    classLevel: 'Class 10',
    subject: 'Science',
    examType: 'Unit Test',
    totalMarks: 40,
    durationMinutes: 90,
    generalInstructions: ['All questions are compulsory.', 'Section A contains 1 mark questions.'],
    sections: [
      {
        name: 'Section A',
        title: 'Objective Type',
        totalMarks: 2,
        questions: [
          {
            id: 'q1',
            questionNumber: 1,
            type: 'mcq',
            sectionName: 'Section A',
            questionText: 'What is the chemical formula of Rust?',
            marks: 1,
            options: ['Fe2O3.xH2O', 'FeO', 'Fe3O4', 'Fe(OH)3'],
            answerKey: '(A) Fe2O3.xH2O',
          },
        ],
      },
    ],
    topicsCovered: ['Chemical Reactions and Equations'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const textOutput = formatPaperAsText(samplePaper, false);
  assert.ok(textOutput.includes('DELHI PUBLIC SCHOOL'));
  assert.ok(textOutput.includes('Maximum Marks: 40'));
  assert.ok(textOutput.includes('What is the chemical formula of Rust?'));
  assert.ok(textOutput.includes('(A) Fe2O3.xH2O'));
  assert.ok(!textOutput.includes('>> ANSWER:')); // Answers excluded in student view

  const teacherOutput = formatPaperAsText(samplePaper, true);
  assert.ok(teacherOutput.includes('>> ANSWER: (A) Fe2O3.xH2O'));
});
