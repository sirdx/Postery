package com.github.sirdx.postery.repository

import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

interface PostRepository : JpaRepository<Post, PostId> {

    @Query(
        value = "SELECT p FROM Post p WHERE lower(p.title) LIKE lower(concat('%', :query, '%')) OR lower(p.content) LIKE lower(concat('%', :query, '%'))",
        countQuery = "SELECT count(p) FROM Post p WHERE lower(p.title) LIKE lower(concat('%', :query, '%')) OR lower(p.content) LIKE lower(concat('%', :query, '%'))"
    )
    fun search(query: String, pageable: Pageable): Page<Post>

    fun findBySlug(slug: String): Optional<Post>
}