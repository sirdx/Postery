package com.github.sirdx.postery.dto.request

data class AuthenticationRequest(
    val nameOrEmail: String,
    val password: String
)