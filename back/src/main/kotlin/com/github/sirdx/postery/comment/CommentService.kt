package com.github.sirdx.postery.comment

import com.github.sirdx.postery.comment.request.NewCommentRequest
import com.github.sirdx.postery.comment.response.CommentResponse
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.post.PostId

interface CommentService {

    fun getComments(postId: PostId, page: Int, size: Int): List<CommentResponse>

    fun createComment(user: User, postId: PostId, newCommentRequest: NewCommentRequest): CommentResponse

    fun deleteComment(id: CommentId, user: User)
}