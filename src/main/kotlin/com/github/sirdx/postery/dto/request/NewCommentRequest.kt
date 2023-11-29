package com.github.sirdx.postery.dto.request

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class NewCommentRequest(
    @field:NotBlank(message = "Content is mandatory")
    @field:Size(max = 300, message = "Content must be up to 300 characters long")
    val content: String
)
