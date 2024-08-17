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

@Controller("/conversions")
public class ConversionController {
    @Inject
    private ConversionRepository conversionRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<Conversion> getAllConversions() {
        return (List<Conversion>) conversionRepository.findAll();
    }

    @Get("/list/{listId}")
    public HttpResponse<List<Conversion>> getConversionsByListId(@PathVariable Long listId) {
        return HttpResponse.ok(conversionRepository.findByListId(listId));
    }

    @Get("/user/{userId}")
    public HttpResponse<List<Conversion>> getConversionsByUserId(@PathVariable Long userId) {
        return HttpResponse.ok(conversionRepository.findByUserId(userId));
    }

    @Post(consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
    public HttpResponse<Conversion> createConversion(@Body Conversion conversion) {
        return HttpResponse.created(conversionRepository.save(conversion));
    }
}
