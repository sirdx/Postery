package com.github.sirdx.postery.post

import com.github.sirdx.postery.user.UserId
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.*

interface PostRepository : JpaRepository<Post, PostId> {

    @Query(
        value = "SELECT p FROM Post p WHERE lower(p.title) LIKE lower(concat('%', :query, '%')) OR lower(p.content) LIKE lower(concat('%', :query, '%'))",
        countQuery = "SELECT count(p) FROM Post p WHERE lower(p.title) LIKE lower(concat('%', :query, '%')) OR lower(p.content) LIKE lower(concat('%', :query, '%'))"
    )
    fun search(query: String, pageable: Pageable): Page<Post>

    @Query(
        value = "SELECT p FROM Post p INNER JOIN p.author u WHERE u.id = :userId",
        countQuery = "SELECT count(p) FROM Post p INNER JOIN p.author u WHERE u.id = :userId"
    )
    fun findAllByUserId(@Param("userId") userId: UserId, pageable: Pageable): Page<Post>

    fun findBySlug(slug: String): Optional<Post>
}