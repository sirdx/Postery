package com.github.sirdx.postery.config

import com.github.sirdx.postery.repository.UserRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Configuration
class ApplicationConfig(
    private val userRepository: UserRepository
) {

    @Bean
    fun userDetailsService() = UserDetailsService { username ->  
        val user = userRepository.findByName(username).orElseThrow(UsernameNotFoundException("User not found"))
//        User.withUsername("user")
//            .password(bCryptPasswordEncoder().encode("password"))
//            .roles("USER")
//            .build()
    }

    @Bean
    fun authenticationProvider() = DaoAuthenticationProvider().apply {
        setUserDetailsService(userDetailsService())
        setPasswordEncoder(passwordEncoder())
    }

    @Bean
    fun authenticationManager(config: AuthenticationConfiguration) =
        config.authenticationManager

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()
}