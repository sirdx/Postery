package com.github.sirdx.postery.repository

import com.github.sirdx.postery.model.User
import com.github.sirdx.postery.model.UserId
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional

interface UserRepository : JpaRepository<User, UserId> {

    fun findByNameOrEmail(name: String, email: String): Optional<User>

    fun findByEmail(email: String): Optional<User>

    fun findByName(name: String): Optional<User>
}