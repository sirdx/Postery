package com.github.sirdx.postery.security

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

class CustomUsernamePasswordAuthenticationFilter(
    private val authenticationManager: AuthenticationManager
) : UsernamePasswordAuthenticationFilter(authenticationManager) {

    companion object {
        const val SPRING_SECURITY_FORM_USERNAME_KEY = "username"
        const val SPRING_SECURITY_FORM_PASSWORD_KEY = "password"
    }

    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
        if (!request.method.equals("POST")) {
            throw AuthenticationServiceException("Authentication method not supported: ${request.method}")
        }

        val username = obtainUsername(request)?.trim() ?: ""
        val password = obtainPassword(request) ?: ""

        val authRequest = UsernamePasswordAuthenticationToken(username, password)
        setDetails(request, authRequest)
        return authenticationManager.authenticate(authRequest)
    }

    override fun obtainUsername(request: HttpServletRequest): String? {
        var username = request.getHeader(SPRING_SECURITY_FORM_USERNAME_KEY)

        if (username == null) {
            username = request.getParameter(SPRING_SECURITY_FORM_USERNAME_KEY)
        }

        return username?.lowercase()
    }

    override fun obtainPassword(request: HttpServletRequest): String? {
        val password = request.getHeader(SPRING_SECURITY_FORM_PASSWORD_KEY)
        return password ?: request.getParameter(SPRING_SECURITY_FORM_PASSWORD_KEY)
    }
}