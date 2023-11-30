package com.github.sirdx.postery.post

import com.github.sirdx.postery.post.request.NewPostRequest
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.user.UserId
import com.github.sirdx.postery.comment.CommentRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.Instant
import kotlin.jvm.optionals.getOrNull

@Service
class PostServiceImpl(
    private val postRepository: PostRepository,
    private val commentRepository: CommentRepository
) : PostService {

    override fun getPost(slug: String) =
        postRepository.findBySlug(slug).getOrNull()

    override fun getPostCommentsCount(id: PostId) =
        commentRepository.countAllByPostId(id)

    override fun searchPosts(query: String, page: Int, size: Int): List<Post> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.search(query, paging)
        return pagePosts.content
    }

    override fun getNewestPosts(page: Int, size: Int): List<Post> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.findAll(paging)
        return pagePosts.content
    }

    override fun getUserPosts(userId: UserId, page: Int, size: Int): List<Post> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.findAllByUserId(userId, paging)
        return pagePosts.content
    }

    override fun createPost(user: User, newPostRequest: NewPostRequest): Post {
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
        )
    }

    override fun updatePost(id: PostId, newPostRequest: NewPostRequest): Post? {
        val currentPost = postRepository.findByIdOrNull(id) ?: return null

        return postRepository.save(
            currentPost.copy(
                title = newPostRequest.title,
                content = newPostRequest.content,
                modifiedAt = Instant.now()
            )
        )
    }

    override fun deletePost(id: PostId): Boolean {
        if (!postRepository.existsById(id)) {
            return false
        }

        postRepository.deleteById(id)
        return true
    }
}