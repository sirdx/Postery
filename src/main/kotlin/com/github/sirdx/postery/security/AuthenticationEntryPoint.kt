package com.github.sirdx.postery.security

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint
import org.springframework.stereotype.Component

@Component
class AuthenticationEntryPoint(
    private val objectMapper: ObjectMapper
) : BasicAuthenticationEntryPoint() {

    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        response.status = HttpServletResponse.SC_UNAUTHORIZED
        response.contentType = "application/json;charset=UTF-8"

        val errorDetails = mapOf(
            "error" to "Authentication Failed",
            "message" to (authException.message ?: "Unauthorized")
        )
        response.writer.println(objectMapper.writeValueAsString(errorDetails))
    }

    override fun afterPropertiesSet() {
        realmName = "Postery"
        super.afterPropertiesSet()
    }
}