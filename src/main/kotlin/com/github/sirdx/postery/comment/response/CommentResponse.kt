package com.github.sirdx.postery.comment.response

import com.github.sirdx.postery.comment.CommentId
import com.github.sirdx.postery.user.UserId
import com.github.sirdx.postery.post.PostId
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