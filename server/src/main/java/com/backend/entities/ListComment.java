package com.backend.entities;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;

@Introspected
@MappedEntity("list_comments")
public class ListComment {
    @Id
    private Long id;
    private Long listId;
    private Long userId;
    private String comment;
    private java.sql.Timestamp createdAt;

    public ListComment() {
    }

    public ListComment(Long id, Long listId, Long userId, String comment, java.sql.Timestamp createdAt) {
        this.id = id;
        this.listId = listId;
        this.userId = userId;
        this.comment = comment;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getListId() {
        return listId;
    }

    public void setListId(Long listId) {
        this.listId = listId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public java.sql.Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.sql.Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    // Getters and setters...
}