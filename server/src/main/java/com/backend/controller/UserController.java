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

@Controller("/users")
public class UserController {
    @Inject
    private UserRepository userRepository;

    @Get(produces = MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Post(consumes = MediaType.APPLICATION_JSON, produces = MediaType.APPLICATION_JSON)
    public HttpResponse<User> createUser(@Body User user) {
        return HttpResponse.created(userRepository.save(user));
    }

    @Put("/{id}")
    public HttpResponse<User> updateUser(@PathVariable Long id, @Body User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            user.setId(id);
            return HttpResponse.ok(userRepository.update(user));
        }
        return HttpResponse.notFound();
    }

    @Delete("/{id}")
    public HttpResponse<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
            return HttpResponse.noContent();
        }
        return HttpResponse.notFound();
    }

    @Get("/username/{username}")
    public HttpResponse<User> getUserByUsername(@PathVariable String username) {
        return HttpResponse.ok(userRepository.findByUsername(username));
    }

    @Get("/email/{email}")
    public HttpResponse<User> getUserByEmail(@PathVariable String email) {
        return HttpResponse.ok(userRepository.findByEmail(email));
    }
}