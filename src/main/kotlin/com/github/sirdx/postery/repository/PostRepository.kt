package com.github.sirdx.postery.repository

import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface PostRepository : JpaRepository<Post, PostId> {

    @Query(
        value = "SELECT * FROM POSTS WHERE LOWER(TITLE) LIKE LOWER(CONCAT('%', ?1,'%')) OR LOWER(CONTENT) LIKE LOWER(CONCAT('%', ?1,'%'))",
        countQuery = "SELECT COUNT(*) FROM POSTS WHERE LOWER(TITLE) LIKE LOWER(CONCAT('%', ?1,'%')) OR LOWER(CONTENT) LIKE LOWER(CONCAT('%', ?1,'%'))",
        nativeQuery = true
    )
    fun search(query: String, pageable: Pageable): Page<Post>
}