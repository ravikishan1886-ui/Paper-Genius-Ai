package com.papergenius.ai.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.papergenius.ai.ui.theme.BlueAccent
import com.papergenius.ai.ui.theme.NavyDark
import com.papergenius.ai.ui.theme.NavyPrimary
import com.papergenius.ai.ui.theme.PurpleAccent
import com.papergenius.ai.viewmodel.AppScreen

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppTopBar(
    currentScreen: AppScreen,
    onNavigate: (AppScreen) -> Unit,
    onActionClick: (() -> Unit)? = null,
    actionIcon: ImageVector? = null,
    actionTitle: String? = null
) {
    TopAppBar(
        title = {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // Mini Logo indicator
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .background(
                            brush = Brush.linearGradient(
                                colors = listOf(NavyPrimary, PurpleAccent)
                            ),
                            shape = MaterialTheme.shapes.small
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoStories,
                        contentDescription = "Logo",
                        tint = Color.White,
                        modifier = Modifier.size(18.dp)
                    )
                }

                Column {
                    Text(
                        text = "PaperGenius AI",
                        fontSize = 17.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark
                    )
                    Text(
                        text = currentScreen.title,
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        },
        actions = {
            if (actionIcon != null && onActionClick != null) {
                IconButton(onClick = onActionClick) {
                    Icon(imageVector = actionIcon, contentDescription = actionTitle ?: "Action", tint = NavyPrimary)
                }
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = Color.White,
            titleContentColor = NavyDark
        )
    )
}

@Composable
fun AppBottomBar(
    currentScreen: AppScreen,
    onNavigate: (AppScreen) -> Unit
) {
    NavigationBar(
        containerColor = Color.White,
        tonalElevation = 8.dp
    ) {
        NavigationBarItem(
            selected = currentScreen == AppScreen.HOME,
            onClick = { onNavigate(AppScreen.HOME) },
            icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
            label = { Text("Home", fontSize = 11.sp) },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = BlueAccent,
                selectedTextColor = BlueAccent,
                indicatorColor = Color(0xFFEFF6FF)
            )
        )

        NavigationBarItem(
            selected = currentScreen == AppScreen.GENERATOR,
            onClick = { onNavigate(AppScreen.GENERATOR) },
            icon = { Icon(Icons.Default.AutoFixHigh, contentDescription = "Generate") },
            label = { Text("Generate", fontSize = 11.sp) },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = BlueAccent,
                selectedTextColor = BlueAccent,
                indicatorColor = Color(0xFFEFF6FF)
            )
        )

        NavigationBarItem(
            selected = currentScreen == AppScreen.PREVIEW,
            onClick = { onNavigate(AppScreen.PREVIEW) },
            icon = { Icon(Icons.Default.Description, contentDescription = "Preview") },
            label = { Text("Paper", fontSize = 11.sp) },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = BlueAccent,
                selectedTextColor = BlueAccent,
                indicatorColor = Color(0xFFEFF6FF)
            )
        )

        NavigationBarItem(
            selected = currentScreen == AppScreen.MY_PAPERS,
            onClick = { onNavigate(AppScreen.MY_PAPERS) },
            icon = { Icon(Icons.Default.Folder, contentDescription = "My Papers") },
            label = { Text("Saved", fontSize = 11.sp) },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = BlueAccent,
                selectedTextColor = BlueAccent,
                indicatorColor = Color(0xFFEFF6FF)
            )
        )

        NavigationBarItem(
            selected = currentScreen == AppScreen.FEATURES,
            onClick = { onNavigate(AppScreen.FEATURES) },
            icon = { Icon(Icons.Default.Stars, contentDescription = "Features") },
            label = { Text("Features", fontSize = 11.sp) },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = BlueAccent,
                selectedTextColor = BlueAccent,
                indicatorColor = Color(0xFFEFF6FF)
            )
        )
    }
}
