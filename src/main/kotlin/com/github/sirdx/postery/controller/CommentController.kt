package com.github.sirdx.postery.controller

import com.github.sirdx.postery.dto.request.NewCommentRequest
import com.github.sirdx.postery.dto.response.CommentResponse
import com.github.sirdx.postery.model.CommentId
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.repository.UserRepository
import com.github.sirdx.postery.service.CommentService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.net.URI
import kotlin.jvm.optionals.getOrNull

@RestController
@RequestMapping("/api/comments")
class CommentController(
    private val commentService: CommentService,
    private val userRepository: UserRepository
) {

    @GetMapping("/{postId}")
    fun getComments(
        @PathVariable postId: PostId,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): List<CommentResponse> {
        val comments = commentService.getComments(postId, page, size)
        return comments.map { it.toResponse() }
    }

    @PostMapping("/{postId}")
    fun createComment(
        @PathVariable postId: PostId,
        @RequestBody @Valid newCommentRequest: NewCommentRequest,
        authentication: Authentication
    ): ResponseEntity<CommentResponse> {
        val user = userRepository.findByNameOrEmail(authentication.name, authentication.name).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        val newComment = commentService.createComment(user, postId, newCommentRequest) ?:
            return ResponseEntity.badRequest().build()

        return ResponseEntity.created(
            URI.create("/api/comments/$postId")
        ).body(newComment.toResponse())
    }

    @DeleteMapping("/{id}")
    fun deleteComment(
        @PathVariable id: CommentId,
        authentication: Authentication
    ): ResponseEntity<Unit> {
        val user = userRepository.findByNameOrEmail(authentication.name, authentication.name).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        val owner = userRepository.findByCommentId(id).getOrNull() ?:
            return ResponseEntity.badRequest().build()

        if (user.id != owner.id) {
            return ResponseEntity.badRequest().build()
        }

        return if (commentService.deleteComment(id))
            ResponseEntity.noContent().build()
        else
            ResponseEntity.notFound().build()
    }
}