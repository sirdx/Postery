package com.github.sirdx.postery.service

import com.github.sirdx.postery.dto.request.NewCommentRequest
import com.github.sirdx.postery.model.Comment
import com.github.sirdx.postery.model.CommentId
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.model.User
import com.github.sirdx.postery.repository.CommentRepository
import com.github.sirdx.postery.repository.PostRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class CommentService(
    private val commentRepository: CommentRepository,
    private val postRepository: PostRepository
) {

    fun getComments(postId: PostId, page: Int, size: Int): List<Comment> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").ascending())
        val pageComments = commentRepository.findAllByPostId(postId, paging)
        return pageComments.content
    }

    fun createComment(user: User, postId: PostId, newCommentRequest: NewCommentRequest): Comment? {
        val post = postRepository.findById(postId).getOrNull() ?:
            return null

        return commentRepository.save(Comment(
            author = user,
            post = post,
            content = newCommentRequest.content
        ))
    }

    fun deleteComment(id: CommentId): Boolean {
        if (!commentRepository.existsById(id)) {
            return false
        }

        commentRepository.deleteById(id)
        return true
    }
}