package com.github.sirdx.postery.security

import com.github.sirdx.postery.user.UserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsServiceImpl(
    private val userRepository: UserRepository
) : UserDetailsService {

    override fun loadUserByUsername(nameOrEmail: String): UserDetails {
        val user = userRepository.findByNameOrEmail(nameOrEmail, nameOrEmail)
            .orElseThrow {
                UsernameNotFoundException("User not found - $nameOrEmail")
            }

        return User(
            user.name,
            user.password,
            mutableListOf<GrantedAuthority>()
        )
    }
}