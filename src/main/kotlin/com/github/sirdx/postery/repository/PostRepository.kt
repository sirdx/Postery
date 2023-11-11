package com.github.sirdx.postery.repository

import com.github.sirdx.postery.model.Post
import com.github.sirdx.postery.model.PostId
import org.springframework.data.jpa.repository.JpaRepository

interface PostRepository : JpaRepository<Post, PostId>