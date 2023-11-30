package com.github.sirdx.postery.comment

import com.github.sirdx.postery.comment.request.NewCommentRequest
import com.github.sirdx.postery.comment.response.CommentResponse
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.post.PostId
import com.github.sirdx.postery.post.PostRepository
import com.github.sirdx.postery.user.UserRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class CommentServiceImpl(
    private val commentRepository: CommentRepository,
    private val postRepository: PostRepository,
    private val userRepository: UserRepository
) : CommentService {

    override fun getComments(postId: PostId, page: Int, size: Int): List<CommentResponse> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").ascending())
        val pageComments = commentRepository.findAllByPostId(postId, paging)
        return pageComments.content.map { it.toResponse() }
    }

    override fun createComment(user: User, postId: PostId, newCommentRequest: NewCommentRequest): CommentResponse {
        val post = postRepository.findById(postId).get()

        return commentRepository.save(
            Comment(
                author = user,
                post = post,
                content = newCommentRequest.content
            )
        ).toResponse()
    }

    override fun deleteComment(id: CommentId, user: User) {
        val owner = userRepository.findByCommentId(id).get()

        if (user.id != owner.id) {
            throw IllegalArgumentException("The user does not own the comment")
        }

        commentRepository.deleteById(id)
    }
}