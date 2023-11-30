package com.github.sirdx.postery.user

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest

@DataJpaTest
class UserRepositoryTests {

    @Autowired
    private lateinit var userRepository: UserRepository
}