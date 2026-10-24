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
            if (!papersFile.exists()) {
                val initial = listOf(SampleData.samplePaper)
                saveToFile(initial)
                _papers.value = initial
            } else {
                val json = papersFile.readText()
                val type = object : TypeToken<List<GeneratedPaper>>() {}.type
                val loaded: List<GeneratedPaper>? = gson.fromJson(json, type)
                _papers.value = loaded ?: listOf(SampleData.samplePaper)
            }
        } catch (e: Exception) {
            e.printStackTrace()
            _papers.value = listOf(SampleData.samplePaper)
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
