package com.papergenius.ai.viewmodel

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.papergenius.ai.data.GeminiService
import com.papergenius.ai.data.PaperRepository
import com.papergenius.ai.export.PaperPdfExporter
import com.papergenius.ai.logic.MarksDistribution
import com.papergenius.ai.model.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.io.File
import java.util.UUID

enum class AppScreen(val title: String) {
    HOME("Home"),
    GENERATOR("Generate Paper"),
    PREVIEW("Paper Preview"),
    MY_PAPERS("My Papers"),
    FEATURES("Features"),
    ABOUT("About")
}

data class GeneratorFormState(
    val board: EducationBoard = EducationBoard.CBSE,
    val className: String = "Class 10",
    val subject: String = "Science",
    val customSubject: String = "",
    val examType: ExamType = ExamType.PRE_BOARD,
    val totalMarks: Int = 80,
    val isCustomMarks: Boolean = false,
    val customMarksInput: String = "80",
    val difficulty: DifficultyLevel = DifficultyLevel.MODERATE,
    val selectedQuestionTypes: Set<QuestionType> = QuestionType.values().toSet(),
    val schoolName: String = "Delhi Public Senior Secondary School",
    val customDuration: String = "3 Hours",
    val includeInternalChoice: Boolean = true,
    val includeCompetencyBased: Boolean = true,
    val includeAnswerKey: Boolean = true,
    val includeDetailedSolutions: Boolean = true,
    val includeMarkingScheme: Boolean = true,
    val uploadedPhotos: List<UploadedPagePhoto> = SampleData.sampleTextbookPages,
    val isAnalyzingPhotos: Boolean = false,
    val isGenerating: Boolean = false,
    val generationProgressMessage: String = "",
    val errorMessage: String? = null
)

class PaperGeniusViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = PaperRepository(application)
    private val geminiService = GeminiService()

    val savedPapers: StateFlow<List<GeneratedPaper>> = repository.papers

    private val _currentScreen = MutableStateFlow(AppScreen.HOME)
    val currentScreen: StateFlow<AppScreen> = _currentScreen.asStateFlow()

    private val _formState = MutableStateFlow(GeneratorFormState())
    val formState: StateFlow<GeneratorFormState> = _formState.asStateFlow()

    private val _selectedPaper = MutableStateFlow<GeneratedPaper?>(SampleData.samplePaper)
    val selectedPaper: StateFlow<GeneratedPaper?> = _selectedPaper.asStateFlow()

    private val _statusMessage = MutableStateFlow<String?>(null)
    val statusMessage: StateFlow<String?> = _statusMessage.asStateFlow()

    fun navigateTo(screen: AppScreen) {
        _currentScreen.value = screen
    }

    fun clearStatusMessage() {
        _statusMessage.value = null
    }

    // Form field mutators
    fun setBoard(board: EducationBoard) {
        val currentClass = _formState.value.className
        val availableSubjects = MarksDistribution.getSubjectsForBoard(board, currentClass)
        val newSubject = if (availableSubjects.contains(_formState.value.subject)) {
            _formState.value.subject
        } else {
            availableSubjects.firstOrNull() ?: "General Science"
        }
        _formState.value = _formState.value.copy(board = board, subject = newSubject)
    }

    fun setClassName(className: String) {
        val availableSubjects = MarksDistribution.getSubjectsForBoard(_formState.value.board, className)
        val newSubject = if (availableSubjects.contains(_formState.value.subject)) {
            _formState.value.subject
        } else {
            availableSubjects.firstOrNull() ?: "General Science"
        }
        _formState.value = _formState.value.copy(className = className, subject = newSubject)
    }

    fun setSubject(subject: String) {
        _formState.value = _formState.value.copy(subject = subject)
    }

    fun setCustomSubject(name: String) {
        _formState.value = _formState.value.copy(customSubject = name, subject = name)
    }

    fun setExamType(type: ExamType) {
        _formState.value = _formState.value.copy(examType = type)
    }

    fun setTotalMarks(marks: Int) {
        _formState.value = _formState.value.copy(totalMarks = marks, isCustomMarks = false)
    }

    fun setCustomMarks(input: String) {
        val parsed = input.toIntOrNull()
        if (parsed != null && parsed in 40..100) {
            _formState.value = _formState.value.copy(
                totalMarks = parsed,
                customMarksInput = input,
                isCustomMarks = true
            )
        } else {
            _formState.value = _formState.value.copy(customMarksInput = input, isCustomMarks = true)
        }
    }

    fun setDifficulty(difficulty: DifficultyLevel) {
        _formState.value = _formState.value.copy(difficulty = difficulty)
    }

    fun toggleQuestionType(type: QuestionType) {
        val current = _formState.value.selectedQuestionTypes.toMutableSet()
        if (current.contains(type)) {
            if (current.size > 1) { // maintain at least one type
                current.remove(type)
            }
        } else {
            current.add(type)
        }
        _formState.value = _formState.value.copy(selectedQuestionTypes = current)
    }

    fun setSchoolName(name: String) {
        _formState.value = _formState.value.copy(schoolName = name)
    }

    fun setCustomDuration(duration: String) {
        _formState.value = _formState.value.copy(customDuration = duration)
    }

    fun toggleInternalChoice(enabled: Boolean) {
        _formState.value = _formState.value.copy(includeInternalChoice = enabled)
    }

    fun toggleCompetencyBased(enabled: Boolean) {
        _formState.value = _formState.value.copy(includeCompetencyBased = enabled)
    }

    fun toggleAnswerKey(enabled: Boolean) {
        _formState.value = _formState.value.copy(includeAnswerKey = enabled)
    }

    fun toggleDetailedSolutions(enabled: Boolean) {
        _formState.value = _formState.value.copy(includeDetailedSolutions = enabled)
    }

    fun toggleMarkingScheme(enabled: Boolean) {
        _formState.value = _formState.value.copy(includeMarkingScheme = enabled)
    }

    // Photo Management
    fun addUploadedPhoto(photo: UploadedPagePhoto) {
        viewModelScope.launch {
            val list = _formState.value.uploadedPhotos.toMutableList()
            list.add(photo)
            _formState.value = _formState.value.copy(uploadedPhotos = list)

            // Auto analyze photo
            val analyzed = geminiService.analyzeTextbookPhoto(photo)
            val updatedList = _formState.value.uploadedPhotos.map { if (it.id == photo.id) analyzed else it }
            _formState.value = _formState.value.copy(uploadedPhotos = updatedList)
        }
    }

    fun removeUploadedPhoto(id: String) {
        val list = _formState.value.uploadedPhotos.filter { it.id != id }
        _formState.value = _formState.value.copy(uploadedPhotos = list)
    }

    fun movePhotoUp(index: Int) {
        if (index > 0) {
            val list = _formState.value.uploadedPhotos.toMutableList()
            val item = list.removeAt(index)
            list.add(index - 1, item)
            _formState.value = _formState.value.copy(uploadedPhotos = list)
        }
    }

    fun movePhotoDown(index: Int) {
        val list = _formState.value.uploadedPhotos.toMutableList()
        if (index < list.size - 1) {
            val item = list.removeAt(index)
            list.add(index + 1, item)
            _formState.value = _formState.value.copy(uploadedPhotos = list)
        }
    }

    fun loadSamplePhotos() {
        _formState.value = _formState.value.copy(uploadedPhotos = SampleData.sampleTextbookPages)
    }

    // Generate Paper Action
    fun generatePaper() {
        val state = _formState.value

        if (state.totalMarks !in 40..100) {
            _formState.value = state.copy(errorMessage = "Total marks must be between 40 and 100.")
            return
        }

        viewModelScope.launch {
            _formState.value = state.copy(
                isGenerating = true,
                generationProgressMessage = "Initializing PaperGenius AI engine...",
                errorMessage = null
            )

            try {
                val params = GeneratePaperParams(
                    board = state.board,
                    className = state.className,
                    subject = if (state.subject.isNotBlank()) state.subject else "Science",
                    examType = state.examType,
                    totalMarks = state.totalMarks,
                    difficulty = state.difficulty,
                    questionTypes = state.selectedQuestionTypes.toList(),
                    schoolName = state.schoolName,
                    customDuration = state.customDuration,
                    includeInternalChoice = state.includeInternalChoice,
                    includeCompetencyBased = state.includeCompetencyBased,
                    includeAnswerKey = state.includeAnswerKey,
                    includeDetailedSolutions = state.includeDetailedSolutions,
                    includeMarkingScheme = state.includeMarkingScheme
                )

                val generated = geminiService.generateQuestionPaper(
                    params = params,
                    photos = state.uploadedPhotos,
                    onProgressUpdate = { msg ->
                        _formState.value = _formState.value.copy(generationProgressMessage = msg)
                    }
                )

                repository.savePaper(generated)
                _selectedPaper.value = generated
                _formState.value = _formState.value.copy(isGenerating = false, generationProgressMessage = "")
                _statusMessage.value = "Paper generated successfully!"
                _currentScreen.value = AppScreen.PREVIEW
            } catch (e: Exception) {
                e.printStackTrace()
                _formState.value = _formState.value.copy(
                    isGenerating = false,
                    errorMessage = "Generation error: ${e.message}"
                )
            }
        }
    }

    // Paper Editing Actions
    fun selectPaper(paper: GeneratedPaper) {
        _selectedPaper.value = paper
        _currentScreen.value = AppScreen.PREVIEW
    }

    fun deletePaper(paperId: String) {
        viewModelScope.launch {
            repository.deletePaper(paperId)
            if (_selectedPaper.value?.id == paperId) {
                _selectedPaper.value = repository.papers.value.firstOrNull()
            }
            _statusMessage.value = "Question paper deleted."
        }
    }

    fun updateQuestion(sectionId: String, updatedQuestion: QuestionItem) {
        val current = _selectedPaper.value ?: return
        val updatedSections = current.sections.map { section ->
            if (section.id == sectionId) {
                val updatedQuestions = section.questions.map { q ->
                    if (q.id == updatedQuestion.id) updatedQuestion else q
                }
                section.copy(questions = updatedQuestions)
            } else {
                section
            }
        }
        val updatedPaper = current.copy(sections = updatedSections)
        _selectedPaper.value = updatedPaper
        viewModelScope.launch {
            repository.savePaper(updatedPaper)
        }
    }

    fun regenerateSingleQuestion(sectionId: String, question: QuestionItem) {
        val current = _selectedPaper.value ?: return
        viewModelScope.launch {
            _statusMessage.value = "Regenerating Question ${question.number}..."
            val regenerated = geminiService.regenerateQuestion(question, current.subject, current.board)
            updateQuestion(sectionId, regenerated)
            _statusMessage.value = "Question ${question.number} regenerated."
        }
    }

    fun deleteQuestion(sectionId: String, questionId: String) {
        val current = _selectedPaper.value ?: return
        val updatedSections = current.sections.map { section ->
            if (section.id == sectionId) {
                val updatedQuestions = section.questions.filter { it.id != questionId }
                val newTotal = updatedQuestions.sumOf { it.marks }
                section.copy(questions = updatedQuestions, totalMarks = newTotal)
            } else {
                section
            }
        }
        val newPaperTotal = updatedSections.sumOf { it.totalMarks }
        val updatedPaper = current.copy(sections = updatedSections, totalMarks = newPaperTotal)
        _selectedPaper.value = updatedPaper
        viewModelScope.launch {
            repository.savePaper(updatedPaper)
        }
    }

    fun exportPdf(context: Context, onComplete: (File?) -> Unit) {
        val paper = _selectedPaper.value ?: return
        viewModelScope.launch {
            try {
                val file = PaperPdfExporter.generatePdfFile(
                    context = context,
                    paper = paper,
                    includeAnswerKey = _formState.value.includeAnswerKey,
                    includeMarkingScheme = _formState.value.includeMarkingScheme
                )
                onComplete(file)
            } catch (e: Exception) {
                e.printStackTrace()
                onComplete(null)
            }
        }
    }
}
