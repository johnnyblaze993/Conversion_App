package com.backend.controller;

import com.backend.entities.*;
import com.backend.repositories.*;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
// import io.micronaut.http.annotation.Post;
// import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;

@Controller("/conversion-lists")
public class ConversionListController {
    @Inject
    private ConversionListRepository conversionListRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<ConversionList> getAllConversionLists() {
        return (List<ConversionList>) conversionListRepository.findAll();
    }

    @Get("/user/{userId}")
    public HttpResponse<List<ConversionList>> getConversionListsByUserId(@PathVariable Long userId) {
        return HttpResponse.ok(conversionListRepository.findByUserId(userId));
    }

    @Post(consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
    public HttpResponse<ConversionList> createConversionList(@Body ConversionList conversionList) {
        return HttpResponse.created(conversionListRepository.save(conversionList));
    }

    @Put("/{id}/favorite")
    public HttpResponse<ConversionList> updateFavoriteStatus(@PathVariable Long id,
            @Body ConversionList conversionList) {
        Optional<ConversionList> existingList = conversionListRepository.findById(id);
        if (existingList.isPresent()) {
            ConversionList updatedList = existingList.get();
            updatedList.setFavorite(conversionList.getFavorite());
            return HttpResponse.ok(conversionListRepository.update(updatedList));
        }
        return HttpResponse.notFound();
    }

    @Delete("/{id}")
    public HttpResponse<Void> deleteConversionList(@PathVariable Long id) {
        Optional<ConversionList> existingList = conversionListRepository.findById(id);
        if (existingList.isPresent()) {
            conversionListRepository.deleteById(id);
            return HttpResponse.noContent();
        }
        return HttpResponse.notFound();
    }

}