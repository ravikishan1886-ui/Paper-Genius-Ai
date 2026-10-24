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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.papergenius.ai.ui.theme.*
import com.papergenius.ai.viewmodel.AppScreen

@Composable
fun FeaturesScreen(
    onNavigate: (AppScreen) -> Unit
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Header
        Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(
                text = "Key Features & Capabilities",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = NavyDark
            )
            Text(
                text = "PaperGenius AI is engineered specifically for school educators, tutors, and academic administrators across India.",
                fontSize = 13.sp,
                color = TextSecondary,
                lineHeight = 18.sp
            )
        }

        FeatureDetailCard(
            icon = Icons.Default.CameraAlt,
            title = "Textbook Photo Vision & OCR",
            description = "Snap pictures of physical textbooks directly from your mobile camera or upload from gallery. The AI automatically isolates chapters, formulas, chemical reactions, historical timelines, and theorems, ensuring questions are strictly from your taught content.",
            badge = "Core Engine",
            badgeColor = BlueAccent
        )

        FeatureDetailCard(
            icon = Icons.Default.AccountBalance,
            title = "Board-Specific Alignment",
            description = "Presets tuned according to latest guidelines for CBSE (Central Board of Secondary Education), PSEB (Punjab School Education Board), and ICSE (Council for the Indian School Certificate Examinations). Applies appropriate question styles, languages, and section structures.",
            badge = "CBSE • PSEB • ICSE",
            badgeColor = PurpleAccent
        )

        FeatureDetailCard(
            icon = Icons.Default.Tune,
            title = "Custom Total Marks (40 to 100)",
            description = "Support for standard 40, 50, 60, 70, 80, 90, 100 marks or any custom number between 40 and 100. Our algorithmic marks allocation engine guarantees mathematically precise distributions across Sections A, B, C, D, and E without remainder discrepancies.",
            badge = "100% Balanced",
            badgeColor = EmeraldAccent
        )

        FeatureDetailCard(
            icon = Icons.Default.FactCheck,
            title = "Complete Answer Keys & Solutions",
            description = "Generates model answers, step-by-step mathematical calculations, and board-standard marking schemes so teachers can grade immediately without spending hours preparing answer keys.",
            badge = "Step Marking",
            badgeColor = AmberAccent
        )

        FeatureDetailCard(
            icon = Icons.Default.EditNote,
            title = "Interactive Editing & AI Regeneration",
            description = "Need to swap a question? Tap the Regenerate icon on any question to instantly replace it with a fresh alternative of equal mark value. Or edit text, marks, and solutions directly.",
            badge = "Full Control",
            badgeColor = BlueAccent
        )

        FeatureDetailCard(
            icon = Icons.Default.Print,
            title = "Print-Ready Native PDF Export",
            description = "Exports professional, clean multi-page PDFs with school branding, general instructions, formatted sections, and optional answer keys. Share directly via WhatsApp, print wirelessly, or save to Google Drive.",
            badge = "Native PDF",
            badgeColor = PurpleAccent
        )

        Button(
            onClick = { onNavigate(AppScreen.GENERATOR) },
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(containerColor = BlueAccent)
        ) {
            Text("Create Question Paper Now", fontWeight = FontWeight.Bold)
        }

        Spacer(modifier = Modifier.height(16.dp))
    }
}

@Composable
fun FeatureDetailCard(
    icon: ImageVector,
    title: String,
    description: String,
    badge: String,
    badgeColor: Color
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
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
                            .size(36.dp)
                            .background(badgeColor.copy(alpha = 0.1f), RoundedCornerShape(8.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(imageVector = icon, contentDescription = null, tint = badgeColor, modifier = Modifier.size(18.dp))
                    }
                    Text(
                        text = title,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark
                    )
                }

                Surface(
                    color = badgeColor.copy(alpha = 0.1f),
                    shape = RoundedCornerShape(6.dp)
                ) {
                    Text(
                        text = badge,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = badgeColor,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                    )
                }
            }

            Text(
                text = description,
                fontSize = 12.sp,
                color = TextSecondary,
                lineHeight = 17.sp
            )
        }
    }
}
