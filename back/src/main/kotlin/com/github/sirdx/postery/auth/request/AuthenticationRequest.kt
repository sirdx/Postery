package com.github.sirdx.postery.auth.request

import jakarta.validation.constraints.NotBlank

data class AuthenticationRequest(
    @field:NotBlank(message = "Name or email is blank")
    val nameOrEmail: String,

    @field:NotBlank(message = "Password is blank")
    val password: String
)