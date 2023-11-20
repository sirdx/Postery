package com.github.sirdx.postery.controller

import com.github.sirdx.postery.dto.request.AuthenticationRequest
import com.github.sirdx.postery.dto.request.RegisterRequest
import com.github.sirdx.postery.service.AuthService
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {

    @PostMapping("/register")
    fun register(
        @RequestBody @Valid registerRequest: RegisterRequest
    ): ResponseEntity<Any> {
        val registeredUser = authService.register(registerRequest)
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser.id)
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    fun login(
        @RequestBody authenticationRequest: AuthenticationRequest,
        request: HttpServletRequest,
        response: HttpServletResponse
    ) = ResponseEntity.ok().body(authService.login(authenticationRequest, request, response))
}