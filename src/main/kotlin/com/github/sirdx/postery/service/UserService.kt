package com.github.sirdx.postery.service

import com.github.sirdx.postery.model.UserId
import com.github.sirdx.postery.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository
) {

    fun findUser(id: UserId) =
        userRepository.findByIdOrNull(id)?.toResponse()
}