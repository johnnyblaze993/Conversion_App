package com.backend.controller;

import com.backend.entities.*;
import com.backend.repositories.*;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
// import io.micronaut.http.annotation.Post;
// import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import jakarta.inject.Inject;
import java.util.List;

@Controller("/list-comments")
public class ListCommentController {
    @Inject
    private ListCommentRepository listCommentRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<ListComment> getAllListComments() {
        return (List<ListComment>) listCommentRepository.findAll();
    }

    @Get("/list/{listId}")
    public HttpResponse<List<ListComment>> getCommentsByListId(@PathVariable Long listId) {
        return HttpResponse.ok(listCommentRepository.findByListId(listId));
    }

    @Get("/user/{userId}")
    public HttpResponse<List<ListComment>> getCommentsByUserId(@PathVariable Long userId) {
        return HttpResponse.ok(listCommentRepository.findByUserId(userId));
    }

    @Post(consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
    public HttpResponse<ListComment> createComment(@Body ListComment listComment) {
        return HttpResponse.created(listCommentRepository.save(listComment));
    }
}