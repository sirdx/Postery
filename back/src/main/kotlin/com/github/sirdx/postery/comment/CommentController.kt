package com.github.sirdx.postery.comment

import com.github.sirdx.postery.auth.AuthService
import com.github.sirdx.postery.comment.request.NewCommentRequest
import com.github.sirdx.postery.comment.response.CommentResponse
import com.github.sirdx.postery.post.PostId
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@RequestMapping("/api/comments")
class CommentController(
    private val commentService: CommentService,
    private val authService: AuthService
) {

    @GetMapping("/{postId}")
    fun getComments(
        @PathVariable postId: PostId,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ) = commentService.getComments(postId, page, size)

    @PostMapping("/{postId}")
    fun createComment(
        @PathVariable postId: PostId,
        @RequestBody @Valid newCommentRequest: NewCommentRequest,
        authentication: Authentication
    ): ResponseEntity<CommentResponse> {
        val user = authService.getUserByAuthentication(authentication)
        val newComment = commentService.createComment(user, postId, newCommentRequest)

        return ResponseEntity.created(
            URI.create("/api/comments/$postId")
        ).body(newComment)
    }

    @DeleteMapping("/{id}")
    fun deleteComment(
        @PathVariable id: CommentId,
        authentication: Authentication
    ): ResponseEntity<Unit> {
        val user = authService.getUserByAuthentication(authentication)
        commentService.deleteComment(id, user)
        return ResponseEntity.noContent().build()
    }
}