package com.papergenius.ai.data

import android.content.Context
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import com.papergenius.ai.model.GeneratedPaper
import com.papergenius.ai.model.SampleData
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import java.io.File

class PaperRepository(private val context: Context) {

    private val gson: Gson = GsonBuilder().setPrettyPrinting().create()
    private val papersFile: File get() = File(context.filesDir, "saved_papers.json")

    private val _papers = MutableStateFlow<List<GeneratedPaper>>(emptyList())
    val papers: StateFlow<List<GeneratedPaper>> = _papers.asStateFlow()

    init {
        loadPapers()
    }

    @Synchronized
    private fun loadPapers() {
        try {
            if (papersFile.exists()) {
                val json = papersFile.readText()
                if (json.isNotBlank()) {
                    val type = object : TypeToken<List<GeneratedPaper>>() {}.type
                    val loaded: List<GeneratedPaper>? = gson.fromJson(json, type)
                    if (!loaded.isNullOrEmpty()) {
                        _papers.value = loaded
                        return
                    }
                }
            }
            val initial = runCatching { listOf(SampleData.samplePaper) }.getOrDefault(emptyList())
            _papers.value = initial
            runCatching { saveToFile(initial) }
        } catch (e: Throwable) {
            android.util.Log.e("PaperRepository", "Failed to load papers cleanly: ${e.message}", e)
            _papers.value = runCatching { listOf(SampleData.samplePaper) }.getOrDefault(emptyList())
        }
    }

    suspend fun savePaper(paper: GeneratedPaper): Boolean = withContext(Dispatchers.IO) {
        try {
            val current = _papers.value.toMutableList()
            val existingIndex = current.indexOfFirst { it.id == paper.id }
            if (existingIndex >= 0) {
                current[existingIndex] = paper
            } else {
                current.add(0, paper)
            }
            saveToFile(current)
            _papers.value = current
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    suspend fun deletePaper(paperId: String): Boolean = withContext(Dispatchers.IO) {
        try {
            val current = _papers.value.filter { it.id != paperId }
            saveToFile(current)
            _papers.value = current
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }

    fun getPaperById(id: String): GeneratedPaper? {
        return _papers.value.find { it.id == id }
    }

    private fun saveToFile(list: List<GeneratedPaper>) {
        val json = gson.toJson(list)
        papersFile.writeText(json)
    }
}
