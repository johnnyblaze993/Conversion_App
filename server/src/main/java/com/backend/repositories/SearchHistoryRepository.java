package com.backend.repositories;

import java.util.List;

import com.backend.entities.SearchHistory;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface SearchHistoryRepository extends CrudRepository<SearchHistory, Long> {
    List<SearchHistory> findByUserId(Long userId);
}
