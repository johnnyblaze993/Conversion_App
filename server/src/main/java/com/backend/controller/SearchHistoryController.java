package com.backend.controller;

import java.util.List;

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

@Controller("/search-history")
public class SearchHistoryController {
    @Inject
    private SearchHistoryRepository searchHistoryRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<SearchHistory> getAllSearchHistory() {
        return (List<SearchHistory>) searchHistoryRepository.findAll();
    }

    @Get("/user/{userId}")
    public HttpResponse<List<SearchHistory>> getSearchHistoryByUserId(@PathVariable Long userId) {
        return HttpResponse.ok(searchHistoryRepository.findByUserId(userId));
    }

    @Post(consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
    public HttpResponse<SearchHistory> createSearchHistory(@Body SearchHistory searchHistory) {
        return HttpResponse.created(searchHistoryRepository.save(searchHistory));
    }
}