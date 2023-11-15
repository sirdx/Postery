package com.github.sirdx.postery.model

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
    @GeneratedValue
    val id: UserId = 0L,
    val name: String,
    val email: String,
    val password: String,
    @OneToMany(mappedBy = "author")
    val posts: List<Post> = listOf(),
    val createdAt: Instant = Instant.now()
)
