package com.papergenius.ai.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.papergenius.ai.export.PaperPdfExporter
import com.papergenius.ai.logic.MarksDistribution
import com.papergenius.ai.model.*
import com.papergenius.ai.ui.theme.*
import com.papergenius.ai.viewmodel.AppScreen
import com.papergenius.ai.viewmodel.PaperGeniusViewModel
import java.io.File

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaperPreviewScreen(
    viewModel: PaperGeniusViewModel,
    onNavigate: (AppScreen) -> Unit
) {
    val paper by viewModel.selectedPaper.collectAsState()
    val context = LocalContext.current
    val scrollState = rememberScrollState()

    var selectedTab by remember { mutableStateOf(0) } // 0: Questions, 1: Solutions, 2: Topics
    var editingQuestionInfo by remember { mutableStateOf<Pair<String, QuestionItem>?>(null) } // (sectionId, QuestionItem)
    var isExportingPdf by remember { mutableStateOf(false) }

    if (paper == null) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Icon(Icons.Default.Description, contentDescription = null, tint = Slate400, modifier = Modifier.size(56.dp))
                Text(
                    text = "No Question Paper Selected",
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )
                Text(
                    text = "Generate a new paper from textbook photos or choose a saved one.",
                    fontSize = 13.sp,
                    color = TextSecondary,
                    textAlign = TextAlign.Center
                )
                Button(
                    onClick = { onNavigate(AppScreen.GENERATOR) },
                    shape = RoundedCornerShape(10.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = BlueAccent)
                ) {
                    Text("Generate Question Paper")
                }
            }
        }
        return
    }

    val currentPaper = paper!!

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
    ) {
        // Sticky Action Bar
        Surface(
            color = Color.White,
            shadowElevation = 3.dp
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 10.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(
                    onClick = {
                        isExportingPdf = true
                        viewModel.exportPdf(context) { file ->
                            isExportingPdf = false
                            if (file != null) {
                                PaperPdfExporter.sharePdf(context, file)
                            } else {
                                Toast.makeText(context, "Failed to create PDF", Toast.LENGTH_SHORT).show()
                            }
                        }
                    },
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(10.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = BlueAccent)
                ) {
                    if (isExportingPdf) {
                        CircularProgressIndicator(modifier = Modifier.size(16.dp), color = Color.White, strokeWidth = 2.dp)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Exporting...", fontSize = 12.sp)
                    } else {
                        Icon(Icons.Default.PictureAsPdf, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Export PDF", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }

                OutlinedButton(
                    onClick = {
                        val text = MarksDistribution.formatAsPlainText(currentPaper)
                        val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                        val clip = ClipData.newPlainText("Question Paper", text)
                        clipboard.setPrimaryClip(clip)
                        Toast.makeText(context, "Paper copied to clipboard", Toast.LENGTH_SHORT).show()
                    },
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(Icons.Default.ContentCopy, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("Copy", fontSize = 12.sp)
                }

                FilledTonalButton(
                    onClick = { onNavigate(AppScreen.GENERATOR) },
                    shape = RoundedCornerShape(10.dp)
                ) {
                    Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                }
            }
        }

        // Tabs
        TabRow(
            selectedTabIndex = selectedTab,
            containerColor = Color.White,
            contentColor = BlueAccent
        ) {
            Tab(
                selected = selectedTab == 0,
                onClick = { selectedTab = 0 },
                text = { Text("Questions (${currentPaper.totalQuestionsCount})", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 1,
                onClick = { selectedTab = 1 },
                text = { Text("Answer Key", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = selectedTab == 2,
                onClick = { selectedTab = 2 },
                text = { Text("Concepts (${currentPaper.analyzedTopics.size})", fontSize = 12.sp, fontWeight = FontWeight.Bold) }
            )
        }

        // Scrollable Body
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Paper Header Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Text(
                        text = (currentPaper.schoolName ?: "EXAMINATION QUESTION PAPER").uppercase(),
                        fontSize = 15.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = NavyDark,
                        textAlign = TextAlign.Center
                    )
                    Text(
                        text = "${currentPaper.examType.displayName.uppercase()} (2024-25)",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = TextSecondary,
                        textAlign = TextAlign.Center
                    )
                    Text(
                        text = "${currentPaper.className} • ${currentPaper.subject}",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = BlueAccent
                    )

                    HorizontalDivider(modifier = Modifier.padding(vertical = 4.dp), color = Slate200)

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(
                            text = "Time: ${currentPaper.duration}",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = Slate700
                        )
                        Surface(
                            color = BlueLight,
                            shape = RoundedCornerShape(6.dp)
                        ) {
                            Text(
                                text = currentPaper.board.displayName,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = BlueAccent,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                            )
                        }
                        Text(
                            text = "Max Marks: ${currentPaper.totalMarks}",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = Slate700
                        )
                    }
                }
            }

            // Tab 0: Questions Content
            if (selectedTab == 0) {
                // General Instructions
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Slate50),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Slate200)
                ) {
                    Column(
                        modifier = Modifier.padding(14.dp),
                        verticalArrangement = Arrangement.spacedBy(6.dp)
                    ) {
                        Text(
                            text = "General Instructions:",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyDark
                        )
                        currentPaper.generalInstructions.forEach { inst ->
                            Text(
                                text = "• $inst",
                                fontSize = 11.sp,
                                color = TextSecondary,
                                lineHeight = 16.sp
                            )
                        }
                    }
                }

                // Sections
                currentPaper.sections.forEach { section ->
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        verticalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        // Section Header
                        Surface(
                            modifier = Modifier.fillMaxWidth(),
                            color = PurpleLight,
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = section.name.uppercase(),
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = PurpleDark
                                )
                                Text(
                                    text = "${section.totalMarks} Marks (${section.questions.size} Qs)",
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.SemiBold,
                                    color = PurpleDark
                                )
                            }
                        }

                        if (!section.instructions.isNullOrBlank()) {
                            Text(
                                text = section.instructions!!,
                                fontSize = 11.sp,
                                color = TextMuted,
                                modifier = Modifier.padding(horizontal = 4.dp)
                            )
                        }

                        // Questions inside Section
                        section.questions.forEach { question ->
                            QuestionDisplayCard(
                                question = question,
                                onEdit = { editingQuestionInfo = Pair(section.id, question) },
                                onRegenerate = { viewModel.regenerateSingleQuestion(section.id, question) },
                                onDelete = { viewModel.deleteQuestion(section.id, question.id) }
                            )
                        }
                    }
                }
            }

            // Tab 1: Answer Key & Solutions
            if (selectedTab == 1) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(14.dp)
                    ) {
                        Text(
                            text = "Answer Key & Detailed Solutions",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyDark
                        )

                        currentPaper.sections.forEach { section ->
                            Text(
                                text = section.name,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = PurpleDark
                            )

                            section.questions.forEach { q ->
                                Card(
                                    modifier = Modifier.fillMaxWidth(),
                                    shape = RoundedCornerShape(10.dp),
                                    colors = CardDefaults.cardColors(containerColor = Slate50),
                                    border = androidx.compose.foundation.BorderStroke(1.dp, Slate200)
                                ) {
                                    Column(
                                        modifier = Modifier.padding(12.dp),
                                        verticalArrangement = Arrangement.spacedBy(6.dp)
                                    ) {
                                        Row(
                                            modifier = Modifier.fillMaxWidth(),
                                            horizontalArrangement = Arrangement.SpaceBetween
                                        ) {
                                            Text(
                                                text = "Q${q.number} (${q.type.displayName})",
                                                fontSize = 12.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = NavyDark
                                            )
                                            Text(
                                                text = "[${q.marks} Mark${if (q.marks > 1) "s" else ""}]",
                                                fontSize = 11.sp,
                                                fontWeight = FontWeight.SemiBold,
                                                color = BlueAccent
                                            )
                                        }

                                        Text(
                                            text = "Answer: ${q.correctAnswer ?: "Refer standard solution"}",
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Medium,
                                            color = EmeraldAccent
                                        )

                                        if (!q.explanation.isNullOrBlank()) {
                                            Text(
                                                text = "Step Explanation: ${q.explanation}",
                                                fontSize = 11.sp,
                                                color = TextSecondary,
                                                lineHeight = 16.sp
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Tab 2: Curriculum Analysis & Concept Mapping
            if (selectedTab == 2) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Text(
                            text = "OCR Vision Analysis & Topics Extracted",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyDark
                        )

                        Text(
                            text = "These topics were extracted by AI from your uploaded textbook photos and mapped to ${currentPaper.board.displayName} curriculum standards:",
                            fontSize = 12.sp,
                            color = TextSecondary
                        )

                        currentPaper.analyzedTopics.forEachIndexed { idx, topic ->
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(22.dp)
                                        .background(BlueLight, RoundedCornerShape(6.dp)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = "${idx + 1}",
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = BlueAccent
                                    )
                                }
                                Text(
                                    text = topic,
                                    fontSize = 12.sp,
                                    color = NavyDark,
                                    fontWeight = FontWeight.Medium
                                )
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(30.dp))
        }
    }

    // Edit Question Modal Dialog
    if (editingQuestionInfo != null) {
        val (sectionId, originalQuestion) = editingQuestionInfo!!
        var editedText by remember { mutableStateOf(originalQuestion.questionText) }
        var editedMarks by remember { mutableStateOf(originalQuestion.marks.toString()) }
        var editedAnswer by remember { mutableStateOf(originalQuestion.answerKey) }
        var editedExplanation by remember { mutableStateOf(originalQuestion.markingScheme ?: "") }

        AlertDialog(
            onDismissRequest = { editingQuestionInfo = null },
            title = {
                Text(
                    text = "Edit Question ${originalQuestion.questionNumber}",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Column(
                    modifier = Modifier.verticalScroll(rememberScrollState()),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    OutlinedTextField(
                        value = editedText,
                        onValueChange = { editedText = it },
                        label = { Text("Question Text") },
                        modifier = Modifier.fillMaxWidth()
                    )

                    OutlinedTextField(
                        value = editedMarks,
                        onValueChange = { editedMarks = it },
                        label = { Text("Marks") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        modifier = Modifier.fillMaxWidth()
                    )

                    OutlinedTextField(
                        value = editedAnswer,
                        onValueChange = { editedAnswer = it },
                        label = { Text("Correct Answer") },
                        modifier = Modifier.fillMaxWidth()
                    )

                    OutlinedTextField(
                        value = editedExplanation,
                        onValueChange = { editedExplanation = it },
                        label = { Text("Explanation / Marking Scheme") },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        val parsedMarks = editedMarks.toIntOrNull() ?: originalQuestion.marks
                        val updated = originalQuestion.copy(
                            questionText = editedText,
                            marks = parsedMarks,
                            answerKey = editedAnswer,
                            markingScheme = editedExplanation
                        )
                        viewModel.updateQuestion(sectionId, updated)
                        editingQuestionInfo = null
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = BlueAccent)
                ) {
                    Text("Save Changes")
                }
            },
            dismissButton = {
                OutlinedButton(onClick = { editingQuestionInfo = null }) {
                    Text("Cancel")
                }
            }
        )
    }
}

@Composable
fun QuestionDisplayCard(
    question: QuestionItem,
    onEdit: () -> Unit,
    onRegenerate: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            // Header: Q number and Marks chip
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Surface(
                        color = NavyDark,
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = "Q${question.number}",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }

                    Surface(
                        color = Slate100,
                        shape = RoundedCornerShape(6.dp)
                    ) {
                        Text(
                            text = question.type.displayName,
                            fontSize = 10.sp,
                            color = TextMuted,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }

                Surface(
                    color = BlueLight,
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        text = "${question.marks} Mark${if (question.marks > 1) "s" else ""}",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = BlueAccent,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                    )
                }
            }

            // Question Text
            Text(
                text = question.text,
                fontSize = 13.sp,
                fontWeight = FontWeight.Normal,
                color = NavyDark,
                lineHeight = 18.sp
            )

            // Multiple choice options if present
            val questionOpts = question.options
            if (question.type == QuestionType.MCQ && !questionOpts.isNullOrEmpty()) {
                val letters = listOf("A", "B", "C", "D")
                Column(
                    modifier = Modifier.padding(start = 4.dp),
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    questionOpts.forEachIndexed { idx, opt ->
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            verticalAlignment = Alignment.Top
                        ) {
                            Text(
                                text = "(${letters.getOrElse(idx) { "$idx" }})",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = NavyDark
                            )
                            Text(
                                text = opt,
                                fontSize = 12.sp,
                                color = TextSecondary,
                                lineHeight = 16.sp
                            )
                        }
                    }
                }
            }

            // Internal Choice (OR Question)
            val internalOr = question.internalChoice
            if (internalOr != null) {
                Surface(
                    modifier = Modifier.fillMaxWidth(),
                    color = Slate50,
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(10.dp),
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Text(
                            text = "--- OR ---",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = PurpleAccent,
                            textAlign = TextAlign.Center,
                            modifier = Modifier.fillMaxWidth()
                        )
                        Text(
                            text = internalOr.questionText,
                            fontSize = 12.sp,
                            color = NavyDark
                        )
                    }
                }
            }

            // Action Row: Regenerate, Edit, Delete
            HorizontalDivider(color = Slate100)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End,
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onRegenerate, modifier = Modifier.size(32.dp)) {
                    Icon(Icons.Default.Refresh, contentDescription = "Regenerate", tint = PurpleAccent, modifier = Modifier.size(18.dp))
                }
                IconButton(onClick = onEdit, modifier = Modifier.size(32.dp)) {
                    Icon(Icons.Default.Edit, contentDescription = "Edit", tint = BlueAccent, modifier = Modifier.size(18.dp))
                }
                IconButton(onClick = onDelete, modifier = Modifier.size(32.dp)) {
                    Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", tint = Color.Red, modifier = Modifier.size(18.dp))
                }
            }
        }
    }
}
