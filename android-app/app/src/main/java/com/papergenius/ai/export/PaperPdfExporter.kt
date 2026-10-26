package com.papergenius.ai.export

import android.content.Context
import android.content.Intent
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import androidx.core.content.FileProvider
import com.papergenius.ai.model.GeneratedPaper
import com.papergenius.ai.model.QuestionType
import java.io.File
import java.io.FileOutputStream

object PaperPdfExporter {

    private const val PAGE_WIDTH = 595 // Standard A4 width in points (72 dpi)
    private const val PAGE_HEIGHT = 842 // Standard A4 height in points
    private const val MARGIN = 40f
    private const val CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2)

    fun generatePdfFile(
        context: Context,
        paper: GeneratedPaper,
        includeAnswerKey: Boolean = true,
        includeMarkingScheme: Boolean = true
    ): File {
        val pdfDocument = PdfDocument()

        val textPaint = Paint().apply {
            color = Color.BLACK
            textSize = 10f
            isAntiAlias = true
            typeface = Typeface.create(Typeface.SERIF, Typeface.NORMAL)
        }

        val boldPaint = Paint().apply {
            color = Color.BLACK
            textSize = 10f
            isAntiAlias = true
            typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
        }

        val headerPaint = Paint().apply {
            color = Color.rgb(15, 23, 42) // Dark Navy
            textSize = 14f
            isAntiAlias = true
            typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
        }

        val subHeaderPaint = Paint().apply {
            color = Color.rgb(51, 65, 85)
            textSize = 11f
            isAntiAlias = true
            typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
            textAlign = Paint.Align.CENTER
        }

        val sectionPaint = Paint().apply {
            color = Color.rgb(30, 58, 138)
            textSize = 11f
            isAntiAlias = true
            typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
        }

        val linePaint = Paint().apply {
            color = Color.rgb(203, 213, 225)
            strokeWidth = 1f
        }

        var currentPageNumber = 1
        var pageInfo = PdfDocument.PageInfo.Builder(PAGE_WIDTH, PAGE_HEIGHT, currentPageNumber).create()
        var page = pdfDocument.startPage(pageInfo)
        var canvas = page.canvas
        var y = MARGIN

        fun checkPageBreak(requiredHeight: Float) {
            if (y + requiredHeight > PAGE_HEIGHT - MARGIN) {
                // Draw page number footer
                val footerPaint = Paint().apply {
                    color = Color.GRAY
                    textSize = 9f
                    textAlign = Paint.Align.CENTER
                }
                canvas.drawText("Page $currentPageNumber", PAGE_WIDTH / 2f, PAGE_HEIGHT - 20f, footerPaint)

                pdfDocument.finishPage(page)
                currentPageNumber++
                pageInfo = PdfDocument.PageInfo.Builder(PAGE_WIDTH, PAGE_HEIGHT, currentPageNumber).create()
                page = pdfDocument.startPage(pageInfo)
                canvas = page.canvas
                y = MARGIN
            }
        }

        // --- Header ---
        val schoolTitle = (paper.schoolName ?: "EXAMINATION PAPER").uppercase()
        canvas.drawText(schoolTitle, PAGE_WIDTH / 2f, y + 10f, headerPaint)
        y += 24f

        canvas.drawText("${paper.examType.displayName.uppercase()} (2024-25)", PAGE_WIDTH / 2f, y, subHeaderPaint)
        y += 18f

        canvas.drawText("${paper.className} - ${paper.subject} (${paper.board.displayName})", PAGE_WIDTH / 2f, y, subHeaderPaint)
        y += 20f

        // Time and Max Marks bar
        boldPaint.textAlign = Paint.Align.LEFT
        canvas.drawText("Time Allowed: ${paper.duration}", MARGIN, y, boldPaint)

        boldPaint.textAlign = Paint.Align.RIGHT
        canvas.drawText("Maximum Marks: ${paper.totalMarks}", PAGE_WIDTH - MARGIN, y, boldPaint)
        boldPaint.textAlign = Paint.Align.LEFT
        y += 10f

        canvas.drawLine(MARGIN, y, PAGE_WIDTH - MARGIN, y, linePaint)
        y += 16f

        // General Instructions
        checkPageBreak(80f)
        canvas.drawText("General Instructions:", MARGIN, y, boldPaint)
        y += 14f

        for (instruction in paper.generalInstructions) {
            checkPageBreak(20f)
            val lines = wrapText("• $instruction", textPaint, CONTENT_WIDTH - 10f)
            for (line in lines) {
                checkPageBreak(14f)
                canvas.drawText(line, MARGIN + 10f, y, textPaint)
                y += 13f
            }
        }
        y += 8f
        canvas.drawLine(MARGIN, y, PAGE_WIDTH - MARGIN, y, linePaint)
        y += 16f

        // Sections and Questions
        for (section in paper.sections) {
            checkPageBreak(50f)
            canvas.drawText("${section.name.uppercase()} (${section.totalMarks} Marks)", MARGIN, y, sectionPaint)
            y += 14f
            if (!section.instructions.isNullOrBlank()) {
                canvas.drawText(section.instructions!!, MARGIN, y, textPaint)
                y += 16f
            }

            for (question in section.questions) {
                checkPageBreak(40f)

                // Question Header line with Marks on the right
                val qHeader = "Q${question.number}."
                canvas.drawText(qHeader, MARGIN, y, boldPaint)

                boldPaint.textAlign = Paint.Align.RIGHT
                canvas.drawText("[${question.marks}]", PAGE_WIDTH - MARGIN, y, boldPaint)
                boldPaint.textAlign = Paint.Align.LEFT

                // Question Body
                val bodyLines = wrapText(question.text, textPaint, CONTENT_WIDTH - 45f)
                var firstLine = true
                for (line in bodyLines) {
                    checkPageBreak(14f)
                    val xPos = if (firstLine) MARGIN + 28f else MARGIN + 28f
                    canvas.drawText(line, xPos, y, textPaint)
                    y += 13f
                    firstLine = false
                }

                // If MCQ, render options
                val qOpts = question.options
                if (question.type == QuestionType.MCQ && !qOpts.isNullOrEmpty()) {
                    val optionLetters = listOf("(A)", "(B)", "(C)", "(D)")
                    for (i in qOpts.indices) {
                        checkPageBreak(14f)
                        val optText = "${optionLetters.getOrElse(i) { "($i)" }} ${qOpts[i]}"
                        val optLines = wrapText(optText, textPaint, CONTENT_WIDTH - 50f)
                        for (optLine in optLines) {
                            checkPageBreak(14f)
                            canvas.drawText(optLine, MARGIN + 35f, y, textPaint)
                            y += 13f
                        }
                    }
                }

                // Internal choice question
                if (question.hasInternalChoice && !question.orQuestion.isNullOrBlank()) {
                    y += 4f
                    checkPageBreak(30f)
                    boldPaint.textAlign = Paint.Align.CENTER
                    canvas.drawText("--- OR ---", PAGE_WIDTH / 2f, y, boldPaint)
                    boldPaint.textAlign = Paint.Align.LEFT
                    y += 14f

                    val orLines = wrapText(question.orQuestion, textPaint, CONTENT_WIDTH - 45f)
                    for (line in orLines) {
                        checkPageBreak(14f)
                        canvas.drawText(line, MARGIN + 28f, y, textPaint)
                        y += 13f
                    }
                }

                y += 10f // Space between questions
            }
            y += 8f
        }

        // Answer Key & Solutions if requested
        if (includeAnswerKey) {
            checkPageBreak(80f)
            canvas.drawLine(MARGIN, y, PAGE_WIDTH - MARGIN, y, linePaint)
            y += 16f
            canvas.drawText("ANSWER KEY & DETAILED SOLUTIONS", PAGE_WIDTH / 2f, y, subHeaderPaint)
            y += 20f

            for (section in paper.sections) {
                for (question in section.questions) {
                    checkPageBreak(35f)
                    canvas.drawText("Q${question.number}. [Answer]", MARGIN, y, boldPaint)
                    y += 13f

                    if (!question.correctAnswer.isNullOrBlank()) {
                        val ansLines = wrapText(question.correctAnswer, textPaint, CONTENT_WIDTH - 20f)
                        for (line in ansLines) {
                            checkPageBreak(13f)
                            canvas.drawText(line, MARGIN + 10f, y, textPaint)
                            y += 12f
                        }
                    }

                    if (includeMarkingScheme && !question.explanation.isNullOrBlank()) {
                        val expLines = wrapText("Marking Scheme / Step Explanation: ${question.explanation}", textPaint, CONTENT_WIDTH - 20f)
                        for (line in expLines) {
                            checkPageBreak(13f)
                            canvas.drawText(line, MARGIN + 10f, y, textPaint)
                            y += 12f
                        }
                    }
                    y += 6f
                }
            }
        }

        // Draw final page footer
        val footerPaint = Paint().apply {
            color = Color.GRAY
            textSize = 9f
            textAlign = Paint.Align.CENTER
        }
        canvas.drawText("Page $currentPageNumber", PAGE_WIDTH / 2f, PAGE_HEIGHT - 20f, footerPaint)

        pdfDocument.finishPage(page)

        // Write to file
        val outputDir = File(context.cacheDir, "generated_papers").apply { mkdirs() }
        val sanitizedTitle = paper.title.replace(Regex("[^a-zA-Z0-9_-]"), "_")
        val outputFile = File(outputDir, "${sanitizedTitle}_${paper.id.take(6)}.pdf")

        FileOutputStream(outputFile).use { out ->
            pdfDocument.writeTo(out)
        }
        pdfDocument.close()

        return outputFile
    }

    private fun wrapText(text: String, paint: Paint, maxWidth: Float): List<String> {
        val lines = mutableListOf<String>()
        val paragraphs = text.split("\n")

        for (paragraph in paragraphs) {
            if (paragraph.isBlank()) {
                lines.add("")
                continue
            }
            val words = paragraph.split(" ")
            var currentLine = StringBuilder()

            for (word in words) {
                val testLine = if (currentLine.isEmpty()) word else "$currentLine $word"
                val width = paint.measureText(testLine)
                if (width <= maxWidth) {
                    currentLine = StringBuilder(testLine)
                } else {
                    if (currentLine.isNotEmpty()) {
                        lines.add(currentLine.toString())
                    }
                    currentLine = StringBuilder(word)
                }
            }
            if (currentLine.isNotEmpty()) {
                lines.add(currentLine.toString())
            }
        }
        return lines
    }

    fun sharePdf(context: Context, pdfFile: File) {
        val uri = FileProvider.getUriForFile(
            context,
            "${context.packageName}.fileprovider",
            pdfFile
        )
        val shareIntent = Intent(Intent.ACTION_SEND).apply {
            type = "application/pdf"
            putExtra(Intent.EXTRA_STREAM, uri)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        context.startActivity(Intent.createChooser(shareIntent, "Share Question Paper PDF"))
    }
}
