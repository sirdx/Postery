package com.github.sirdx.postery.user

import com.github.sirdx.postery.comment.Comment
import com.github.sirdx.postery.user.response.UserResponse
import com.github.sirdx.postery.post.Post
import jakarta.persistence.*
import java.time.Instant

typealias UserId = Long

@Entity
@Table(
    name = "users",
    uniqueConstraints = [
        UniqueConstraint(columnNames = ["name"]),
        UniqueConstraint(columnNames = ["email"])
    ]
)
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: UserId = 0L,

    val name: String,

    val displayName: String,

    val email: String,

    val password: String,

    @Column(length = 6)
    val profileColor: String, // HEX

    @OneToMany(mappedBy = "author")
    val posts: List<Post> = listOf(),

    @OneToMany(mappedBy = "author")
    val comments: List<Comment> = listOf(),

    val createdAt: Instant = Instant.now()
) {

    fun toResponse() = UserResponse(
        id = id,
        name = name,
        displayName = displayName,
        profileColor = profileColor,
        createdAt = createdAt
    )
}
