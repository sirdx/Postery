package com.github.sirdx.postery.dto.response

import com.github.sirdx.postery.model.CommentId
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.model.UserId
import java.time.Instant

data class CommentResponse(
    val id: CommentId,
    val authorId: UserId,
    val authorName: String,
    val authorDisplayName: String,
    val authorProfileColor: String,
    val postId: PostId,
    val content: String,
    val createdAt: Instant
)