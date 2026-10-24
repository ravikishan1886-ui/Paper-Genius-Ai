package com.papergenius.ai.ui.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.papergenius.ai.export.PaperPdfExporter
import com.papergenius.ai.model.GeneratedPaper
import com.papergenius.ai.ui.theme.*
import com.papergenius.ai.viewmodel.AppScreen
import com.papergenius.ai.viewmodel.PaperGeniusViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@Composable
fun MyPapersScreen(
    viewModel: PaperGeniusViewModel,
    onNavigate: (AppScreen) -> Unit
) {
    val papers by viewModel.savedPapers.collectAsState()
    val context = LocalContext.current
    val dateFormat = remember { SimpleDateFormat("dd MMM yyyy, hh:mm a", Locale.getDefault()) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Saved Question Papers",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )
                Text(
                    text = "${papers.size} papers stored locally",
                    fontSize = 12.sp,
                    color = TextMuted
                )
            }

            Button(
                onClick = { onNavigate(AppScreen.GENERATOR) },
                shape = RoundedCornerShape(10.dp),
                colors = ButtonDefaults.buttonColors(containerColor = BlueAccent)
            ) {
                Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(16.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("New Paper", fontSize = 12.sp)
            }
        }

        if (papers.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = 60.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.FolderOpen,
                        contentDescription = null,
                        tint = Slate400,
                        modifier = Modifier.size(64.dp)
                    )
                    Text(
                        text = "No Question Papers Yet",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark
                    )
                    Text(
                        text = "Upload textbook pages to generate your first examination question paper.",
                        fontSize = 13.sp,
                        color = TextSecondary,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.padding(horizontal = 32.dp)
                    )
                    Button(
                        onClick = { onNavigate(AppScreen.GENERATOR) },
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = BlueAccent)
                    ) {
                        Text("Create Question Paper")
                    }
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(papers, key = { it.id }) { paper ->
                    PaperListItem(
                        paper = paper,
                        formattedDate = dateFormat.format(Date(paper.createdAt)),
                        onSelect = {
                            viewModel.selectPaper(paper)
                            onNavigate(AppScreen.PREVIEW)
                        },
                        onExportPdf = {
                            viewModel.selectPaper(paper)
                            viewModel.exportPdf(context) { file ->
                                if (file != null) {
                                    PaperPdfExporter.sharePdf(context, file)
                                } else {
                                    Toast.makeText(context, "Could not export PDF", Toast.LENGTH_SHORT).show()
                                }
                            }
                        },
                        onDelete = { viewModel.deletePaper(paper.id) }
                    )
                }
            }
        }
    }
}

@Composable
fun PaperListItem(
    paper: GeneratedPaper,
    formattedDate: String,
    onSelect: () -> Unit,
    onExportPdf: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onSelect() },
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.5.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = paper.title,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark,
                        maxLines = 1
                    )
                    Text(
                        text = "${paper.schoolName} • ${paper.duration}",
                        fontSize = 12.sp,
                        color = TextSecondary,
                        maxLines = 1
                    )
                }

                Surface(
                    color = BlueLight,
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        text = "${paper.totalMarks} Marks",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = BlueAccent,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                    )
                }
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    color = PurpleLight,
                    shape = RoundedCornerShape(4.dp)
                ) {
                    Text(
                        text = paper.board.displayName,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = PurpleDark,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                    )
                }

                Surface(
                    color = Slate100,
                    shape = RoundedCornerShape(4.dp)
                ) {
                    Text(
                        text = "${paper.sections.size} Sections • ${paper.totalQuestionsCount} Qs",
                        fontSize = 10.sp,
                        color = Slate700,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                    )
                }

                Spacer(modifier = Modifier.weight(1f))
                Text(
                    text = formattedDate,
                    fontSize = 10.sp,
                    color = TextMuted
                )
            }

            HorizontalDivider(color = Slate100)

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End,
                verticalAlignment = Alignment.CenterVertically
            ) {
                TextButton(onClick = onSelect) {
                    Icon(Icons.Default.Visibility, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("View", fontSize = 12.sp)
                }
                TextButton(onClick = onExportPdf) {
                    Icon(Icons.Default.PictureAsPdf, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(4.dp))
                    Text("PDF", fontSize = 12.sp)
                }
                IconButton(onClick = onDelete, modifier = Modifier.size(32.dp)) {
                    Icon(Icons.Default.DeleteOutline, contentDescription = "Delete", tint = Color.Red, modifier = Modifier.size(18.dp))
                }
            }
        }
    }
}
