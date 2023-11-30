package com.github.sirdx.postery.auth

import com.github.sirdx.postery.auth.request.AuthenticationRequest
import com.github.sirdx.postery.auth.request.RegisterRequest
import com.github.sirdx.postery.user.User
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

interface AuthService {

    fun register(registerRequest: RegisterRequest, request: HttpServletRequest, response: HttpServletResponse): User?

    fun login(authenticationRequest: AuthenticationRequest, request: HttpServletRequest, response: HttpServletResponse): User?
}