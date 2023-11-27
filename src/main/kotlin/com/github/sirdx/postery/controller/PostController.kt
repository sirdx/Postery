package com.github.sirdx.postery.controller

import com.github.sirdx.postery.dto.request.NewPostRequest
import com.github.sirdx.postery.dto.response.PostResponse
import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.repository.UserRepository
import com.github.sirdx.postery.service.PostService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.net.URI
import kotlin.jvm.optionals.getOrNull

@RestController
@RequestMapping("/api/posts")
class PostController(
    private val postService: PostService,
    private val userRepository: UserRepository
) {

    @GetMapping("/search")
    fun searchPosts(
        @RequestParam(required = true) query: String,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): List<PostResponse> {
        val posts = postService.searchPosts(query, page, size)
        return posts.map { it.toResponse() }
    }

    @GetMapping("/newest")
    fun getNewestPosts(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "5") size: Int
    ): List<PostResponse> {
        val posts = postService.getNewestPosts(page, size)
        return posts.map { it.toResponse() }
    }

    @GetMapping("/{slug}")
    fun getPost(@PathVariable slug: String): ResponseEntity<PostResponse> {
        val post = postService.getPost(slug) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(post.toResponse())
    }

    @PostMapping
    fun createPost(
        @RequestBody @Valid newPostRequest: NewPostRequest,
        authentication: Authentication
    ): ResponseEntity<PostResponse> {
        val user = userRepository.findByNameOrEmail(authentication.name, authentication.name).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        val newPost = postService.createPost(user, newPostRequest)

        return ResponseEntity.created(
            URI.create("/api/posts/" + newPost.slug)
        ).body(newPost.toResponse())
    }

    @PutMapping("/{id}")
    fun updatePost(
        @PathVariable id: PostId,
        @RequestBody post: Post,
        authentication: Authentication
    ): ResponseEntity<Post> {
        val user = userRepository.findByNameOrEmail(authentication.name, authentication.name).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        val updatedPost = postService.updatePost(id, post) ?:
            return ResponseEntity.notFound().build()

        return ResponseEntity.ok(updatedPost)
    }

    @DeleteMapping("/{id}")
    fun deletePost(
        @PathVariable id: PostId,
        authentication: Authentication
    ): ResponseEntity<Unit> {
        val user = userRepository.findByNameOrEmail(authentication.name, authentication.name).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        val owner = userRepository.findByPostId(id).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        if (user.id != owner.id) {
            return ResponseEntity.badRequest().build()
        }

        return if (postService.deletePost(id))
            ResponseEntity.noContent().build()
        else
            ResponseEntity.notFound().build()
    }
}