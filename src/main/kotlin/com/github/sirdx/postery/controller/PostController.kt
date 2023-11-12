package com.github.sirdx.postery.controller

import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.repository.PostRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@RequestMapping("/api/posts")
class PostController(
    private val postRepository: PostRepository
) {

    @GetMapping
    fun getPosts() =
        postRepository.findAll().toList()

    @GetMapping("/{id}")
    fun getPost(@PathVariable id: PostId): ResponseEntity<Post> {
        val post = postRepository.findByIdOrNull(id) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(post)
    }

    @PostMapping
    fun createPost(@RequestBody post: Post): ResponseEntity<Post> {
        val savedPost = postRepository.save(post)

        return ResponseEntity.created(
            URI.create("/posts/" + savedPost.id)
        ).body(savedPost)
    }

    @PutMapping("/{id}")
    fun updatePost(@PathVariable id: PostId, @RequestBody post: Post): ResponseEntity<Post> {
        val currentPost = postRepository.findByIdOrNull(id) ?: return ResponseEntity.notFound().build()
        val updatedPost = currentPost.copy(
            title = currentPost.title,
            content = currentPost.content,
            author = currentPost.author
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