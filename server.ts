import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateSectionPlan } from './src/utils/marksDistribution.js';
import type { GeneratedPaper, QuestionItem, PaperSection, EducationBoard, QuestionType } from './src/types/paper.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isDev = process.env.NODE_ENV !== 'production';

// Support large payload for multiple textbook page photos
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

// Initialize Google GenAI on server
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not defined in process.env');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Resilient Gemini call with fallback across supported models
async function callGeminiWithFallback(ai: GoogleGenAI, params: any) {
  // Model priority: gemini-3.8-flash (official standard), gemini-flash-latest, gemini-4-argon, gemini-3.1-flash-lite
  const candidateModels = [
    'gemini-3.8-flash',
    'gemini-flash-latest',
    'gemini-4-argon',
    'gemini-3.1-flash-lite',
  ];
  let lastError: any = null;
  for (const model of candidateModels) {
    try {
      return await ai.models.generateContent({
        ...params,
        model,
      });
    } catch (err: any) {
      console.warn(`Model ${model} attempt failed:`, err.message?.substring(0, 150));
      lastError = err;
      // On ANY failure (503 demand spikes, rate limits, timeouts, etc.), fallback to the next candidate model
      continue;
    }
  }
  throw lastError;
}

// Analyze textbook images endpoint
app.post('/api/analyze-images', async (req, res) => {
  try {
    const { images } = req.body;
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'Please provide at least one textbook page image.' });
    }

    const ai = getAiClient();
    const parts: any[] = [];

    // Add images as inline data or multimodal text
    images.forEach((img: { base64Data: string; mimeType: string }) => {
      if (img.base64Data.includes('svg+xml')) {
        let svgText = '';
        if (img.base64Data.includes(';base64,')) {
          const rawB64 = img.base64Data.split(';base64,')[1];
          svgText = Buffer.from(rawB64, 'base64').toString('utf-8');
        } else {
          try {
            const raw = img.base64Data.replace(/^data:image\/svg\+xml;?(utf8)?,?/, '');
            svgText = decodeURIComponent(raw.replace(/%(?![0-9a-fA-F]{2})/g, '%25'));
          } catch {
            svgText = img.base64Data;
          }
        }
        parts.push({
          text: `[Textbook Page Excerpt & Diagram Data]:\n${svgText}`,
        });
      } else {
        const cleanBase64 = img.base64Data.replace(/^data:[^;]+;base64,/, '').trim();
        parts.push({
          inlineData: {
            mimeType: img.mimeType && img.mimeType.startsWith('image/') ? img.mimeType : 'image/jpeg',
            data: cleanBase64,
          },
        });
      }
    });

    parts.push({
      text: `You are an expert educational curriculum specialist and OCR expert for Indian education boards (CBSE, PSEB, ICSE).
Analyze these uploaded textbook pages:
1. Assess readability (0 to 100).
2. Detect if images are blurred, too dark, or illegible. If illegible or unreadable, give specific warnings.
3. Detect the educational subject, class/grade suitability, and key chapters/topics covered.
4. Extract key concepts, definitions, formulas, scientific laws, or theorems found in the pages.
5. Identify any tables, diagrams, or numerical examples present.

Respond strictly in JSON:
{
  "readabilityScore": 85,
  "detectedSubject": "Science",
  "detectedClass": "Class 10",
  "topics": ["Types of Chemical Reactions", "Exothermic and Endothermic", "Corrosion and Rancidity"],
  "keyConcepts": ["Oxidation is loss of electrons/gain of oxygen", "Rancidity prevention by antioxidants"],
  "hasFormulas": true,
  "hasDiagrams": true,
  "warnings": []
}`,
    });

    const response = await callGeminiWithFallback(ai, {
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error analyzing images:', err);
    return res.status(500).json({
      error: err.message || 'Failed to analyze textbook images.',
    });
  }
});

