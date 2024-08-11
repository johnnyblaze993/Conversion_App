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

@Controller("/user-preferences")
public class UserPreferenceController {
    @Inject
    private UserPreferenceRepository userPreferenceRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<UserPreference> getAllUserPreferences() {
        return (List<UserPreference>) userPreferenceRepository.findAll();
    }
}