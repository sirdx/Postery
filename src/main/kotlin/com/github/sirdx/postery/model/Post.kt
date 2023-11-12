package com.github.sirdx.postery.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table

typealias PostId = Long

@Entity
@Table(name = "posts")
data class Post(
    @Id
    @GeneratedValue
    val id: PostId,
    val title: String,
    val content: String,
    val author: String,
)
