package com.backend.entities;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

@Introspected
@MappedEntity
public class UserPreference {
    @Id
    private Long userId;
    private String preferredMeasurement;

    public UserPreference() {
    }

    public UserPreference(Long userId, String preferredMeasurement) {
        this.userId = userId;
        this.preferredMeasurement = preferredMeasurement;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPreferredMeasurement() {
        return preferredMeasurement;
    }

    public void setPreferredMeasurement(String preferredMeasurement) {
        this.preferredMeasurement = preferredMeasurement;
    }

}