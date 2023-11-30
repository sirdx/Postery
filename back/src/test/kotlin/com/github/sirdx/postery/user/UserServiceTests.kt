package com.github.sirdx.postery.user

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.BDDMockito.given
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.junit.jupiter.MockitoExtension
import java.util.*

@ExtendWith(MockitoExtension::class)
class UserServiceTests {

    @Mock
    private lateinit var userRepository: UserRepository

    @InjectMocks
    private lateinit var userService: UserServiceImpl

    private lateinit var user: User

    @BeforeEach
    fun setup() {
        user = User(
            id = 1L,
            name = "user",
            displayName = "Test User",
            email = "user@gmail.com",
            password = "...",
            profileColor = "ff00ff"
        )
    }

    @DisplayName("JUnit test for getUserById method")
    @Test
    fun givenUserId_whenGetUserById_thenReturnUserResponseObject() {
        given(userRepository.findById(user.id))
            .willReturn(Optional.of(user))

        val userResponse = userService.getUserById(user.id)

        assertThat(userResponse).isNotNull()
    }
}