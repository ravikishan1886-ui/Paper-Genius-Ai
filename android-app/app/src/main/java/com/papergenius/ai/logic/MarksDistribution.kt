package com.papergenius.ai.logic

import com.papergenius.ai.model.*
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt

object MarksDistribution {

    fun calculateTotalMarks(sections: List<PaperSection>): Int {
        return sections.sumOf { sec ->
            sec.questions.sumOf { it.marks }
        }
    }

    fun validateMarks(sections: List<PaperSection>, targetTotal: Int): MarksValidationResult {
        val breakdown = sections.map { sec ->
            val marks = sec.questions.sumOf { it.marks }
            SectionMarksBreakdown(
                name = sec.name,
                marks = marks,
                count = sec.questions.size
            )
        }
        val currentTotal = breakdown.sumOf { it.marks }
        val diff = targetTotal - currentTotal

        return MarksValidationResult(
            isValid = currentTotal == targetTotal,
            currentTotal = currentTotal,
            targetTotal = targetTotal,
            difference = diff,
            sectionBreakdown = breakdown
        )
    }

    fun generateSectionPlan(
        totalMarks: Int,
        board: EducationBoard = EducationBoard.CBSE,
        selectedTypes: List<QuestionType> = emptyList()
    ): List<SectionPlan> {
        val safeMarks = max(40, min(100, totalMarks))

        return when (safeMarks) {
            80 -> listOf(
                SectionPlan("Section A", "Multiple Choice & Objective Questions", QuestionType.MCQ, 20, 1, 20),
                SectionPlan("Section B", "Very Short Answer Type Questions", QuestionType.VERY_SHORT, 6, 2, 12),
                SectionPlan("Section C", "Short Answer Type Questions", QuestionType.SHORT_ANSWER, 7, 3, 21),
                SectionPlan("Section D", "Long Answer Type Questions", QuestionType.LONG_ANSWER, 3, 5, 15),
                SectionPlan("Section E", "Case-Based / Competency Questions", QuestionType.CASE_BASED, 3, 4, 12)
            )
            70 -> listOf(
                SectionPlan("Section A", "Multiple Choice & Assertion-Reason", QuestionType.MCQ, 16, 1, 16),
                SectionPlan("Section B", "Very Short Answer Questions", QuestionType.VERY_SHORT, 5, 2, 10),
                SectionPlan("Section C", "Short Answer Questions", QuestionType.SHORT_ANSWER, 7, 3, 21),
                SectionPlan("Section D", "Case Study / Applied Problems", QuestionType.CASE_BASED, 2, 4, 8),
                SectionPlan("Section E", "Long Answer Questions", QuestionType.LONG_ANSWER, 3, 5, 15)
            )
            100 -> listOf(
                SectionPlan("Section A", "Multiple Choice & Objective Questions", QuestionType.MCQ, 25, 1, 25),
                SectionPlan("Section B", "Very Short Answer Questions", QuestionType.VERY_SHORT, 10, 2, 20),
                SectionPlan("Section C", "Short Answer Questions", QuestionType.SHORT_ANSWER, 9, 3, 27),
                SectionPlan("Section D", "Long Answer Questions", QuestionType.LONG_ANSWER, 4, 5, 20),
                SectionPlan("Section E", "Case-Based Analysis", QuestionType.CASE_BASED, 2, 4, 8)
            )
            40 -> listOf(
                SectionPlan("Section A", "Objective Type Questions", QuestionType.MCQ, 10, 1, 10),
                SectionPlan("Section B", "Very Short Answer Questions", QuestionType.VERY_SHORT, 4, 2, 8),
                SectionPlan("Section C", "Short Answer Questions", QuestionType.SHORT_ANSWER, 4, 3, 12),
                SectionPlan("Section D", "Long Answer Questions", QuestionType.LONG_ANSWER, 2, 5, 10)
            )
            50 -> listOf(
                SectionPlan("Section A", "Objective Questions", QuestionType.MCQ, 12, 1, 12),
                SectionPlan("Section B", "Very Short Answer Questions", QuestionType.VERY_SHORT, 5, 2, 10),
                SectionPlan("Section C", "Short Answer Questions", QuestionType.SHORT_ANSWER, 6, 3, 18),
                SectionPlan("Section D", "Long Answer Questions", QuestionType.LONG_ANSWER, 2, 5, 10)
            )
            60 -> listOf(
                SectionPlan("Section A", "Objective Questions", QuestionType.MCQ, 15, 1, 15),
                SectionPlan("Section B", "Very Short Answer Questions", QuestionType.VERY_SHORT, 6, 2, 12),
                SectionPlan("Section C", "Short Answer Questions", QuestionType.SHORT_ANSWER, 6, 3, 18),
                SectionPlan("Section D", "Long Answer Questions", QuestionType.LONG_ANSWER, 3, 5, 15)
            )
            90 -> listOf(
                SectionPlan("Section A", "Multiple Choice Questions", QuestionType.MCQ, 20, 1, 20),
                SectionPlan("Section B", "Very Short Answer Questions", QuestionType.VERY_SHORT, 8, 2, 16),
                SectionPlan("Section C", "Short Answer Questions", QuestionType.SHORT_ANSWER, 8, 3, 24),
                SectionPlan("Section D", "Long Answer Questions", QuestionType.LONG_ANSWER, 4, 5, 20),
                SectionPlan("Section E", "Case-Based Analysis", QuestionType.CASE_BASED, 2, 5, 10)
            )
            else -> {
                // Dynamic scaling for any custom total between 40 and 100
                var remaining = safeMarks

                val laCount = max(1, ((safeMarks * 0.25) / 5).toInt())
                val laMarks = laCount * 5
                remaining -= laMarks

                val saCount = max(2, ((remaining * 0.45) / 3).toInt())
                val saMarks = saCount * 3
                remaining -= saMarks

                val vsaCount = max(2, ((remaining * 0.45) / 2).toInt())
                val vsaMarks = vsaCount * 2
                remaining -= vsaMarks

                val mcqCount = remaining
                val mcqMarks = mcqCount

                listOf(
                    SectionPlan("Section A", "Objective Type Questions", QuestionType.MCQ, mcqCount, 1, mcqMarks),
                    SectionPlan("Section B", "Very Short Answer Questions", QuestionType.VERY_SHORT, vsaCount, 2, vsaMarks),
                    SectionPlan("Section C", "Short Answer Questions", QuestionType.SHORT_ANSWER, saCount, 3, saMarks),
                    SectionPlan("Section D", "Long Answer Questions", QuestionType.LONG_ANSWER, laCount, 5, laMarks)
                )
            }
        }
    }

