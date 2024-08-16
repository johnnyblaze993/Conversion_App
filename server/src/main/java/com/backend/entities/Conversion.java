package com.backend.entities;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

@Introspected
@MappedEntity("conversions")
public class Conversion {
    @Id
    private Long id;
    private Long userId;
    private String ingredient;
    private java.math.BigDecimal originalMeasurement;
    private Long originalUnitId;
    private java.math.BigDecimal convertedMeasurement;
    private Long convertedUnitId;
    private java.sql.Timestamp timestamp;
    private Long listId;

    public Conversion() {
    }

    public Conversion(Long id, Long userId, String ingredient, java.math.BigDecimal originalMeasurement,
            Long originalUnitId, java.math.BigDecimal convertedMeasurement, Long convertedUnitId,
            java.sql.Timestamp timestamp, Long listId) {
        this.id = id;
        this.userId = userId;
        this.ingredient = ingredient;
        this.originalMeasurement = originalMeasurement;
        this.originalUnitId = originalUnitId;
        this.convertedMeasurement = convertedMeasurement;
        this.convertedUnitId = convertedUnitId;
        this.timestamp = timestamp;
        this.listId = listId;
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

    public String getIngredient() {
        return ingredient;
    }

    public void setIngredient(String ingredient) {
        this.ingredient = ingredient;
    }

    public java.math.BigDecimal getOriginalMeasurement() {
        return originalMeasurement;
    }

    public void setOriginalMeasurement(java.math.BigDecimal originalMeasurement) {
        this.originalMeasurement = originalMeasurement;
    }

    public Long getOriginalUnitId() {
        return originalUnitId;
    }

    public void setOriginalUnitId(Long originalUnitId) {
        this.originalUnitId = originalUnitId;
    }

    public java.math.BigDecimal getConvertedMeasurement() {
        return convertedMeasurement;
    }

    public void setConvertedMeasurement(java.math.BigDecimal convertedMeasurement) {
        this.convertedMeasurement = convertedMeasurement;
    }

    public Long getConvertedUnitId() {
        return convertedUnitId;
    }

    public void setConvertedUnitId(Long convertedUnitId) {
        this.convertedUnitId = convertedUnitId;
    }

    public java.sql.Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(java.sql.Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Long getListId() {
        return listId;
    }

    public void setListId(Long listId) {
        this.listId = listId;
    }

    // Getters and setters...
}