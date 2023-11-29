package com.github.sirdx.postery.repository

import com.github.sirdx.postery.model.Comment
import com.github.sirdx.postery.model.CommentId
import com.github.sirdx.postery.model.PostId
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface CommentRepository : JpaRepository<Comment, CommentId> {

    @Query(
        value = "SELECT c FROM Comment c INNER JOIN c.post p WHERE p.id = :postId",
        countQuery = "SELECT count(c) FROM Comment c INNER JOIN c.post p WHERE p.id = :postId"
    )
    fun findAllByPostId(@Param("postId") postId: PostId, pageable: Pageable): Page<Comment>
    
    @Query("SELECT count(c) FROM Comment c INNER JOIN c.post p WHERE p.id = :postId")
    fun countAllByPostId(@Param("postId") postId: PostId): Int
}