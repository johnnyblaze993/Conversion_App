package com.backend.repositories;

import java.util.List;

import com.backend.entities.*;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface ListCommentRepository extends CrudRepository<ListComment, Long> {
    List<ListComment> findByListId(Long listId);

    List<ListComment> findByUserId(Long userId);
}
