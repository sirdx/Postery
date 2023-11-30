package com.github.sirdx.postery.user

import com.github.sirdx.postery.user.response.UserResponse

interface UserService {

    fun getUserById(id: UserId): UserResponse?
}