import jsPDF from 'jspdf';
import { GeneratedPaper } from '../types/paper';

/**
 * Generates and downloads a clean, professional A4 PDF for Question Paper or Answer Key.
 */
export function exportPaperToPdf(paper: GeneratedPaper, mode: 'question_paper' | 'answer_key' = 'question_paper') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
      drawFooter();
    }
  };

  const drawFooter = () => {
    const pageCount = (doc.internal as any).getNumberOfPages ? (doc.internal as any).getNumberOfPages() : 1;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `PaperGenius AI  |  ${paper.subject} (${paper.classLevel})  |  Page ${pageCount}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  };

  // Header Banner
  doc.setDrawColor(200, 200, 200);
  doc.rect(margin, cursorY, contentWidth, mode === 'answer_key' ? 38 : 34);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // slate-900
  const schoolNameText = paper.schoolName ? paper.schoolName.toUpperCase() : 'EXCELLENCE EXAMINATION BOARD';
  doc.text(schoolNameText, pageWidth / 2, cursorY + 7, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(67, 56, 202); // indigo-700
  const headingText = (paper.examinationHeading || 'EXAMINATION').toUpperCase();
  doc.text(headingText, pageWidth / 2, cursorY + 13, { align: 'center' });

  if (mode === 'answer_key') {
    doc.setFontSize(10);
    doc.setTextColor(220, 38, 38); // red-600
    doc.text('OFFICIAL ANSWER KEY & STEP-BY-STEP MARKING SCHEME (CONFIDENTIAL)', pageWidth / 2, cursorY + 18, { align: 'center' });
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const metaY = mode === 'answer_key' ? cursorY + 25 : cursorY + 21;
  doc.text(`Board: ${paper.board}  |  Class: ${paper.classLevel}  |  Subject: ${paper.subject}`, margin + 4, metaY);
  doc.text(
    `Time: ${Math.floor(paper.durationMinutes / 60)}h ${paper.durationMinutes % 60}m  |  Max Marks: ${paper.totalMarks}`,
    pageWidth - margin - 4,
    metaY,
    { align: 'right' }
  );

  cursorY += mode === 'answer_key' ? 42 : 38;

  // General Instructions (only on student paper)
  if (mode === 'question_paper' && paper.generalInstructions && paper.generalInstructions.length > 0) {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text('GENERAL INSTRUCTIONS:', margin, cursorY);
    cursorY += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    paper.generalInstructions.forEach((instruction, idx) => {
      const bulletText = `${idx + 1}. ${instruction}`;
      const splitLines = doc.splitTextToSize(bulletText, contentWidth - 4);
      checkPageBreak(splitLines.length * 4);
      doc.text(splitLines, margin + 2, cursorY);
      cursorY += splitLines.length * 4;
    });
    cursorY += 4;
  }

  // Sections
  paper.sections.forEach((section) => {
    checkPageBreak(18);

    // Section Bar
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, cursorY, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 58, 138); // blue-900
    doc.text(`${section.name.toUpperCase()} - ${section.title.toUpperCase()}`, margin + 3, cursorY + 4.8);
    doc.text(`[${section.totalMarks} Marks]`, pageWidth - margin - 3, cursorY + 4.8, { align: 'right' });
    cursorY += 9;

    if (section.instructions && mode === 'question_paper') {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      const splitInst = doc.splitTextToSize(section.instructions, contentWidth);
      doc.text(splitInst, margin + 2, cursorY);
      cursorY += splitInst.length * 3.8 + 2;
    }

    // Questions
    section.questions.forEach((q) => {
      checkPageBreak(25);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);

      // Question header and marks
      const qPrefix = `Q${q.questionNumber}. `;
      const marksText = `[${q.marks} Mark${q.marks > 1 ? 's' : ''}]`;
      const marksWidth = doc.getTextWidth(marksText);

      doc.text(marksText, pageWidth - margin - 2, cursorY, { align: 'right' });

      // Question Text
      const qLines = doc.splitTextToSize(`${qPrefix}${q.questionText}`, contentWidth - marksWidth - 6);
      doc.text(qLines, margin + 2, cursorY);
      cursorY += qLines.length * 4.2 + 1;

      // MCQ Options
      if (q.options && q.options.length > 0) {
        const optionLabels = ['(A)', '(B)', '(C)', '(D)'];
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);

        // Render options cleanly
        for (let i = 0; i < q.options.length; i += 2) {
          checkPageBreak(5);
          const opt1 = `${optionLabels[i]} ${q.options[i]}`;
          doc.text(opt1, margin + 6, cursorY);

          if (i + 1 < q.options.length) {
            const opt2 = `${optionLabels[i + 1]} ${q.options[i + 1]}`;
            doc.text(opt2, margin + contentWidth / 2, cursorY);
          }
          cursorY += 4.5;
        }
      }

      // Internal Choice "OR"
      if (q.internalChoice && mode === 'question_paper') {
        checkPageBreak(15);
        cursorY += 1;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(99, 102, 241);
        doc.text('--- OR ---', pageWidth / 2, cursorY, { align: 'center' });
        cursorY += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        const orLines = doc.splitTextToSize(q.internalChoice.questionText, contentWidth - 8);
        doc.text(orLines, margin + 4, cursorY);
        cursorY += orLines.length * 4 + 1;

        if (q.internalChoice.options && q.internalChoice.options.length > 0) {
          const optionLabels = ['(A)', '(B)', '(C)', '(D)'];
          for (let i = 0; i < q.internalChoice.options.length; i += 2) {
            checkPageBreak(5);
            const opt1 = `${optionLabels[i]} ${q.internalChoice.options[i]}`;
            doc.text(opt1, margin + 6, cursorY);
            if (i + 1 < q.internalChoice.options.length) {
              const opt2 = `${optionLabels[i + 1]} ${q.internalChoice.options[i + 1]}`;
              doc.text(opt2, margin + contentWidth / 2, cursorY);
            }
            cursorY += 4.5;
          }
        }
      }

      // Teacher Answer Key & Solutions
      if (mode === 'answer_key') {
        checkPageBreak(15);
        cursorY += 1;

        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(22, 101, 52); // green-800
        const ansLabel = `Answer: ${q.answerKey}`;
        const splitAns = doc.splitTextToSize(ansLabel, contentWidth - 8);
        doc.text(splitAns, margin + 4, cursorY);
        cursorY += splitAns.length * 4;

        if (q.solutionSteps && q.solutionSteps.length > 0) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(71, 85, 105);
          q.solutionSteps.forEach((step, sIdx) => {
            const splitStep = doc.splitTextToSize(`Step ${sIdx + 1}: ${step}`, contentWidth - 10);
            checkPageBreak(splitStep.length * 3.8);
            doc.text(splitStep, margin + 6, cursorY);
            cursorY += splitStep.length * 3.8;
          });
        }

        if (q.markingScheme) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          const splitScheme = doc.splitTextToSize(`[Scheme: ${q.markingScheme}]`, contentWidth - 8);
          doc.text(splitScheme, margin + 6, cursorY);
          cursorY += splitScheme.length * 3.5;
        }

        cursorY += 2;
      }

      cursorY += 3;
    });

    cursorY += 3;
  });

  // End of paper marker
  checkPageBreak(12);
  doc.setDrawColor(203, 213, 225);
  doc.line(margin + 20, cursorY, pageWidth - margin - 20, cursorY);
  cursorY += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('*** END OF QUESTION PAPER ***', pageWidth / 2, cursorY, { align: 'center' });

  // Add watermark and footer to all pages
  const totalPages = (doc.internal as any).getNumberOfPages ? (doc.internal as any).getNumberOfPages() : 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Diagonal Watermark: Made by Ravi Kishan
    doc.saveGraphicsState();
    doc.setTextColor(230, 233, 242); // very soft subtle watermark
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    try {
      (doc as any).text('Made by Ravi Kishan', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 40,
      });
      (doc as any).text('Made by Ravi Kishan', pageWidth / 2, pageHeight / 3, {
        align: 'center',
        angle: 40,
      });
      (doc as any).text('Made by Ravi Kishan', pageWidth / 2, (pageHeight * 2) / 3, {
        align: 'center',
        angle: 40,
      });
    } catch {
      // Fallback if angle option unsupported
      doc.text('--- Made by Ravi Kishan ---', pageWidth / 2, pageHeight / 2, { align: 'center' });
    }
    doc.restoreGraphicsState();

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `PaperGenius AI  |  Watermark: Made by Ravi Kishan  |  ${paper.subject} (${paper.board} ${paper.classLevel})  |  Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  const safeFileName = `${paper.subject.replace(/[^a-zA-Z0-9]/g, '_')}_${paper.classLevel.replace(/[^a-zA-Z0-9]/g, '_')}_${mode === 'answer_key' ? 'Answer_Key' : 'Question_Paper'}.pdf`;
  doc.save(safeFileName);
}
