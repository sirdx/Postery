package com.github.sirdx.postery.comment

import com.github.sirdx.postery.comment.request.NewCommentRequest
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.post.PostId
import com.github.sirdx.postery.post.PostRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class CommentServiceImpl(
    private val commentRepository: CommentRepository,
    private val postRepository: PostRepository
) : CommentService {

    override fun getComments(postId: PostId, page: Int, size: Int): List<Comment> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").ascending())
        val pageComments = commentRepository.findAllByPostId(postId, paging)
        return pageComments.content
    }

    override fun createComment(user: User, postId: PostId, newCommentRequest: NewCommentRequest): Comment? {
        val post = postRepository.findById(postId).getOrNull() ?:
            return null

        return commentRepository.save(
            Comment(
            author = user,
            post = post,
            content = newCommentRequest.content
        )
        )
    }

    override fun deleteComment(id: CommentId): Boolean {
        if (!commentRepository.existsById(id)) {
            return false
        }

        commentRepository.deleteById(id)
        return true
    }
}