package com.github.sirdx.postery.post

import com.github.sirdx.postery.post.request.NewPostRequest
import com.github.sirdx.postery.post.response.PostResponse
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.user.UserId

interface PostService {

    fun getPostBySlug(slug: String): PostResponse?

    fun getPostCommentsCount(id: PostId): Int

    fun searchPosts(query: String, page: Int, size: Int): List<PostResponse>

    fun getNewestPosts(page: Int, size: Int): List<PostResponse>

    fun getUserPosts(userId: UserId, page: Int, size: Int): List<PostResponse>

    fun createPost(user: User, newPostRequest: NewPostRequest): PostResponse

    fun updatePost(id: PostId, user: User, newPostRequest: NewPostRequest): PostResponse

    fun deletePost(id: PostId, user: User)
}