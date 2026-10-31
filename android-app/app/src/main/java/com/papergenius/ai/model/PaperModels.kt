package com.papergenius.ai.model

enum class EducationBoard(val displayName: String) {
    CBSE("CBSE"),
    PSEB("PSEB"),
    ICSE("ICSE")
}

enum class ExamType(val displayName: String) {
    UNIT_TEST("Unit Test"),
    CHAPTER_TEST("Chapter Test"),
    HALF_YEARLY("Half-Yearly Examination"),
    ANNUAL("Annual Examination"),
    PRE_BOARD("Pre-Board Examination"),
    PRACTICE_PAPER("Practice Paper")
}

enum class DifficultyLevel(val displayName: String) {
    EASY("Easy"),
    MODERATE("Moderate"),
    DIFFICULT("Difficult"),
    MIXED("Mixed")
}

enum class QuestionType(val displayName: String, val defaultMarks: Int) {
    MCQ("Multiple Choice (MCQ)", 1),
    FILL_BLANKS("Fill in the Blanks", 1),
    TRUE_FALSE("True / False", 1),
    VERY_SHORT("Very Short Answer (VSA)", 2),
    SHORT_ANSWER("Short Answer (SA)", 3),
    LONG_ANSWER("Long Answer (LA)", 5),
    CASE_BASED("Case-Based / Competency", 4),
    ASSERTION_REASON("Assertion & Reasoning", 1),
    NUMERICAL("Numerical Problem", 3),
    DIAGRAM_BASED("Diagram-Based Question", 4);

    companion object {
        val VSA: QuestionType get() = VERY_SHORT
        val SHORT: QuestionType get() = SHORT_ANSWER
        val LONG: QuestionType get() = LONG_ANSWER
        val DIAGRAM: QuestionType get() = DIAGRAM_BASED
    }
}

data class QuestionInternalChoice(
    val questionText: String = "",
    val options: List<String>? = null,
    val answerKey: String = "",
    val solution: String? = null
)

data class QuestionItem(
    val id: String = java.util.UUID.randomUUID().toString(),
    var questionNumber: Int = 1,
    val type: QuestionType = QuestionType.MCQ,
    val sectionName: String = "Section A",
    var questionText: String = "",
    var marks: Int = 1,
    var options: List<String>? = null,
    val internalChoice: QuestionInternalChoice? = null,
    var answerKey: String = "",
    var solutionSteps: List<String>? = null,
    val markingScheme: String? = null,
    val chapterOrTopic: String? = null,
    val diagramNote: String? = null
) {
    val number: Int get() = questionNumber
    val text: String get() = questionText
    val correctAnswer: String get() = answerKey
    val explanation: String? get() = markingScheme
    val chapter: String? get() = chapterOrTopic
    val hasInternalChoice: Boolean get() = internalChoice != null
    val orQuestion: String? get() = internalChoice?.questionText

    constructor(
        id: String = java.util.UUID.randomUUID().toString(),
        number: Int,
        type: QuestionType,
        text: String,
        marks: Int,
        options: List<String>? = null,
        correctAnswer: String = "",
        explanation: String? = null,
        chapter: String? = null,
        hasInternalChoice: Boolean = false,
        orQuestion: String? = null
    ) : this(
        id = id,
        questionNumber = number,
        type = type,
        sectionName = "",
        questionText = text,
        marks = marks,
        options = options,
        internalChoice = if (hasInternalChoice && orQuestion != null) QuestionInternalChoice(orQuestion) else null,
        answerKey = correctAnswer,
        solutionSteps = null,
        markingScheme = explanation,
        chapterOrTopic = chapter,
        diagramNote = null
    )
}

data class PaperSection(
    val name: String,
    val title: String = name,
    val instructions: String? = null,
    var totalMarks: Int = 0,
    val questions: List<QuestionItem> = emptyList(),
    val id: String = name,
    val marksPerQuestion: Int = 1
) {
    constructor(
        id: String,
        name: String,
        instructions: String? = null,
        marksPerQuestion: Int,
        totalMarks: Int,
        questions: List<QuestionItem>
    ) : this(
        name = name,
        title = name,
        instructions = instructions,
        totalMarks = totalMarks,
        questions = questions,
        id = id,
        marksPerQuestion = marksPerQuestion
    )
}

data class AnalysisReport(
    val pagesAnalyzed: Int = 1,
    val readabilityScore: Int = 90,
    val extractedTopics: List<String> = emptyList(),
    val warnings: List<String> = emptyList(),
    val isTextbookBasedPractice: Boolean = true
)

data class GeneratedPaper(
    val id: String = java.util.UUID.randomUUID().toString(),
    val title: String = "Examination Paper",
    val schoolName: String? = null,
    val examinationHeading: String = "Examination 2026-27",
    val board: EducationBoard = EducationBoard.CBSE,
    val classLevel: String = "Class 10",
    val subject: String = "Science",
    val examType: ExamType = ExamType.ANNUAL,
    val totalMarks: Int = 80,
    val durationMinutes: Int = 180,
    val generalInstructions: List<String> = emptyList(),
    val sections: List<PaperSection> = emptyList(),
    val topicsCovered: List<String> = emptyList(),
    val analysisReport: AnalysisReport? = null,
    val createdAt: String = "",
    val updatedAt: String = "",
    val uploadedPagesCount: Int = 0
) {
    val className: String get() = classLevel
    val duration: String get() = "$durationMinutes mins"
    val analyzedTopics: List<String> get() = topicsCovered
    val totalQuestionsCount: Int
        get() = sections.sumOf { it.questions.size }
}

data class UploadedPagePhoto(
    val id: String = java.util.UUID.randomUUID().toString(),
    val fileName: String,
    val localUriString: String? = null,
    val base64Data: String? = null,
    val sizeBytes: Long = 0,
    val analysisSummary: String? = null,
    val detectedKeywords: List<String> = emptyList()
) {
    val uriString: String? get() = localUriString
    val fileSizeBytes: Long get() = sizeBytes
}

data class GeneratePaperParams(
    val board: EducationBoard,
    val className: String,
    val subject: String,
    val examType: ExamType,
    val totalMarks: Int,
    val difficulty: DifficultyLevel,
    val questionTypes: List<QuestionType>,
    val schoolName: String = "",
    val customDuration: String = "",
    val includeInternalChoice: Boolean = true,
    val includeCompetencyBased: Boolean = true,
    val includeAnswerKey: Boolean = true,
    val includeDetailedSolutions: Boolean = true,
    val includeMarkingScheme: Boolean = true
)

data class SectionPlan(
    val name: String,
    val title: String,
    val questionType: QuestionType,
    val questionCount: Int,
    val marksPerQuestion: Int,
    val totalMarks: Int
)

data class MarksValidationResult(
    val isValid: Boolean,
    val currentTotal: Int,
    val targetTotal: Int,
    val difference: Int,
    val sectionBreakdown: List<SectionMarksBreakdown>
)

data class SectionMarksBreakdown(
    val name: String,
    val marks: Int,
    val count: Int
)

fun GeneratedPaper.formatAsPlainText(): String {
    return com.papergenius.ai.logic.MarksDistribution.formatPaperAsText(this, true)
}
