package com.github.sirdx.postery.controller

import com.github.sirdx.postery.dto.response.UserResponse
import com.github.sirdx.postery.model.UserId
import com.github.sirdx.postery.service.UserService
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
        val user = userService.findUser(id) ?:
            return ResponseEntity.notFound().build()

        return ResponseEntity.ok().body(user)
    }
}