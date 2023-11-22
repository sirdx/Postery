package com.github.sirdx.postery.dto.response

import com.github.sirdx.postery.model.UserId
import java.time.Instant

data class UserResponse(
    val id: UserId,
    val name: String,
    val displayName: String,
    val profileColor: String,
    val createdAt: Instant
)