package com.github.sirdx.postery.post

import com.github.sirdx.postery.post.request.NewPostRequest
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.user.UserId
import com.github.sirdx.postery.comment.CommentRepository
import com.github.sirdx.postery.post.response.PostResponse
import com.github.sirdx.postery.user.UserRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class PostServiceImpl(
    private val postRepository: PostRepository,
    private val commentRepository: CommentRepository,
    private val userRepository: UserRepository
) : PostService {

    override fun getPostBySlug(slug: String): PostResponse {
        val post = postRepository.findBySlug(slug).get()
        return post.toResponse(getPostCommentsCount(post.id))
    }

    override fun getPostCommentsCount(id: PostId) =
        commentRepository.countAllByPostId(id)

    override fun searchPosts(query: String, page: Int, size: Int): List<PostResponse> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.search(query, paging)
        return pagePosts.content.map { it.toResponse(getPostCommentsCount(it.id)) }
    }

    override fun getNewestPosts(page: Int, size: Int): List<PostResponse> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.findAll(paging)
        return pagePosts.content.map { it.toResponse(getPostCommentsCount(it.id)) }
    }

    override fun getUserPosts(userId: UserId, page: Int, size: Int): List<PostResponse> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.findAllByUserId(userId, paging)
        return pagePosts.content.map { it.toResponse(getPostCommentsCount(it.id)) }
    }

    override fun createPost(user: User, newPostRequest: NewPostRequest): PostResponse {
        val savedPost = postRepository.save(
            Post(
                author = user,
                title = newPostRequest.title,
                content = newPostRequest.content
            )
        )

        return postRepository.save(
            savedPost.copy(
                slug = "${savedPost.slug}-${savedPost.id}"
            )
        ).toResponse()
    }

    override fun updatePost(id: PostId, user: User, newPostRequest: NewPostRequest): PostResponse {
        val owner = userRepository.findByPostId(id).get()

        if (user.id != owner.id) {
            throw IllegalArgumentException("The user does not own the post")
        }

        val currentPost = postRepository.findById(id).get()

        return postRepository.save(
            currentPost.copy(
                title = newPostRequest.title,
                content = newPostRequest.content,
                modifiedAt = Instant.now()
            )
        ).toResponse(getPostCommentsCount(id))
    }

    override fun deletePost(id: PostId, user: User) {
        val owner = userRepository.findByPostId(id).get()

        if (user.id != owner.id) {
            throw IllegalArgumentException("The user does not own the post")
        }

        postRepository.deleteById(id)
    }
}