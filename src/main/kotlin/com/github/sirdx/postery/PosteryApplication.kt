package com.github.sirdx.postery

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PosteryApplication

fun main(args: Array<String>) {
	runApplication<PosteryApplication>(*args)
}
