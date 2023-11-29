package com.github.sirdx.postery.model

import com.github.sirdx.postery.dto.response.CommentResponse
import jakarta.persistence.*
import java.time.Instant

typealias CommentId = Long

@Entity
@Table(name = "comments")
data class Comment(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: PostId = 0L,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    val author: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    val post: Post,

    @Column(columnDefinition = "TEXT")
    val content: String,

    val createdAt: Instant = Instant.now()
) {

    fun toResponse() = CommentResponse(
        id = id,
        authorId = author.id,
        authorName = author.name,
        authorDisplayName = author.displayName,
        authorProfileColor = author.profileColor,
        postId = post.id,
        content = content,
        createdAt = createdAt
    )
}
