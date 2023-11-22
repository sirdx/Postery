package com.github.sirdx.postery.dto.request

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

data class RegisterRequest(
    @field:NotBlank(message = "Name is blank")
    @field:Size(min = 3, max = 16, message = "Name must be from 3 to 16 characters long")
    val name: String,

    @field:NotBlank(message = "Display name is blank")
    @field:Size(min = 3, max = 30, message = "Name must be from 3 to 30 characters long")
    val displayName: String,

    @field:Email(message = "Email is invalid")
    val email: String,

    @field:NotBlank(message = "Password is blank")
    @field:Size(min = 8, message = "Password must be at least 8 characters long")
    val password: String,

    @field:NotBlank(message = "Profile color is blank")
    @field:Pattern(regexp = "^[A-Fa-f0-9]{6}$", message = "Invalid HEX color")
    val profileColor: String
)