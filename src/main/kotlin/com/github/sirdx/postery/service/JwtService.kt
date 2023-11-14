package com.github.sirdx.postery.service

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
class JwtService {

    companion object {
        private val SECRET_KEY = Jwts.SIG.HS256.key().build()
        private const val SECONDS_TILL_EXPIRATION = 60L * 5L
    }

    fun extractUsername(token: String): String? =
        extractClaim(token, Claims::getSubject)

    fun<T> extractClaim(token: String, claimsResolver: (Claims) -> T): T {
        val claims = extractAllClaims(token)
        return claimsResolver(claims)
    }

    fun generateToken(userDetails: UserDetails, extraClaims: Map<String, Any> = mapOf()) =
        Jwts
            .builder()
            .claims(extraClaims)
            .subject(userDetails.username)
            .issuedAt(Date.from(Instant.now()))
            .expiration(Date.from(Instant.now().plusSeconds(SECONDS_TILL_EXPIRATION)))
            .signWith(SECRET_KEY)
            .compact()

    fun isTokenValid(token: String, userDetails: UserDetails): Boolean {
        val username = extractUsername(token)
        return username.equals(userDetails.username) && !isTokenExpired(token)
    }

    private fun isTokenExpired(token: String) =
        extractExpiration(token)?.before(Date.from(Instant.now())) ?: true

    private fun extractExpiration(token: String): Date? =
        extractClaim(token, Claims::getExpiration)

    private fun extractAllClaims(token: String) =
        Jwts
            .parser()
            .verifyWith(SECRET_KEY)
            .build()
            .parseSignedClaims(token)
            .payload
}