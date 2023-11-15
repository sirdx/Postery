package com.github.sirdx.postery.config

import com.github.sirdx.postery.security.AuthenticationEntryPoint
import com.github.sirdx.postery.security.CustomUserDetailsService
import com.github.sirdx.postery.security.CustomUsernamePasswordAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val authenticationConfiguration: AuthenticationConfiguration,
    private val authenticationEntryPoint: AuthenticationEntryPoint,
    private val customUserDetailsService: CustomUserDetailsService
) {

    @Bean
    fun authenticationProvider() = DaoAuthenticationProvider().apply {
        setUserDetailsService(customUserDetailsService)
        setPasswordEncoder(passwordEncoder())
    }

    @Bean
    fun authenticationManager() =
        authenticationConfiguration.authenticationManager

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .csrf {
                it.disable()
            }
            .authorizeHttpRequests { authorize ->
                authorize
                    .requestMatchers("/error").permitAll()
                    .requestMatchers("/api/auth/**").permitAll()
                    .anyRequest().authenticated()
            }
            .httpBasic {
                it.authenticationEntryPoint(authenticationEntryPoint)
            }
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(
                CustomUsernamePasswordAuthenticationFilter(authenticationManager()),
                UsernamePasswordAuthenticationFilter::class.java
            )
            .build()
}