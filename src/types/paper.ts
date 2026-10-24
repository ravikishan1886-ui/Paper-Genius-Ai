export type EducationBoard = 'CBSE' | 'PSEB' | 'ICSE';

export type ExamType =
  | 'Unit Test'
  | 'Chapter Test'
  | 'Half-Yearly Examination'
  | 'Annual Examination'
  | 'Pre-Board Examination'
  | 'Practice Paper';

export type DifficultyLevel = 'Easy' | 'Moderate' | 'Difficult' | 'Mixed';

export type QuestionType =
  | 'mcq'
  | 'fill_blanks'
  | 'true_false'
  | 'very_short'
  | 'short_answer'
  | 'long_answer'
  | 'case_based'
  | 'assertion_reason'
  | 'numerical'
  | 'diagram_based';

export interface QuestionInternalChoice {
  questionText: string;
  options?: string[];
  answerKey: string;
  solution?: string;
}

export interface QuestionItem {
  id: string;
  questionNumber: number | string;
  type: QuestionType;
  sectionName: string; // e.g. "Section A"
  questionText: string;
  marks: number;
  options?: string[];
  internalChoice?: QuestionInternalChoice;
  answerKey: string;
  solutionSteps?: string[];
  markingScheme?: string;
  chapterOrTopic?: string;
  diagramNote?: string;
}

export interface PaperSection {
  name: string; // "Section A"
  title: string; // "Objective Type Questions"
  instructions?: string;
  totalMarks: number;
  questions: QuestionItem[];
}

export interface AnalysisReport {
  pagesAnalyzed: number;
  readabilityScore: number;
  extractedTopics: string[];
  warnings?: string[];
  isTextbookBasedPractice: boolean;
}

export interface GeneratedPaper {
  id: string;
  title: string;
  schoolName?: string;
  schoolLogo?: string;
  examinationHeading: string;
  board: EducationBoard;
  classLevel: string;
  subject: string;
  examType: ExamType;
  totalMarks: number;
  durationMinutes: number;
  generalInstructions: string[];
  sections: PaperSection[];
  topicsCovered: string[];
  analysisReport?: AnalysisReport;
  createdAt: string;
  updatedAt: string;
}

export interface UploadedPagePhoto {
  id: string;
  fileName: string;
  previewUrl: string;
  base64Data: string;
  mimeType: string;
  sizeBytes: number;
}

export interface PaperGeneratorConfig {
  board: EducationBoard;
  classLevel: string;
  subject: string;
  customSubject?: string;
  examType: ExamType;
  totalMarks: number;
  difficulty: DifficultyLevel;
  selectedQuestionTypes: QuestionType[];
  autoSelectQuestionTypes: boolean;
  durationMinutes: number;
  includeInternalChoice: boolean;
  includeCompetencyBased: boolean;
  includeAnswerKey: boolean;
  includeDetailedSolutions: boolean;
  includeMarkingScheme: boolean;
  schoolName: string;
  examinationHeading: string;
  schoolLogo?: string;
}
