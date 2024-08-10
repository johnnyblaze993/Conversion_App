package com.backend.controller;

import java.util.List;

import com.backend.entities.*;
import com.backend.repositories.*;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
// import io.micronaut.http.annotation.Post;
// import io.micronaut.http.annotation.Body;

import jakarta.inject.Inject;
// import java.util.List;

@Controller("/search-history")
public class SearchHistoryController {
    @Inject
    private SearchHistoryRepository searchHistoryRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<SearchHistory> getAllSearchHistory() {
        return (List<SearchHistory>) searchHistoryRepository.findAll();
    }
}