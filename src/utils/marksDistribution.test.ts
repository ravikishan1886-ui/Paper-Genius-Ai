import test from 'node:test';
import assert from 'node:assert/strict';
import { generateSectionPlan, calculateTotalMarks, validateMarks } from './marksDistribution.ts';
import type { PaperSection } from '../types/paper.ts';

test('generateSectionPlan generates exact total marks for 80 marks', () => {
  const plan = generateSectionPlan(80, 'CBSE');
  const sum = plan.reduce((acc, s) => acc + s.totalMarks, 0);
  assert.equal(sum, 80);
});

test('generateSectionPlan generates exact total marks for 70 marks', () => {
  const plan = generateSectionPlan(70, 'CBSE');
  const sum = plan.reduce((acc, s) => acc + s.totalMarks, 0);
  assert.equal(sum, 70);
});

test('generateSectionPlan generates exact total marks for 100 marks', () => {
  const plan = generateSectionPlan(100, 'CBSE');
  const sum = plan.reduce((acc, s) => acc + s.totalMarks, 0);
  assert.equal(sum, 100);
});

test('calculateTotalMarks and validateMarks correctly verify arithmetic', () => {
  const sampleSections: PaperSection[] = [
    {
      name: 'Section A',
      title: 'MCQ',
      totalMarks: 5,
      questions: [
        { id: '1', questionNumber: 1, type: 'mcq', sectionName: 'Section A', questionText: 'Q1', marks: 1, answerKey: 'A' },
        { id: '2', questionNumber: 2, type: 'mcq', sectionName: 'Section A', questionText: 'Q2', marks: 2, answerKey: 'B' },
        { id: '3', questionNumber: 3, type: 'mcq', sectionName: 'Section A', questionText: 'Q3', marks: 2, answerKey: 'C' },
      ],
    },
  ];

  const total = calculateTotalMarks(sampleSections);
  assert.equal(total, 5);

  const validation = validateMarks(sampleSections, 5);
  assert.equal(validation.valid, true);
  assert.equal(validation.difference, 0);
});
