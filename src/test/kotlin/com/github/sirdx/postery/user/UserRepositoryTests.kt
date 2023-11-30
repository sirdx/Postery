package com.github.sirdx.postery.user

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

@DataJpaTest
class UserRepositoryTests {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Test
    fun testSave() {
        val user = User(
            name = "user",
            displayName = "Test User",
            email = "user@gmail.com",
            password = "...",
            profileColor = "ff00ff"
        )

        val savedUser = userRepository.save(user)
        val foundUser = userRepository.findById(savedUser.id).orElseThrow()

        assertEquals(savedUser.id, foundUser.id)
        assertEquals(user.name, foundUser.name)
        assertEquals(user.displayName, foundUser.displayName)
        assertEquals(user.email, foundUser.email)
        assertEquals(user.password, foundUser.password)
        assertEquals(user.profileColor, foundUser.profileColor)
        assertEquals(user.createdAt, foundUser.createdAt)
    }


}