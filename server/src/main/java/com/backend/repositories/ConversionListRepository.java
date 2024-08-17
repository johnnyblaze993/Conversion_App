package com.backend.repositories;

import java.util.List;

import com.backend.entities.ConversionList;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface ConversionListRepository extends CrudRepository<ConversionList, Long> {
    List<ConversionList> findByUserId(Long userId);
}
