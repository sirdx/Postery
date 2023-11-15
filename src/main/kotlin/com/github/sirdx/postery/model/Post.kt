package com.github.sirdx.postery.model

import com.github.sirdx.postery.util.toSlug
import jakarta.persistence.*
import java.time.Instant

typealias PostId = Long

@Entity
@Table(name = "posts")
data class Post(
    @Id
    @GeneratedValue
    val id: PostId = 0L,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    val author: User,
    val title: String,
    val content: String,
    val createdAt: Instant = Instant.now(),
    val slug: String = title.toSlug()
)
