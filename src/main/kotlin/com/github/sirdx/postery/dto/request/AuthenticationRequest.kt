package com.github.sirdx.postery.dto.request

data class AuthenticationRequest(
    val email: String,
    val password: String
)