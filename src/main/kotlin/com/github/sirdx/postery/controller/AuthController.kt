package com.github.sirdx.postery.controller

import com.github.sirdx.postery.dto.request.AuthenticationRequest
import com.github.sirdx.postery.dto.request.RegisterRequest
import com.github.sirdx.postery.service.AuthenticationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authenticationService: AuthenticationService
) {

    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest) =
        ResponseEntity.ok(authenticationService.register(request))

    @PostMapping("/authenticate")
    fun authenticate(@RequestBody request: AuthenticationRequest) =
        ResponseEntity.ok(authenticationService.authenticate(request))
}