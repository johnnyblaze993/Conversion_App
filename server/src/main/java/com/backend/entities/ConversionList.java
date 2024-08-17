package com.backend.entities;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

@Introspected
@MappedEntity("conversion_lists")
public class ConversionList {

    @Id
    @GeneratedValue
    private Long id;
    private Long userId;
    private String name;
    private Boolean favorite;
    private java.sql.Timestamp createdAt;

    public ConversionList() {
    }

    public ConversionList(Long id, Long userId, String name, Boolean favorite, java.sql.Timestamp createdAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.favorite = favorite;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public java.sql.Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.sql.Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    // Getters and setters...
}
