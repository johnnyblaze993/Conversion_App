package com.backend.repositories;

import com.backend.entities.UserPreference;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface UserPreferenceRepository extends CrudRepository<UserPreference, Long> {
    UserPreference findByUserId(Long userId);
}