    fun allocateSections(
        board: EducationBoard,
        totalMarks: Int,
        selectedTypes: List<QuestionType>,
        subject: String
    ): List<PaperSection> {
        val plan = generateSectionPlan(totalMarks, board, selectedTypes)
        var qNum = 1
        return plan.map { p ->
            val questions = (1..p.questionCount).map {
                val currentQNum = qNum++
                val qType = p.questionType
                val qMarks = p.marksPerQuestion
                val text = when (qType) {
                    QuestionType.MCQ -> "Which of the following statements is correct regarding standard $subject principles?"
                    QuestionType.VERY_SHORT -> "Define the fundamental concept of $subject and give one practical example."
                    QuestionType.SHORT_ANSWER -> "Explain the key mechanism observed in $subject with two distinct scientific points."
                    QuestionType.LONG_ANSWER -> "Discuss in detail the process and applications in $subject. Illustrate your answer with suitable steps."
                    QuestionType.CASE_BASED -> "Read the case context: In an experimental investigation on $subject, analyze the changes and deduce the expected result."
                    QuestionType.ASSERTION_REASON -> "Assertion (A): Fundamental properties remain invariant in steady state.\nReason (R): Equilibrium condition holds throughout the closed process."
                    QuestionType.TRUE_FALSE -> "State whether True or False: Conservation of energy holds strictly in all verified physical systems."
                    QuestionType.FILL_BLANKS -> "The standard unit measuring efficiency in $subject is ________."
                    QuestionType.NUMERICAL -> "Calculate the total work done and final value given initial parameters of 15.0 units with 2.5 multiplier."
                    QuestionType.DIAGRAM_BASED -> "Draw a neat, well-labelled diagram showing the functional structure in $subject."
                }
                val opts = if (qType == QuestionType.MCQ) {
                    listOf("Option A: Uniform and proportional", "Option B: Inversely related", "Option C: Constant invariant", "Option D: Dependent variable")
                } else null

                QuestionItem(
                    id = java.util.UUID.randomUUID().toString(),
                    questionNumber = currentQNum,
                    type = qType,
                    sectionName = p.name,
                    questionText = text,
                    marks = qMarks,
                    options = opts,
                    answerKey = "Standard answer key and verified solution step for Question $currentQNum.",
                    markingScheme = "1 Mark for definition / correct option; remaining marks for reasoning and steps."
                )
            }
            PaperSection(
                name = p.name,
                title = p.title,
                instructions = "Answer all questions in this section.",
                totalMarks = p.totalMarks,
                questions = questions
            )
        }
    }

    fun getSubjectsForBoard(board: EducationBoard, classLevel: String): List<String> = getAvailableSubjects(board, classLevel)

