package com.github.sirdx.postery.user

import com.github.sirdx.postery.user.response.UserResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService
) {

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: UserId): ResponseEntity<UserResponse> {
        val user = userService.getUserById(id) ?:
            return ResponseEntity.notFound().build()

        return ResponseEntity.ok().body(user)
    }
}