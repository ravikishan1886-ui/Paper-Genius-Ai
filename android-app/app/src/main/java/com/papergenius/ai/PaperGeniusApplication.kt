package com.papergenius.ai

import android.app.Application
import android.util.Log

class PaperGeniusApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        
        // Setup global safety uncaught exception handler
        val defaultHandler = Thread.getDefaultUncaughtExceptionHandler()
        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
            Log.e("PaperGeniusAI", "Uncaught exception on thread ${thread.name}: ${throwable.message}", throwable)
            defaultHandler?.uncaughtException(thread, throwable)
        }
        
        Log.i("PaperGeniusAI", "PaperGeniusApplication initialized successfully on Android ${android.os.Build.VERSION.SDK_INT}")
    }
}
