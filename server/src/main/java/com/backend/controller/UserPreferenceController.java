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
import java.util.Optional;

@Controller("/user-preferences")
public class UserPreferenceController {
    @Inject
    private UserPreferenceRepository userPreferenceRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<UserPreference> getAllUserPreferences() {
        return (List<UserPreference>) userPreferenceRepository.findAll();
    }

    @Get("/user/{userId}")
    public HttpResponse<UserPreference> getUserPreferenceByUserId(@PathVariable Long userId) {
        return HttpResponse.ok(userPreferenceRepository.findByUserId(userId));
    }

    @Post(consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
    public HttpResponse<UserPreference> createOrUpdateUserPreference(@Body UserPreference userPreference) {
        // Check if the user already has a preference
        Optional<UserPreference> existingPreference = Optional
                .ofNullable(userPreferenceRepository.findByUserId(userPreference.getUserId()));
        if (existingPreference.isPresent()) {
            // Update existing preference
            UserPreference preferenceToUpdate = existingPreference.get();
            preferenceToUpdate.setPreferredMeasurement(userPreference.getPreferredMeasurement());
            return HttpResponse.ok(userPreferenceRepository.update(preferenceToUpdate));
        } else {
            // Create new preference
            return HttpResponse.created(userPreferenceRepository.save(userPreference));
        }
    }
}