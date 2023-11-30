package com.github.sirdx.postery.auth

import com.github.sirdx.postery.auth.request.AuthenticationRequest
import com.github.sirdx.postery.auth.request.RegisterRequest
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.user.UserRepository
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.context.SecurityContextHolderStrategy
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.context.SecurityContextRepository
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class AuthServiceImpl(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val securityContextRepository: SecurityContextRepository,
    private val securityContextHolderStrategy: SecurityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy(),
    private val authenticationManager: AuthenticationManager
) : AuthService {

    override fun register(
        registerRequest: RegisterRequest,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): User? {
        val email = registerRequest.email.trim()
        val displayName = registerRequest.displayName.trim()
        val name = registerRequest.name.trim()
        val password = registerRequest.password.trim()
        val profileColor = registerRequest.profileColor

        val exists = userRepository.findByNameOrEmail(name, email)

        if (exists.isPresent)  {
            return null
        }

        val user = User(
            name = name,
            displayName = displayName,
            email = email,
            password = passwordEncoder.encode(password),
            profileColor = profileColor
        )

        val savedUser = userRepository.save(user)

        val token = UsernamePasswordAuthenticationToken(name, password)
        val authentication = authenticationManager.authenticate(token)

        val context = SecurityContextHolder.createEmptyContext().apply {
            setAuthentication(authentication)
        }
        securityContextHolderStrategy.context = context
        securityContextRepository.saveContext(context, request, response)

        return savedUser
    }

    override fun login(
        authenticationRequest: AuthenticationRequest,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): User? {
        val nameOrEmail = authenticationRequest.nameOrEmail
        val password = authenticationRequest.password

        val token = UsernamePasswordAuthenticationToken(nameOrEmail, password)
        val authentication = authenticationManager.authenticate(token)

        val context = SecurityContextHolder.createEmptyContext().apply {
            setAuthentication(authentication)
        }
        securityContextHolderStrategy.context = context
        securityContextRepository.saveContext(context, request, response)

        val user = userRepository.findByNameOrEmail(nameOrEmail, nameOrEmail)
        return user.getOrNull()
    }
}