package com.github.sirdx.postery.service

import com.github.sirdx.postery.dto.request.AuthenticationRequest
import com.github.sirdx.postery.dto.request.RegisterRequest
import com.github.sirdx.postery.model.User
import com.github.sirdx.postery.repository.UserRepository
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.context.SecurityContextHolderStrategy
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.context.SecurityContextRepository
import org.springframework.stereotype.Service
import java.lang.IllegalStateException

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val securityContextRepository: SecurityContextRepository,
    private val securityContextHolderStrategy: SecurityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy(),
    private val authenticationManager: AuthenticationManager
) {

    fun register(registerRequest: RegisterRequest): String {
        val email = registerRequest.email.trim()
        val name = registerRequest.name.trim()
        val password = registerRequest.password.trim()

        val exists = userRepository.findByNameOrEmail(name, email)

        if (exists.isPresent)  {
            throw IllegalStateException("User already exists")
        }

        val user = User(
            name = name,
            email = email,
            password = passwordEncoder.encode(password)
        )

        return userRepository.save(user).id.toString()
    }

    fun login(authenticationRequest: AuthenticationRequest, request: HttpServletRequest, response: HttpServletResponse) {
        val nameOrEmail = authenticationRequest.nameOrEmail
        val password = authenticationRequest.password

        val token = UsernamePasswordAuthenticationToken(nameOrEmail, password)
        val authentication = authenticationManager.authenticate(token)

        val context = SecurityContextHolder.createEmptyContext().apply {
            setAuthentication(authentication)
        }
        securityContextHolderStrategy.context = context
        securityContextRepository.saveContext(context, request, response)
    }
}