package com.github.sirdx.postery.model

import com.github.sirdx.postery.dto.response.PostResponse
import com.github.sirdx.postery.util.toSlug
import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import java.time.Instant

typealias PostId = Long

@Entity
@Table(name = "posts")
data class Post(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: PostId = 0L,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    val author: User,

    val title: String,

    @Column(columnDefinition = "TEXT")
    val content: String,

    val createdAt: Instant = Instant.now(),

    val slug: String = title.toSlug()
) {

    fun toResponse() =
        PostResponse(
            id = id,
            authorId = author.id,
            title = title,
            content = content,
            createdAt = createdAt,
            slug = slug
        )
}
