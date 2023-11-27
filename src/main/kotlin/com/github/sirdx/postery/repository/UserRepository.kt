package com.github.sirdx.postery.repository

import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.model.User
import com.github.sirdx.postery.model.UserId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.Optional

interface UserRepository : JpaRepository<User, UserId> {

    fun findByNameOrEmail(name: String, email: String): Optional<User>

    fun findByEmail(email: String): Optional<User>

    fun findByName(name: String): Optional<User>

    @Query("SELECT u FROM User u INNER JOIN u.posts p WHERE p.id = :postId")
    fun findByPostId(@Param("postId") postId: PostId): Optional<User>
}