package com.github.sirdx.postery.user

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(
    private val userRepository: UserRepository
) : UserService {

    override fun getUserById(id: UserId) =
        userRepository.findByIdOrNull(id)?.toResponse()
}