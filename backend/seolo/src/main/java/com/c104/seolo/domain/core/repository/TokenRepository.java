package com.c104.seolo.domain.core.repository;

import com.c104.seolo.domain.core.entity.Token;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends CrudRepository<Token, String> {

    Optional<Token> findByAppUserId(Long userId);
    Optional<Token> findByTokenValue(String tokenValue);
}
