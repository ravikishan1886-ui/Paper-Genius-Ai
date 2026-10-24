package com.papergenius.ai.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.papergenius.ai.model.SampleData
import com.papergenius.ai.ui.theme.*
import com.papergenius.ai.viewmodel.AppScreen
import com.papergenius.ai.viewmodel.PaperGeniusViewModel

@Composable
fun HomeScreen(
    viewModel: PaperGeniusViewModel,
    onNavigate: (AppScreen) -> Unit
) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight)
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(18.dp)
    ) {
        // Tagline chip
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center
        ) {
            Surface(
                color = PurpleLight,
                shape = RoundedCornerShape(16.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoAwesome,
                        contentDescription = null,
                        tint = PurpleAccent,
                        modifier = Modifier.size(14.dp)
                    )
                    Text(
                        text = "Turn Textbook Pages into Exam-Ready Papers",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = PurpleDark
                    )
                }
            }
        }

        // Hero Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                Text(
                    text = "Create Your Question Paper in Seconds",
                    fontSize = 22.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = NavyDark,
                    textAlign = TextAlign.Center,
                    lineHeight = 28.sp
                )

                Text(
                    text = "Upload textbook photos from your phone. Our vision AI reads chapters, understands concepts, and automatically generates school question papers with marking schemes and complete solutions.",
                    fontSize = 13.sp,
                    color = TextSecondary,
                    textAlign = TextAlign.Center,
                    lineHeight = 19.sp
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Button(
                        onClick = { onNavigate(AppScreen.GENERATOR) },
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = BlueAccent)
                    ) {
                        Icon(Icons.Default.AddCircleOutline, contentDescription = null, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Generate Paper", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                    }

                    OutlinedButton(
                        onClick = { onNavigate(AppScreen.FEATURES) },
                        modifier = Modifier
                            .weight(1f)
                            .height(48.dp),
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.outlinedButtonColors(contentColor = NavyDark)
                    ) {
                        Text("Explore Features", fontWeight = FontWeight.SemiBold, fontSize = 13.sp)
                    }
                }
            }
        }

        // Board Badges Section
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
                    text = "Accredited Education Boards",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    BoardBadge(name = "CBSE", subtitle = "Central Board", color = BlueAccent, modifier = Modifier.weight(1f))
                    BoardBadge(name = "PSEB", subtitle = "Punjab Board", color = PurpleAccent, modifier = Modifier.weight(1f))
                    BoardBadge(name = "ICSE", subtitle = "CISCE Council", color = AmberAccent, modifier = Modifier.weight(1f))
                }
            }
        }

        // Quick Action: Sample Paper Preview
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .clickable {
                    viewModel.selectPaper(SampleData.samplePaper)
                    onNavigate(AppScreen.PREVIEW)
                },
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = BlueLight),
            elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .background(BlueAccent, RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Description,
                        contentDescription = null,
                        tint = Color.White
                    )
                }

                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "View Sample 80-Mark CBSE Paper",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark
                    )
                    Text(
                        text = "Class 10 Science • 5 Sections • Complete Solutions",
                        fontSize = 12.sp,
                        color = TextSecondary
                    )
                }

                Icon(
                    imageVector = Icons.Default.ChevronRight,
                    contentDescription = null,
                    tint = BlueAccent
                )
            }
        }

        // Feature Highlights Grid
        Text(
            text = "Everything You Need For Examinations",
            fontSize = 15.sp,
            fontWeight = FontWeight.Bold,
            color = NavyDark
        )

        FeatureRowCard(
            icon = Icons.Default.CameraAlt,
            title = "Textbook Photo-to-Paper",
            description = "Takes textbook page photos directly from camera or gallery. Reads OCR formulas, graphs, and texts.",
            iconBg = Color(0xFFEFF6FF),
            iconTint = BlueAccent
        )

        FeatureRowCard(
            icon = Icons.Default.PieChart,
            title = "Custom Total Marks (40 - 100)",
            description = "Support for 40, 50, 60, 70, 80, 90, 100 or custom marks with verified mathematical balance.",
            iconBg = Color(0xFFF3E8FF),
            iconTint = PurpleAccent
        )

        FeatureRowCard(
            icon = Icons.Default.CheckCircleOutline,
            title = "Answer Key & Marking Scheme",
            description = "Comprehensive step-by-step solutions, key points, and detailed explanations for every question.",
            iconBg = Color(0xFFECFDF5),
            iconTint = EmeraldAccent
        )

        FeatureRowCard(
            icon = Icons.Default.Print,
            title = "Print-Ready Native PDF",
            description = "Generate formatted multi-page PDFs ready to print or share instantly via WhatsApp or Drive.",
            iconBg = Color(0xFFFFFBEB),
            iconTint = AmberAccent
        )

        Spacer(modifier = Modifier.height(16.dp))
    }
}

@Composable
fun BoardBadge(
    name: String,
    subtitle: String,
    color: Color,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(10.dp),
        color = color.copy(alpha = 0.08f),
        border = androidx.compose.foundation.BorderStroke(1.dp, color.copy(alpha = 0.25f))
    ) {
        Column(
            modifier = Modifier.padding(vertical = 10.dp, horizontal = 6.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = name,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = color
            )
            Text(
                text = subtitle,
                fontSize = 10.sp,
                color = TextMuted,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
fun FeatureRowCard(
    icon: ImageVector,
    title: String,
    description: String,
    iconBg: Color,
    iconTint: Color
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.Top,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(iconBg, RoundedCornerShape(10.dp)),
                contentAlignment = Alignment.Center
            ) {
                Icon(imageVector = icon, contentDescription = null, tint = iconTint, modifier = Modifier.size(20.dp))
            }

            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(
                    text = title,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )
                Text(
                    text = description,
                    fontSize = 12.sp,
                    color = TextSecondary,
                    lineHeight = 17.sp
                )
            }
        }
    }
}
