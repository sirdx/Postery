package com.github.sirdx.postery.user

interface UserService {

    fun findUser(id: UserId): User?
}