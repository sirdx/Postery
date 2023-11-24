package com.github.sirdx.postery.config

import com.github.sirdx.postery.util.ErrorDetails
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ValidationExceptionHandler {

    companion object {
        private const val VALIDATION_ERROR = "Validation Error"
    }

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handle(exception: MethodArgumentNotValidException): ResponseEntity<ErrorDetails> {
        var message = "Validation failed"

        if (exception.errorCount > 0) {
            exception.bindingResult.allErrors[0].defaultMessage?.let {
                message = it
            }
        }

        val error = ErrorDetails(VALIDATION_ERROR, message)
        return ResponseEntity(error, null, HttpStatus.BAD_REQUEST)
    }
}