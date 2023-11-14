package com.github.sirdx.postery.dto.request

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String
)