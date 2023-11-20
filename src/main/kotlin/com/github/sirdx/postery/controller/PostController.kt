package com.github.sirdx.postery.controller

import com.github.sirdx.postery.dto.request.NewPostRequest
import com.github.sirdx.postery.dto.response.PostResponse
import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.repository.PostRepository
import com.github.sirdx.postery.repository.UserRepository
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
        postRepository.findAll().map { post ->
            PostResponse(
                id = post.id,
                authorId = post.author.id,
                title = post.title,
                content = post.content,
                createdAt = post.createdAt,
                slug = post.slug
            )
        }

    @GetMapping("/{id}")
    fun getPost(@PathVariable id: PostId): ResponseEntity<Post> {
        val post = postRepository.findByIdOrNull(id) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(post)
    }

    @PostMapping
    fun createPost(@RequestBody post: NewPostRequest, authentication: Authentication): ResponseEntity<PostResponse> {
        val user = userRepository.findByNameOrEmail(authentication.name, authentication.name).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        val savedPost = postRepository.save(Post(
            author = user,
            title = post.title,
            content = post.content
        ))

        val response = PostResponse(
            id = savedPost.id,
            authorId = user.id,
            title = savedPost.title,
            content = savedPost.content,
            createdAt = savedPost.createdAt,
            slug = savedPost.slug
        )

        return ResponseEntity.created(
            URI.create("/api/posts/" + savedPost.id)
        ).body(response)
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