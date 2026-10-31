package com.papergenius.ai.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val LightColorScheme = lightColorScheme(
    primary = BlueAccent,
    onPrimary = SurfaceWhite,
    primaryContainer = BlueLight,
    onPrimaryContainer = NavyPrimary,
    secondary = PurpleAccent,
    onSecondary = SurfaceWhite,
    secondaryContainer = PurpleLight,
    onSecondaryContainer = PurpleDark,
    background = BackgroundLight,
    onBackground = TextPrimary,
    surface = SurfaceWhite,
    onSurface = TextPrimary,
    surfaceVariant = Slate100,
    onSurfaceVariant = TextSecondary,
    outline = Slate300
)

@Composable
fun PaperGeniusTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = LightColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as? Activity)?.window
            if (window != null) {
                try {
                    WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = true
                    WindowCompat.getInsetsController(window, view).isAppearanceLightNavigationBars = true
                } catch (ignored: Exception) {
                    // Safe fallback on OEM custom roms
                }
            }
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
