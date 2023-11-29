package com.github.sirdx.postery.service

import com.github.sirdx.postery.dto.request.NewPostRequest
import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import com.github.sirdx.postery.model.User
import com.github.sirdx.postery.model.UserId
import com.github.sirdx.postery.repository.CommentRepository
import com.github.sirdx.postery.repository.PostRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.Instant
import kotlin.jvm.optionals.getOrNull

@Service
class PostService(
    private val postRepository: PostRepository,
    private val commentRepository: CommentRepository
) {

    fun getPost(slug: String) =
        postRepository.findBySlug(slug).getOrNull()

    fun getPostCommentsCount(id: PostId) =
        commentRepository.countAllByPostId(id)

    fun searchPosts(query: String, page: Int, size: Int): List<Post> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.search(query, paging)
        return pagePosts.content
    }

    fun getNewestPosts(page: Int, size: Int): List<Post> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.findAll(paging)
        return pagePosts.content
    }

    fun getUserPosts(userId: UserId, page: Int, size: Int): List<Post> {
        if (size > 20) { // TODO: Better way to prevent API abuse
            return listOf()
        }

        val paging = PageRequest.of(page, size, Sort.by("createdAt").descending())
        val pagePosts = postRepository.findAllByUserId(userId, paging)
        return pagePosts.content
    }

    fun createPost(user: User, newPostRequest: NewPostRequest): Post {
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

    fun updatePost(id: PostId, post: Post): Post? {
        val currentPost = postRepository.findByIdOrNull(id) ?: return null

        return postRepository.save(
            currentPost.copy(
                title = post.title,
                content = post.content,
                modifiedAt = Instant.now()
            )
        )
    }

    fun deletePost(id: PostId): Boolean {
        if (!postRepository.existsById(id)) {
            return false
        }

        postRepository.deleteById(id)
        return true
    }
}