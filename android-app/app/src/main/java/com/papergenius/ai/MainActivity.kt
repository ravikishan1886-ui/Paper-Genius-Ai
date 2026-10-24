package com.papergenius.ai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import com.papergenius.ai.ui.components.AppBottomBar
import com.papergenius.ai.ui.components.AppTopBar
import com.papergenius.ai.ui.screens.*
import com.papergenius.ai.ui.theme.PaperGeniusTheme
import com.papergenius.ai.viewmodel.AppScreen
import com.papergenius.ai.viewmodel.PaperGeniusViewModel
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PaperGeniusTheme {
                MainContent()
            }
        }
    }
}

@Composable
fun MainContent(
    viewModel: PaperGeniusViewModel = viewModel()
) {
    val currentScreen by viewModel.currentScreen.collectAsState()
    val statusMessage by viewModel.statusMessage.collectAsState()
    val snackbarHostState = remember { SnackbarHostState() }
    val scope = rememberCoroutineScope()

    LaunchedEffect(statusMessage) {
        statusMessage?.let { msg ->
            scope.launch {
                snackbarHostState.showSnackbar(msg)
                viewModel.clearStatusMessage()
            }
        }
    }

    // Handle back button: if not Home, navigate back to Home
    BackHandler(enabled = currentScreen != AppScreen.HOME) {
        viewModel.navigateTo(AppScreen.HOME)
    }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        topBar = {
            AppTopBar(
                currentScreen = currentScreen,
                onNavigate = { viewModel.navigateTo(it) },
                actionIcon = if (currentScreen != AppScreen.ABOUT) Icons.Default.Info else null,
                actionTitle = "About",
                onActionClick = { viewModel.navigateTo(AppScreen.ABOUT) }
            )
        },
        bottomBar = {
            AppBottomBar(
                currentScreen = currentScreen,
                onNavigate = { viewModel.navigateTo(it) }
            )
        },
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) { innerPadding ->
        Surface(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (currentScreen) {
                AppScreen.HOME -> HomeScreen(
                    viewModel = viewModel,
                    onNavigate = { viewModel.navigateTo(it) }
                )
                AppScreen.GENERATOR -> GeneratorScreen(
                    viewModel = viewModel
                )
                AppScreen.PREVIEW -> PaperPreviewScreen(
                    viewModel = viewModel,
                    onNavigate = { viewModel.navigateTo(it) }
                )
                AppScreen.MY_PAPERS -> MyPapersScreen(
                    viewModel = viewModel,
                    onNavigate = { viewModel.navigateTo(it) }
                )
                AppScreen.FEATURES -> FeaturesScreen(
                    onNavigate = { viewModel.navigateTo(it) }
                )
                AppScreen.ABOUT -> AboutScreen()
            }
        }
    }
}
