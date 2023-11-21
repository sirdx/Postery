package com.github.sirdx.postery.controller

import com.github.sirdx.postery.dto.request.NewPostRequest
import com.github.sirdx.postery.dto.response.PostResponse
import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.repository.PostRepository
import com.github.sirdx.postery.repository.UserRepository
import jakarta.validation.Valid
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.net.URI
import kotlin.jvm.optionals.getOrNull

@RestController
@RequestMapping("/api/posts")
class PostController(
    private val postRepository: PostRepository,
    private val userRepository: UserRepository
) {

    @GetMapping
    fun getPosts() =
        postRepository.findAll().map { it.toResponse() }

    @GetMapping("/newest")
    fun getNewestPosts(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "5") size: Int
    ): List<PostResponse> {
        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.findAll(paging)
        val posts = pagePosts.content

        return posts.map { it.toResponse() }
    }

    @GetMapping("/{id}")
    fun getPost(@PathVariable id: PostId): ResponseEntity<PostResponse> {
        val post = postRepository.findByIdOrNull(id) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(post.toResponse())
    }

    @PostMapping
    fun createPost(@RequestBody @Valid post: NewPostRequest, authentication: Authentication): ResponseEntity<PostResponse> {
        val user = userRepository.findByNameOrEmail(authentication.name, authentication.name).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        val savedPost = postRepository.save(Post(
            author = user,
            title = post.title,
            content = post.content
        ))

        return ResponseEntity.created(
            URI.create("/api/posts/" + savedPost.id)
        ).body(savedPost.toResponse())
    }

    @PutMapping("/{id}")
    fun updatePost(@PathVariable id: PostId, @RequestBody post: Post): ResponseEntity<Post> {
        val currentPost = postRepository.findByIdOrNull(id) ?: return ResponseEntity.notFound().build()
        val updatedPost = currentPost.copy(
            title = currentPost.title,
            content = currentPost.content
        )

        postRepository.save(updatedPost)
        return ResponseEntity.ok(updatedPost)
    }

    @DeleteMapping("/{id}")
    fun deletePost(@PathVariable id: PostId): ResponseEntity<Unit> {
        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build()
        }

        postRepository.deleteById(id)
        return ResponseEntity.noContent().build()
    }
}