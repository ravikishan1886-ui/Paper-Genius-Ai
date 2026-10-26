package com.papergenius.ai.ui.screens

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.papergenius.ai.logic.MarksDistribution
import com.papergenius.ai.model.*
import com.papergenius.ai.ui.theme.*
import com.papergenius.ai.viewmodel.PaperGeniusViewModel
import java.util.UUID

@OptIn(ExperimentalLayoutApi::class, ExperimentalMaterial3Api::class)
@Composable
fun GeneratorScreen(
    viewModel: PaperGeniusViewModel
) {
    val formState by viewModel.formState.collectAsState()
    val scrollState = rememberScrollState()
    val context = LocalContext.current

    val photoPickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetMultipleContents()
    ) { uris: List<Uri> ->
        uris.forEachIndexed { idx, uri ->
            val photo = UploadedPagePhoto(
                id = UUID.randomUUID().toString(),
                uriString = uri.toString(),
                fileName = "Textbook_Page_${formState.uploadedPhotos.size + idx + 1}.jpg",
                fileSizeBytes = 350000L,
                analysisSummary = "Analyzing page concepts...",
                detectedKeywords = listOf("Textbook Topic", "Definitions")
            )
            viewModel.addUploadedPhoto(photo)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Step 1: Textbook Photo Upload Section
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(28.dp)
                                .background(BlueLight, RoundedCornerShape(8.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.CameraAlt, contentDescription = null, tint = BlueAccent, modifier = Modifier.size(16.dp))
                        }
                        Text(
                            text = "1. Textbook Page Photos",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            color = NavyDark
                        )
                    }

                    Text(
                        text = "${formState.uploadedPhotos.size} Pages Added",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = BlueAccent
                    )
                }

                Text(
                    text = "Upload photos of textbook pages. The AI reads content with OCR, maps formulas and topics, and crafts exam questions based strictly on these chapters.",
                    fontSize = 12.sp,
                    color = TextSecondary,
                    lineHeight = 17.sp
                )

                // Upload Actions
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    OutlinedButton(
                        onClick = { photoPickerLauncher.launch("image/*") },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Icon(Icons.Default.AddPhotoAlternate, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Add Photos", fontSize = 12.sp)
                    }

                    FilledTonalButton(
                        onClick = { viewModel.loadSamplePhotos() },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Icon(Icons.Default.AutoAwesome, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Sample Pages", fontSize = 12.sp)
                    }
                }

                // List of uploaded photos
                if (formState.uploadedPhotos.isNotEmpty()) {
                    Column(
                        modifier = Modifier.fillMaxWidth(),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        formState.uploadedPhotos.forEachIndexed { index, photo ->
                            Card(
                                modifier = Modifier.fillMaxWidth(),
                                shape = RoundedCornerShape(10.dp),
                                colors = CardDefaults.cardColors(containerColor = Slate50),
                                border = androidx.compose.foundation.BorderStroke(1.dp, Slate200)
                            ) {
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(10.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .size(36.dp)
                                            .background(PurpleLight, RoundedCornerShape(8.dp)),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(
                                            text = "P${index + 1}",
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = PurpleDark
                                        )
                                    }

                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(
                                            text = photo.fileName,
                                            fontSize = 13.sp,
                                            fontWeight = FontWeight.SemiBold,
                                            color = NavyDark,
                                            maxLines = 1
                                        )
                                        Text(
                                            text = photo.analysisSummary ?: "Ready for OCR generation",
                                            fontSize = 11.sp,
                                            color = TextMuted,
                                            maxLines = 2,
                                            lineHeight = 15.sp
                                        )
                                    }

                                    Row(horizontalArrangement = Arrangement.spacedBy(2.dp)) {
                                        if (index > 0) {
                                            IconButton(
                                                onClick = { viewModel.movePhotoUp(index) },
                                                modifier = Modifier.size(28.dp)
                                            ) {
                                                Icon(Icons.Default.ArrowUpward, contentDescription = "Up", modifier = Modifier.size(16.dp))
                                            }
                                        }
                                        if (index < formState.uploadedPhotos.size - 1) {
                                            IconButton(
                                                onClick = { viewModel.movePhotoDown(index) },
                                                modifier = Modifier.size(28.dp)
                                            ) {
                                                Icon(Icons.Default.ArrowDownward, contentDescription = "Down", modifier = Modifier.size(16.dp))
                                            }
                                        }
                                        IconButton(
                                            onClick = { viewModel.removeUploadedPhoto(photo.id) },
                                            modifier = Modifier.size(28.dp)
                                        ) {
                                            Icon(Icons.Default.Close, contentDescription = "Remove", tint = Color.Red, modifier = Modifier.size(16.dp))
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Step 2: Education Board & Class
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Text(
                    text = "2. Education Board & Class",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )

                // Education Board Selection
                Text(text = "Education Board", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = TextSecondary)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    EducationBoard.values().forEach { board ->
                        val isSelected = formState.board == board
                        Surface(
                            modifier = Modifier
                                .weight(1f)
                                .clickable { viewModel.setBoard(board) },
                            shape = RoundedCornerShape(10.dp),
                            color = if (isSelected) BlueAccent else Slate100,
                            border = if (isSelected) null else androidx.compose.foundation.BorderStroke(1.dp, Slate300)
                        ) {
                            Column(
                                modifier = Modifier.padding(vertical = 10.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Text(
                                    text = board.displayName,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = if (isSelected) Color.White else NavyDark
                                )
                            }
                        }
                    }
                }

                // Class Selection (Class 1 to 12)
                Text(text = "Select Class", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = TextSecondary)
                val classes = (1..12).map { "Class $it" }
                val classScrollState = rememberScrollState()
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(classScrollState),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    classes.forEach { cls ->
                        FilterChip(
                            selected = formState.className == cls,
                            onClick = { viewModel.setClassName(cls) },
                            label = { Text(cls, fontSize = 12.sp) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = BlueAccent,
                                selectedLabelColor = Color.White
                            )
                        )
                    }
                }

                // Subject Selection (Dynamically offered + custom)
                Text(text = "Subject", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = TextSecondary)
                val offeredSubjects = MarksDistribution.getSubjectsForBoard(formState.board, formState.className)
                val subjectScrollState = rememberScrollState()
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(subjectScrollState),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    val chipColors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = PurpleAccent,
                        selectedLabelColor = Color.White
                    )
                    offeredSubjects.forEach { sub ->
                        FilterChip(
                            selected = formState.subject == sub,
                            onClick = { viewModel.setSubject(sub) },
                            label = { Text(sub, fontSize = 12.sp) },
                            colors = chipColors
                        )
                    }
                }

                OutlinedTextField(
                    value = formState.customSubject,
                    onValueChange = { viewModel.setCustomSubject(it) },
                    label = { Text("Or enter custom subject", fontSize = 12.sp) },
                    placeholder = { Text("e.g. Punjabi Literature, Computer Applications") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    singleLine = true
                )
            }
        }

        // Step 3: Exam Type & Total Marks
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Text(
                    text = "3. Exam Pattern & Marks",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )

                // Exam Type
                Text(text = "Examination Type", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = TextSecondary)
                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    ExamType.values().forEach { exam ->
                        FilterChip(
                            selected = formState.examType == exam,
                            onClick = { viewModel.setExamType(exam) },
                            label = { Text(exam.displayName, fontSize = 12.sp) }
                        )
                    }
                }

                // Total Marks (40, 50, 60, 70, 80, 90, 100 or custom)
                Text(
                    text = "Total Marks (Select or Custom 40-100)",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = TextSecondary
                )
                val standardMarks = listOf(40, 50, 60, 70, 80, 90, 100)
                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    standardMarks.forEach { m ->
                        val isSelected = !formState.isCustomMarks && formState.totalMarks == m
                        FilterChip(
                            selected = isSelected,
                            onClick = { viewModel.setTotalMarks(m) },
                            label = { Text("$m Marks", fontSize = 12.sp) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = BlueAccent,
                                selectedLabelColor = Color.White
                            )
                        )
                    }
                }

                // Custom Marks field
                OutlinedTextField(
                    value = formState.customMarksInput,
                    onValueChange = { viewModel.setCustomMarks(it) },
                    label = { Text("Custom Total Marks (40 - 100)") },
                    placeholder = { Text("Enter marks e.g. 75") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    singleLine = true
                )

                // Difficulty Level
                Text(text = "Difficulty Level", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = TextSecondary)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    DifficultyLevel.values().forEach { diff ->
                        val isSelected = formState.difficulty == diff
                        FilterChip(
                            selected = isSelected,
                            onClick = { viewModel.setDifficulty(diff) },
                            label = { Text(diff.displayName, fontSize = 12.sp) },
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }

        // Step 4: Question Types Selection
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Text(
                    text = "4. Question Types to Include",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )

                Text(
                    text = "Select all types to integrate or let AI optimize section distribution:",
                    fontSize = 12.sp,
                    color = TextSecondary
                )

                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    verticalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    QuestionType.values().forEach { qType ->
                        val isSelected = formState.selectedQuestionTypes.contains(qType)
                        FilterChip(
                            selected = isSelected,
                            onClick = { viewModel.toggleQuestionType(qType) },
                            label = { Text(qType.displayName, fontSize = 11.sp) }
                        )
                    }
                }
            }
        }

        // Step 5: Examination Details & Options
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = "5. Additional Options & School Info",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )

                OutlinedTextField(
                    value = formState.schoolName,
                    onValueChange = { viewModel.setSchoolName(it) },
                    label = { Text("School / Institution Name") },
                    placeholder = { Text("e.g. St. Xavier's Senior Secondary School") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    singleLine = true
                )

                OutlinedTextField(
                    value = formState.customDuration,
                    onValueChange = { viewModel.setCustomDuration(it) },
                    label = { Text("Exam Duration") },
                    placeholder = { Text("e.g. 3 Hours, 90 Minutes") },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    singleLine = true
                )

                HorizontalDivider(color = Slate200)

                SwitchRow(
                    title = "Include Internal Choices (OR questions)",
                    subtitle = "Board-standard choices in Long & Short sections",
                    checked = formState.includeInternalChoice,
                    onCheckedChange = { viewModel.toggleInternalChoice(it) }
                )

                SwitchRow(
                    title = "Include Competency-Based / Case Questions",
                    subtitle = "Real-world passages, data and scenario analysis",
                    checked = formState.includeCompetencyBased,
                    onCheckedChange = { viewModel.toggleCompetencyBased(it) }
                )

                SwitchRow(
                    title = "Include Complete Answer Key",
                    subtitle = "Correct solutions with model answer explanations",
                    checked = formState.includeAnswerKey,
                    onCheckedChange = { viewModel.toggleAnswerKey(it) }
                )

                SwitchRow(
                    title = "Include Step Marking Scheme",
                    subtitle = "Marks breakdown per step according to board directives",
                    checked = formState.includeMarkingScheme,
                    onCheckedChange = { viewModel.toggleMarkingScheme(it) }
                )
            }
        }

        // Error message if any
        if (formState.errorMessage != null) {
            Text(
                text = formState.errorMessage ?: "",
                color = Color.Red,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        // Generation progress banner if active
        if (formState.isGenerating) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = BlueLight)
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        color = BlueAccent,
                        strokeWidth = 2.5.dp
                    )
                    Text(
                        text = formState.generationProgressMessage,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Medium,
                        color = NavyDark
                    )
                }
            }
        }

        // Submit Button
        Button(
            onClick = { viewModel.generatePaper() },
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp),
            enabled = !formState.isGenerating,
            shape = RoundedCornerShape(14.dp),
            colors = ButtonDefaults.buttonColors(containerColor = BlueAccent)
        ) {
            if (formState.isGenerating) {
                Text("Synthesizing Paper...", fontSize = 15.sp, fontWeight = FontWeight.Bold)
            } else {
                Icon(Icons.Default.AutoFixHigh, contentDescription = null, modifier = Modifier.size(20.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Generate Question Paper", fontSize = 15.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

@Composable
fun SwitchRow(
    title: String,
    subtitle: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onCheckedChange(!checked) }
            .padding(vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(modifier = Modifier.weight(1f)) {
            Text(text = title, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = NavyDark)
            Text(text = subtitle, fontSize = 11.sp, color = TextMuted)
        }
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            colors = SwitchDefaults.colors(
                checkedThumbColor = Color.White,
                checkedTrackColor = BlueAccent
            )
        )
    }
}
