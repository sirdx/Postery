package com.github.sirdx.postery.dto.response

import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.model.UserId
import java.time.Instant

data class PostResponse(
    val id: PostId,
    val authorId: UserId,
    val title: String,
    val content: String,
    val createdAt: Instant,
    val slug: String
)
