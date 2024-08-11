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

@Controller("/conversion-lists")
public class ConversionListController {
    @Inject
    private ConversionListRepository conversionListRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<ConversionList> getAllConversionLists() {
        return (List<ConversionList>) conversionListRepository.findAll();
    }
}