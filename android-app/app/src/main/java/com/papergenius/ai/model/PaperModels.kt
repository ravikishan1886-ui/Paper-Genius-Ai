package com.papergenius.ai.model

import com.google.gson.annotations.SerializedName

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
    DIAGRAM_BASED("Diagram-Based Question", 4)
}

data class QuestionInternalChoice(
    val questionText: String,
    val options: List<String>? = null,
    val answerKey: String = "",
    val solution: String? = null
)

data class QuestionItem(
    val id: String,
    var questionNumber: Int,
    val type: QuestionType,
    val sectionName: String,
    var questionText: String,
    var marks: Int,
    var options: List<String>? = null,
    val internalChoice: QuestionInternalChoice? = null,
    var answerKey: String = "",
    var solutionSteps: List<String>? = null,
    val markingScheme: String? = null,
    val chapterOrTopic: String? = null,
    val diagramNote: String? = null
)

data class PaperSection(
    val name: String,
    val title: String,
    val instructions: String? = null,
    var totalMarks: Int,
    val questions: MutableList<QuestionItem>
)

data class AnalysisReport(
    val pagesAnalyzed: Int = 1,
    val readabilityScore: Int = 90,
    val extractedTopics: List<String> = emptyList(),
    val warnings: List<String> = emptyList(),
    val isTextbookBasedPractice: Boolean = true
)

data class GeneratedPaper(
    val id: String,
    val title: String,
    val schoolName: String? = null,
    val examinationHeading: String = "Examination 2026-27",
    val board: EducationBoard,
    val classLevel: String,
    val subject: String,
    val examType: ExamType,
    val totalMarks: Int,
    val durationMinutes: Int,
    val generalInstructions: List<String> = emptyList(),
    val sections: List<PaperSection>,
    val topicsCovered: List<String> = emptyList(),
    val analysisReport: AnalysisReport? = null,
    val createdAt: String = "",
    val updatedAt: String = ""
)

data class UploadedPagePhoto(
    val id: String,
    val fileName: String,
    val localUriString: String? = null,
    val base64Data: String? = null,
    val sizeBytes: Long = 0
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
