# PaperGenius AI ProGuard / R8 Rules
# Keep data models used with Gson serialization
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}

-keep class com.papergenius.ai.model.** { *; }
-keepclassmembers class com.papergenius.ai.model.** { *; }

# Keep Gson
-keepattributes Signature
-keepattributes *Annotation*
-keep class com.google.gson.** { *; }

# Keep OkHttp & Coroutines
-dontwarn okhttp3.**
-dontwarn okio.**
-keepnames class okhttp3.internal.publicsuffix.PublicSuffixDatabase

# Keep Compose & AndroidX
-keep class androidx.compose.** { *; }
-keep class androidx.lifecycle.** { *; }
