package com.backend.controller;

import com.backend.entities.*;
import com.backend.repositories.*;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
// import io.micronaut.http.annotation.Post;
// import io.micronaut.http.annotation.Body;

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
}