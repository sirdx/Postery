package com.github.sirdx.postery.post

import com.github.sirdx.postery.post.request.NewPostRequest
import com.github.sirdx.postery.user.User
import com.github.sirdx.postery.user.UserId

interface PostService {

    fun getPost(slug: String): Post?

    fun getPostCommentsCount(id: PostId): Int

    fun searchPosts(query: String, page: Int, size: Int): List<Post>

    fun getNewestPosts(page: Int, size: Int): List<Post>

    fun getUserPosts(userId: UserId, page: Int, size: Int): List<Post>

    fun createPost(user: User, newPostRequest: NewPostRequest): Post

    fun updatePost(id: PostId, newPostRequest: NewPostRequest): Post?

    fun deletePost(id: PostId): Boolean
}