package com.c104.seolo.domain.core.dto.response;

import com.c104.seolo.domain.core.dto.LockerDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@ToString
@Getter
public class LockerResponse {
    private List<LockerDto> lockers;
}
