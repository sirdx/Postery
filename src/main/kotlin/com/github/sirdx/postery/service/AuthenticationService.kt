package com.github.sirdx.postery.service

import com.github.sirdx.postery.dto.request.AuthenticationRequest
import com.github.sirdx.postery.dto.request.RegisterRequest
import com.github.sirdx.postery.dto.response.AuthenticationResponse
import com.github.sirdx.postery.model.User
import com.github.sirdx.postery.repository.UserRepository
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthenticationService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtService: JwtService,
    private val authenticationManager: AuthenticationManager
) {

    fun register(request: RegisterRequest): AuthenticationResponse {
        val user = User(
            name = request.name,
            email = request.email,
            password = passwordEncoder.encode(request.password)
        )

        userRepository.save(user)
        val jwt = jwtService.generateToken(user)
        return AuthenticationResponse(jwt)
    }

    fun authenticate(request: AuthenticationRequest): AuthenticationResponse {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                request.email,
                request.password
            )
        )

        val user = userRepository.findByEmail(request.email)
            .orElseThrow()
        val jwt = jwtService.generateToken(user)
        return AuthenticationResponse(jwt)
    }
}