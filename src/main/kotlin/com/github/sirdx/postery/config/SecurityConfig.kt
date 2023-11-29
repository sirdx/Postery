package com.github.sirdx.postery.config

import com.github.sirdx.postery.security.AuthenticationEntryPoint
import com.github.sirdx.postery.security.CustomUserDetailsService
import com.github.sirdx.postery.security.CustomUsernamePasswordAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.context.HttpSessionSecurityContextRepository
import org.springframework.security.web.session.HttpSessionEventPublisher

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig(
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
        ProviderManager(authenticationProvider())

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .csrf {
                it.disable()
            }
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests { authorize ->
                authorize
                    .requestMatchers("/error").permitAll()
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/posts").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/posts/*").permitAll()
                    .requestMatchers(HttpMethod.GET, "/api/comments/*").permitAll()
                    .anyRequest().authenticated()
            }
            .sessionManagement { sessionManagement ->
                sessionManagement
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                    .sessionFixation {
                        it.newSession()
                    }
            }
            .exceptionHandling { ex ->
                ex.authenticationEntryPoint(authenticationEntryPoint)
            }
            .logout { logout ->
                logout
                    .logoutUrl("/api/auth/logout")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessHandler { _, _, _ ->
                        SecurityContextHolder.clearContext()
                    }
            }
            .addFilterBefore(
                CustomUsernamePasswordAuthenticationFilter(authenticationManager()),
                UsernamePasswordAuthenticationFilter::class.java
            )
            .build()

    @Bean
    fun httpSessionEventPublisher() =
        HttpSessionEventPublisher()

    @Bean
    fun securityContextRepository() =
        HttpSessionSecurityContextRepository()
}