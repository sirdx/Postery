package com.github.sirdx.postery.dto.request

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class RegisterRequest(
    @field:NotBlank(message = "Name is blank")
    @field:Size(min = 3, max = 16, message = "Name must be from 3 to 16 characters long")
    val name: String,

    @field:Email(message = "Email is invalid")
    val email: String,

    @field:NotBlank(message = "Password is blank")
    @field:Size(min = 8, message = "Password must be at least 8 characters long")
    val password: String
)