// Generate question paper endpoint
app.post('/api/generate-paper', async (req, res) => {
  try {
    const {
      config,
      images = [],
      analysisData,
    } = req.body;

    if (!config) {
      return res.status(400).json({ error: 'Missing configuration.' });
    }

    const {
      board = 'CBSE',
      classLevel = 'Class 10',
      subject = 'Science',
      examType = 'Annual Examination',
      totalMarks = 80,
      difficulty = 'Moderate',
      durationMinutes = 180,
      selectedQuestionTypes = [],
      includeInternalChoice = true,
      includeCompetencyBased = true,
      includeAnswerKey = true,
      includeDetailedSolutions = true,
      includeMarkingScheme = true,
      schoolName = '',
      examinationHeading = '',
    } = config;

    const targetMarks = Math.max(40, Math.min(100, Number(totalMarks) || 80));
    const sectionPlan = generateSectionPlan(targetMarks, board as EducationBoard, selectedQuestionTypes);

    const planSummary = sectionPlan.map(s =>
      `${s.name}: ${s.title} -> ${s.questionCount} questions x ${s.marksPerQuestion} mark(s) = ${s.totalMarks} marks`
    ).join('\n');

    const ai = getAiClient();
    const parts: any[] = [];

    // Attach textbook page images if provided
    if (Array.isArray(images) && images.length > 0) {
      images.forEach((img: { base64Data: string; mimeType: string }) => {
        if (img.base64Data.includes('svg+xml')) {
          let svgText = '';
          if (img.base64Data.includes(';base64,')) {
            const rawB64 = img.base64Data.split(';base64,')[1];
            svgText = Buffer.from(rawB64, 'base64').toString('utf-8');
          } else {
            try {
              const raw = img.base64Data.replace(/^data:image\/svg\+xml;?(utf8)?,?/, '');
              svgText = decodeURIComponent(raw.replace(/%(?![0-9a-fA-F]{2})/g, '%25'));
            } catch {
              svgText = img.base64Data;
            }
          }
          parts.push({
            text: `[Textbook Page Excerpt & Diagram Data]:\n${svgText}`,
          });
        } else {
          const cleanBase64 = img.base64Data.replace(/^data:[^;]+;base64,/, '').trim();
          parts.push({
            inlineData: {
              mimeType: img.mimeType && img.mimeType.startsWith('image/') ? img.mimeType : 'image/jpeg',
              data: cleanBase64,
            },
          });
        }
      });
    }

    const promptText = `You are a master examination question paper setter for Indian school boards: ${board} (${board === 'CBSE' ? 'Central Board of Secondary Education' : board === 'PSEB' ? 'Punjab School Education Board' : 'Council for the Indian School Certificate Examinations'}).

TASK:
Generate a complete, official-standard question paper and matching answer key based on the attached textbook page photo(s) (and/or topic notes: ${analysisData?.topics?.join(', ') || subject}).

EXAMINATION DETAILS:
- Board: ${board}
- Class: ${classLevel}
- Subject: ${subject}
- Examination Type: ${examType}
- Maximum Marks: ${targetMarks}
- Time Allowed: ${durationMinutes} Minutes
- Difficulty Level: ${difficulty}
- School Name: ${schoolName || 'EXCELLENCE ACADEMY'}
- Heading: ${examinationHeading || `${examType} - Session 2026-27`}

STRICT MARKS AND SECTION BLUEPRINT (CRITICAL REQUIREMENT):
You MUST follow this exact structure so that the SUM of all question marks in each section equals the section total, and the total of all sections equals EXACTLY ${targetMarks} marks:

${planSummary}

CRITICAL RULES:
1. RELEVANCE: Base questions firmly on concepts, definitions, formulas, numerical problems, and diagrams found in the textbook pages. Avoid copying verbatim passages; formulate fresh, exam-standard questions.
2. NO DUPLICATES: Every question must be distinct and test a specific concept or application.
3. DIFFICULTY: Maintain "${difficulty}" level suitable for ${classLevel}.
4. INTERNAL CHOICES: ${includeInternalChoice ? 'Provide internal choices ("OR" questions) in Long Answer and Short Answer sections as per standard board pattern.' : 'Do not include internal choices.'}
5. COMPETENCY/CASE-BASED: ${includeCompetencyBased ? 'Include practical, application-oriented or case-based questions.' : 'Standard theoretical questions.'}
6. ANSWER KEY & SOLUTIONS: Include precise answer keys for all questions, step-by-step mathematical/chemical steps where applicable, and mark breakdown per step.
7. ACCURACY: Mathematical notation and scientific terminology must be 100% correct.
8. SUM OF ALL QUESTION MARKS MUST EXACTLY EQUAL ${targetMarks}.

Return strictly JSON matching this structure:
{
  "title": "${subject} ${examType}",
  "schoolName": "${schoolName || 'EXCELLENCE ACADEMY'}",
  "examinationHeading": "${examinationHeading || `${examType} 2026-27`}",
  "board": "${board}",
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "examType": "${examType}",
  "totalMarks": ${targetMarks},
  "durationMinutes": ${durationMinutes},
  "generalInstructions": [
    "All questions are compulsory. Internal choices are provided in some questions.",
    "Section A consists of objective questions carrying 1 mark each.",
    "Section B consists of very short answer questions carrying 2 marks each.",
    "Section C consists of short answer questions carrying 3 marks each.",
    "Section D consists of long answer questions carrying 5 marks each.",
    "Use of calculators is strictly prohibited."
  ],
  "topicsCovered": ["Topic 1", "Topic 2"],
  "sections": [
    {
      "name": "Section A",
      "title": "Multiple Choice Questions",
      "instructions": "Select the correct option for each question.",
      "totalMarks": 20,
      "questions": [
        {
          "id": "q1",
          "questionNumber": 1,
          "type": "mcq",
          "sectionName": "Section A",
          "questionText": "Question text here?",
          "marks": 1,
          "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
          "answerKey": "(A) Option A text",
          "solutionSteps": ["Reason/Explanation for option A"],
          "markingScheme": "1 mark for correct option"
        }
      ]
    }
  ],
  "analysisReport": {
    "pagesAnalyzed": ${images.length || 1},
    "readabilityScore": 90,
    "extractedTopics": ["Topic A", "Topic B"],
    "isTextbookBasedPractice": true
  }
}`;

    parts.push({ text: promptText });

    const response = await callGeminiWithFallback(ai, {
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '{}';
    let paperData: GeneratedPaper;
    try {
      paperData = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini response as JSON:', responseText);
      throw new Error('AI output was not valid JSON. Please try generating again.');
    }

    // Ensure ID, timestamps, and metadata
    paperData.id = 'pg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    paperData.createdAt = new Date().toISOString();
    paperData.updatedAt = new Date().toISOString();
    paperData.board = board;
    paperData.classLevel = classLevel;
    paperData.subject = subject;
    paperData.examType = examType;
    paperData.totalMarks = targetMarks;
    paperData.durationMinutes = durationMinutes;
    if (schoolName) paperData.schoolName = schoolName;
    if (examinationHeading) paperData.examinationHeading = examinationHeading;

    // POST-GENERATION ARITHMETIC RECONCILIATION
    // Verify question marks sum to targetMarks. If there is any discrepancy,
    // enforce exact section and question marks alignment.
    let runningQNum = 1;
    let computedTotal = 0;

    if (!paperData.sections || paperData.sections.length === 0) {
      // Fallback sections if model produced empty array
      paperData.sections = sectionPlan.map((s, idx) => ({
        name: s.name,
        title: s.title,
        totalMarks: s.totalMarks,
        questions: Array.from({ length: s.questionCount }).map((_, qIdx) => ({
          id: `q_${idx}_${qIdx}`,
          questionNumber: runningQNum++,
          type: s.questionType,
          sectionName: s.name,
          questionText: `Sample concept question ${runningQNum} based on textbook topics.`,
          marks: s.marksPerQuestion,
          options: s.questionType === 'mcq' ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined,
          answerKey: s.questionType === 'mcq' ? '(A) Option A' : 'Detailed concept explanation.',
        })),
      }));
    } else {
      // Re-number sequentially and ensure every question has a valid ID and marks
      paperData.sections.forEach((sec, sIdx) => {
        let secSum = 0;
        sec.questions.forEach((q, qIdx) => {
          q.id = q.id || `q_${sIdx}_${qIdx}_${Date.now()}`;
          q.questionNumber = runningQNum++;
          q.sectionName = sec.name;
          q.marks = Number(q.marks) || 1;
          secSum += q.marks;
        });
        sec.totalMarks = secSum;
        computedTotal += secSum;
      });
    }

    // If computedTotal does not equal targetMarks, adjust the last question or marks cleanly
    if (computedTotal !== targetMarks && paperData.sections.length > 0) {
      const diff = targetMarks - computedTotal;
      const lastSection = paperData.sections[paperData.sections.length - 1];
      if (lastSection && lastSection.questions.length > 0) {
        const lastQ = lastSection.questions[lastSection.questions.length - 1];
        if (lastQ.marks + diff > 0) {
          lastQ.marks += diff;
          lastSection.totalMarks += diff;
        }
      }
    }

    return res.json({
      success: true,
      paper: paperData,
    });
  } catch (err: any) {
    console.error('Error generating paper:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate question paper. Please verify uploaded photos and try again.',
    });
  }
});

// Regenerate single question endpoint
app.post('/api/regenerate-question', async (req, res) => {
  try {
    const { question, board, classLevel, subject, topics = [] } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Missing question payload.' });
    }

    const ai = getAiClient();
    const prompt = `You are an expert question paper creator for ${board || 'CBSE'} ${classLevel || 'Class 10'} ${subject || 'Science'}.
Regenerate a brand new, high-quality question to replace the following question:
Original Question: "${question.questionText}"
Question Type: ${question.type}
Marks: ${question.marks}
Topics: ${topics.join(', ') || subject}

Generate an original, alternative question testing a relevant textbook concept with the same mark value (${question.marks} marks).
If MCQ, provide 4 distinct options.
Provide the correct answer key and step-by-step solution.

Respond strictly in JSON:
{
  "questionText": "New question text here?",
  "marks": ${question.marks},
  "options": ${question.options ? '["Option A", "Option B", "Option C", "Option D"]' : 'null'},
  "answerKey": "Correct answer with explanation",
  "solutionSteps": ["Step 1 explanation"],
  "markingScheme": "${question.marks} mark(s) for complete answer"
}`;

    const response = await callGeminiWithFallback(ai, {
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    const updatedQuestion: QuestionItem = {
      ...question,
      questionText: parsed.questionText || question.questionText,
      options: parsed.options || question.options,
      answerKey: parsed.answerKey || question.answerKey,
      solutionSteps: parsed.solutionSteps || question.solutionSteps,
      markingScheme: parsed.markingScheme || question.markingScheme,
    };

    return res.json({ success: true, question: updatedQuestion });
  } catch (err: any) {
    console.error('Error regenerating question:', err);
    return res.status(500).json({ error: err.message || 'Failed to regenerate question.' });
  }
});

// Download Android APK endpoint
app.get(['/api/download-apk', '/download/PaperGenius-AI.apk', '/PaperGenius-AI.apk', '/app-debug.apk'], (req, res) => {
  const candidatePaths = [
    path.resolve(__dirname, 'android-app/app/build/outputs/apk/debug/app-debug.apk'),
    path.resolve(__dirname, 'app/build/outputs/apk/debug/app-debug.apk'),
    path.resolve(__dirname, 'android-app/app/build/outputs/apk/release/app-release.apk'),
  ];

  for (const apkPath of candidatePaths) {
    if (fs.existsSync(apkPath)) {
      const stats = fs.statSync(apkPath);
      res.setHeader('Content-Type', 'application/vnd.android.package-archive');
      res.setHeader('Content-Disposition', 'attachment; filename="PaperGenius-AI.apk"');
      res.setHeader('Content-Length', stats.size);
      const stream = fs.createReadStream(apkPath);
      return stream.pipe(res);
    }
  }

  // If not found locally, redirect browser to GitHub Actions build artifacts or show friendly guidance
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.redirect('https://github.com/ravikishan1886-ui/Paper-Genius-Ai/actions');
  }

  return res.status(404).json({
    error: 'APK not found on server disk. You can download the latest built APK directly from GitHub Actions: https://github.com/ravikishan1886-ui/Paper-Genius-Ai/actions',
    githubActionsUrl: 'https://github.com/ravikishan1886-ui/Paper-Genius-Ai/actions',
  });
});

// APK status endpoint
app.get('/api/apk-status', (req, res) => {
  const candidatePaths = [
    path.resolve(__dirname, 'android-app/app/build/outputs/apk/debug/app-debug.apk'),
    path.resolve(__dirname, 'app/build/outputs/apk/debug/app-debug.apk'),
  ];

  for (const apkPath of candidatePaths) {
    if (fs.existsSync(apkPath)) {
      const stats = fs.statSync(apkPath);
      return res.json({
        exists: true,
        sizeBytes: stats.size,
        sizeMb: (stats.size / (1024 * 1024)).toFixed(2),
        fileName: 'PaperGenius-AI.apk',
        downloadUrl: '/api/download-apk',
      });
    }
  }

  return res.json({ exists: false });
});

// Global API error handler ensuring JSON responses are always returned
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.path.startsWith('/api/')) {
    console.error('Unhandled API error on', req.path, err);
    return res.status(500).json({
      error: err?.message || 'A temporary server error occurred. Please try again.',
      success: false,
    });
  }
  next(err);
});

// Mount Vite middleware in dev mode, or serve static dist in prod
async function startServer() {
  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (dev: ${isDev})`);
  });
}

startServer();
