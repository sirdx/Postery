package com.github.sirdx.postery.auth

import com.github.sirdx.postery.auth.request.AuthenticationRequest
import com.github.sirdx.postery.auth.request.RegisterRequest
import com.github.sirdx.postery.user.response.UserResponse
import com.github.sirdx.postery.util.ErrorDetails
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {

    @PostMapping("/register")
    fun register(
        @RequestBody @Valid registerRequest: RegisterRequest,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): ResponseEntity<Any> {
        val registeredUser = authService.register(registerRequest, request, response) ?:
            return ResponseEntity.badRequest().body(ErrorDetails("Registration Error", "User already exists"))

        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser.toResponse())
    }

    @PostMapping("/login")
    fun login(
        @RequestBody authenticationRequest: AuthenticationRequest,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): ResponseEntity<UserResponse> {
        val user = authService.login(authenticationRequest, request, response) ?:
            return ResponseEntity.internalServerError().build()

        return ResponseEntity.ok().body(user.toResponse())
    }
}