    fun getAvailableSubjects(board: EducationBoard, classLevel: String): List<String> {
        val numericClass = classLevel.filter { it.isDigit() }.toIntOrNull() ?: 10

        if (numericClass <= 5) {
            return listOf("Mathematics", "Environmental Studies (EVS)", "English", "Hindi", "Punjabi", "General Science")
        }

        if (numericClass <= 8) {
            val list = mutableListOf("Mathematics", "Science", "Social Science", "English", "Hindi")
            if (board == EducationBoard.PSEB) {
                list.add("Punjabi")
                list.add("Computer Science")
            }
            if (board == EducationBoard.ICSE) {
                list.addAll(listOf("History & Civics", "Geography", "Physics", "Chemistry", "Biology"))
            }
            return list
        }

        if (numericClass <= 10) {
            return when (board) {
                EducationBoard.CBSE -> listOf(
                    "Mathematics (Standard)", "Mathematics (Basic)", "Science",
                    "Social Science", "English Language & Literature", "Hindi Course A",
                    "Hindi Course B", "Information Technology"
                )
                EducationBoard.PSEB -> listOf(
                    "Mathematics", "Science", "Social Science", "Punjabi (A & B)",
                    "English", "Hindi", "Computer Science", "Physical Education"
                )
                EducationBoard.ICSE -> listOf(
                    "English Language", "Literature in English", "History & Civics",
                    "Geography", "Mathematics", "Physics", "Chemistry", "Biology",
                    "Computer Applications", "Commercial Studies"
                )
            }
        }

        // Class 11 & 12
        return when (board) {
            EducationBoard.CBSE, EducationBoard.PSEB -> {
                val list = mutableListOf(
                    "Physics", "Chemistry", "Mathematics", "Biology",
                    "Computer Science (Python)", "Accountancy", "Business Studies",
                    "Economics", "History", "Political Science", "Geography",
                    "English Core", "Physical Education"
                )
                if (board == EducationBoard.PSEB) {
                    list.add(0, "Punjabi General")
                }
                list
            }
            EducationBoard.ICSE -> listOf(
                "English Paper 1 (Language)", "English Paper 2 (Literature)",
                "Mathematics", "Physics", "Chemistry", "Biology",
                "Computer Science", "Accounts", "Commerce", "Economics",
                "History", "Political Science"
            )
        }
    }

    fun formatAsPlainText(paper: GeneratedPaper): String = formatPaperAsText(paper, true)

    fun formatPaperAsText(paper: GeneratedPaper, includeAnswers: Boolean): String {
        val sb = StringBuilder()
        sb.appendLine("================================================================")
        if (!paper.schoolName.isNullOrBlank()) {
            sb.appendLine(paper.schoolName.uppercase())
        }
        sb.appendLine(paper.examinationHeading.uppercase())
        sb.appendLine("Board: ${paper.board.name} | ${paper.classLevel} | Subject: ${paper.subject}")
        sb.appendLine("Time Allowed: ${paper.durationMinutes / 60}h ${paper.durationMinutes % 60}m | Maximum Marks: ${paper.totalMarks}")
        sb.appendLine("================================================================")
        sb.appendLine()

        if (paper.generalInstructions.isNotEmpty()) {
            sb.appendLine("GENERAL INSTRUCTIONS:")
            paper.generalInstructions.forEachIndexed { idx, inst ->
                sb.appendLine("${idx + 1}. $inst")
            }
            sb.appendLine()
        }

        paper.sections.forEach { sec ->
            sb.appendLine("----------------------------------------------------------------")
            sb.appendLine("${sec.name.uppercase()} : ${sec.title.uppercase()} (${sec.totalMarks} Marks)")
            if (!sec.instructions.isNullOrBlank()) {
                sb.appendLine("[${sec.instructions}]")
            }
            sb.appendLine("----------------------------------------------------------------")
            sb.appendLine()

            sec.questions.forEach { q ->
                sb.appendLine("Q${q.questionNumber}. ${q.questionText}   [${q.marks} Mark${if (q.marks > 1) "s" else ""}]")

                q.options?.let { opts ->
                    val labels = listOf("A", "B", "C", "D")
                    opts.forEachIndexed { oIdx, opt ->
                        sb.appendLine("    (${labels.getOrNull(oIdx) ?: (oIdx + 1)}) $opt")
                    }
                }

                q.internalChoice?.let { choice ->
                    sb.appendLine()
                    sb.appendLine("    --- OR ---")
                    sb.appendLine("    ${choice.questionText}")
                    choice.options?.let { cOpts ->
                        val labels = listOf("A", "B", "C", "D")
                        cOpts.forEachIndexed { oIdx, opt ->
                            sb.appendLine("    (${labels.getOrNull(oIdx) ?: (oIdx + 1)}) $opt")
                        }
                    }
                }

                if (includeAnswers) {
                    sb.appendLine("    >> ANSWER: ${q.answerKey}")
                    q.solutionSteps?.let { steps ->
                        sb.appendLine("    >> SOLUTION / MARKING SCHEME:")
                        steps.forEachIndexed { sIdx, step ->
                            sb.appendLine("       Step ${sIdx + 1}: $step")
                        }
                    }
                    if (!q.markingScheme.isNullOrBlank()) {
                        sb.appendLine("    >> MARKING CRITERIA: ${q.markingScheme}")
                    }
                }
                sb.appendLine()
            }
        }

        sb.appendLine("================================================================")
        sb.appendLine("                     END OF QUESTION PAPER                      ")
        sb.appendLine("================================================================")

        return sb.toString()
    }
}
