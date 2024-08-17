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

@Controller("/units")
public class UnitController {
    @Inject
    private UnitRepository unitRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<Unit> getAllUnits() {
        return (List<Unit>) unitRepository.findAll();
    }

    @Post(consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
    public HttpResponse<Unit> createUnit(@Body Unit unit) {
        return HttpResponse.created(unitRepository.save(unit));
    }

    @Put("/{id}")
    public HttpResponse<Unit> updateUnit(@PathVariable Long id, @Body Unit unit) {
        if (unitRepository.findById(id).isPresent()) {
            unit.setId(id);
            return HttpResponse.ok(unitRepository.update(unit));
        }
        return HttpResponse.notFound();
    }

    @Delete("/{id}")
    public HttpResponse<Void> deleteUnit(@PathVariable Long id) {
        if (unitRepository.findById(id).isPresent()) {
            unitRepository.deleteById(id);
            return HttpResponse.noContent();
        }
        return HttpResponse.notFound();
    }

}