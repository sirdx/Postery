package com.github.sirdx.postery.post

import com.github.sirdx.postery.auth.AuthService
import com.github.sirdx.postery.post.request.NewPostRequest
import com.github.sirdx.postery.post.response.PostResponse
import com.github.sirdx.postery.user.UserId
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@RequestMapping("/api/posts")
class PostController(
    private val postService: PostService,
    private val authService: AuthService
) {

    @GetMapping("/search")
    fun searchPosts(
        @RequestParam(required = true) query: String,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ) = postService.searchPosts(query, page, size)

    @GetMapping("/user/{id}")
    fun getUserPosts(
        @PathVariable id: UserId,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "5") size: Int
    ) = postService.getUserPosts(id, page, size)

    @GetMapping("/newest")
    fun getNewestPosts(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "5") size: Int
    ) = postService.getNewestPosts(page, size)

    @GetMapping("/{slug}")
    fun getPost(@PathVariable slug: String): ResponseEntity<PostResponse> {
        val post = postService.getPostBySlug(slug) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(post)
    }

    @PostMapping
    fun createPost(
        @RequestBody @Valid newPostRequest: NewPostRequest,
        authentication: Authentication
    ): ResponseEntity<PostResponse> {
        val user = authService.getUserByAuthentication(authentication)
        val newPost = postService.createPost(user, newPostRequest)

        return ResponseEntity.created(
            URI.create("/api/posts/${newPost.slug}")
        ).body(newPost)
    }

    @PutMapping("/{id}")
    fun updatePost(
        @PathVariable id: PostId,
        @RequestBody newPostRequest: NewPostRequest,
        authentication: Authentication
    ): ResponseEntity<PostResponse> {
        val user = authService.getUserByAuthentication(authentication)
        return ResponseEntity.ok(postService.updatePost(id, user, newPostRequest))
    }

    @DeleteMapping("/{id}")
    fun deletePost(
        @PathVariable id: PostId,
        authentication: Authentication
    ): ResponseEntity<Unit> {
        val user = authService.getUserByAuthentication(authentication)
        postService.deletePost(id, user)
        return ResponseEntity.noContent().build()
    }
}