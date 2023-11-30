package com.github.sirdx.postery.util

data class ErrorDetails(
    val error: String,
    val message: String
) {
    fun toMap() =
        mapOf(
            "error" to error,
            "message" to message
        )
}
