package com.github.sirdx.postery.controller

import com.github.sirdx.postery.dto.request.AuthenticationRequest
import com.github.sirdx.postery.dto.request.RegisterRequest
import jakarta.servlet.http.HttpSession
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authenticationProvider: AuthenticationProvider
) {
//
//    @PostMapping("/register")
//    fun register(@RequestBody request: RegisterRequest) =
//        ResponseEntity.ok(authenticationService.register(request))

    @PostMapping("/authenticate")
    fun authenticate(@RequestBody request: AuthenticationRequest, session: HttpSession): ResponseEntity<Unit> {
        val token = UsernamePasswordAuthenticationToken(request.nameOrEmail, request.password)
        val authentication = authenticationProvider.authenticate(token)
        SecurityContextHolder.getContext().authentication = authentication
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext())

        return ResponseEntity.ok().build()
    }
}