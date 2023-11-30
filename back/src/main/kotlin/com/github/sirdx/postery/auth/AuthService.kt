package com.github.sirdx.postery.auth

import com.github.sirdx.postery.auth.request.AuthenticationRequest
import com.github.sirdx.postery.auth.request.RegisterRequest
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.user.response.UserResponse
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.Authentication

interface AuthService {

    fun getUserByAuthentication(authentication: Authentication): User

    fun register(registerRequest: RegisterRequest, request: HttpServletRequest, response: HttpServletResponse): UserResponse?

    fun login(authenticationRequest: AuthenticationRequest, request: HttpServletRequest, response: HttpServletResponse): UserResponse?
}