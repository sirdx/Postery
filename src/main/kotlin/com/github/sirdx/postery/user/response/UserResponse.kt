package com.github.sirdx.postery.user.response

import com.github.sirdx.postery.user.UserId
import java.time.Instant

data class UserResponse(
    val id: UserId,
    val name: String,
    val displayName: String,
    val profileColor: String,
    val createdAt: Instant
)