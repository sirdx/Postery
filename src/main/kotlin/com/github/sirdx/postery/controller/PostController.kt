package com.github.sirdx.postery.controller

import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.repository.PostRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.net.URI

@RestController
@RequestMapping("/posts")
class PostController(
    private val postRepository: PostRepository
) {

    @GetMapping
    fun getPosts() =
        postRepository.findAll()

    @GetMapping("/{id}")
    fun getPost(@PathVariable id: PostId) =
        postRepository.findByIdOrNull(id)

    @PostMapping
    fun createPost(@RequestBody post: Post): ResponseEntity<Post> {
        val savedPost = postRepository.save(post)

        return ResponseEntity.created(
            URI.create("/posts/" + savedPost.id)
        ).body(savedPost)
    }

    @DeleteMapping("/{id}")
    fun deletePost(@PathVariable id: PostId): ResponseEntity<Unit> {
        postRepository.deleteById(id)
        return ResponseEntity.ok().build()
    }
}