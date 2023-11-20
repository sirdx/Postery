package com.github.sirdx.postery.dto.request

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class NewPostRequest(
    @field:NotBlank(message = "Title is blank")
    @field:Size(min = 8, max = 255, message = "Title must be from 8 to 255 characters long")
    val title: String,

    @field:NotBlank(message = "Content is mandatory")
    @field:Size(min = 8, max = 1000, message = "Content must be from 8 to 1000 characters long")
    val content: String
)