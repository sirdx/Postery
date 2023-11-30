package com.github.sirdx.postery.dto.response

import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.model.UserId
import java.time.Instant

data class PostResponse(
    val id: PostId,
    val authorId: UserId,
    val authorName: String,
    val authorDisplayName: String,
    val authorProfileColor: String,
    val commentsCount: Int,
    val title: String,
    val content: String,
    val createdAt: Instant,
    val modifiedAt: Instant,
    val slug: String
)
