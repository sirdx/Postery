package com.github.sirdx.postery.util

fun String.toSlug() = lowercase()
    .replace("\n", " ")
    .replace("[^a-z\\d\\s]".toRegex(), " ")
    .split("\\s+".toRegex())
    .joinToString("-")
    .replace("-+".toRegex(), "-")
    .trim('-')
