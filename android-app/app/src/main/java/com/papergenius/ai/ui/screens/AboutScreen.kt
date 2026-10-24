package com.papergenius.ai.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.papergenius.ai.ui.theme.*

@Composable
fun AboutScreen() {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // App Identity Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(64.dp)
                        .background(NavyPrimary, RoundedCornerShape(16.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoStories,
                        contentDescription = "Logo",
                        tint = Color.White,
                        modifier = Modifier.size(36.dp)
                    )
                }

                Text(
                    text = "PaperGenius AI",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )

                Text(
                    text = "Turn Textbook Pages into Exam-Ready Question Papers",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium,
                    color = PurpleAccent,
                    textAlign = TextAlign.Center
                )

                Surface(
                    color = Slate100,
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = "Version 1.0.0 (Native Android)",
                        fontSize = 11.sp,
                        color = TextMuted,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                    )
                }
            }
        }

        // Mission & Pedagogical Framework
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Text(
                    text = "About the Platform",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )

                Text(
                    text = "PaperGenius AI empowers educators to save hours of manual question paper typing and formatting. By combining optical character recognition (OCR) and advanced curriculum mapping, our engine transforms raw textbook photographs into polished, board-compliant examination papers in seconds.",
                    fontSize = 12.sp,
                    color = TextSecondary,
                    lineHeight = 17.sp
                )

                Text(
                    text = "Pedagogical Principles:",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = NavyDark
                )

                Text(
                    text = "• Bloom's Revised Taxonomy: Balanced distribution between Knowledge, Understanding, Application, and Analytical evaluation.\n• Competency-Based Assessment: Real-life scenario passages aligned with National Education Policy (NEP 2020).\n• Rigorous Arithmetic Balance: Every section strictly tallies with total marks chosen by the teacher without rounding errors.",
                    fontSize = 12.sp,
                    color = TextSecondary,
                    lineHeight = 17.sp
                )
            }
        }

        // Security & Privacy
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Text(
                    text = "Privacy & Local Storage",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )

                Text(
                    text = "All generated question papers, edits, and cached drafts are stored locally on your device in secure internal application storage. PDF exports are generated on-device using native Android graphics pipelines.",
                    fontSize = 12.sp,
                    color = TextSecondary,
                    lineHeight = 17.sp
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))
    }
}
