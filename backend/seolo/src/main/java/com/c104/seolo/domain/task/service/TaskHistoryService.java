package com.c104.seolo.domain.task.service;

import com.c104.seolo.domain.core.enums.CODE;
import com.c104.seolo.domain.task.dto.TaskHistoryDto;
import com.c104.seolo.domain.task.dto.response.TaskHistoryResponse;
import com.c104.seolo.domain.task.dto.response.TaskListResponse;
import com.c104.seolo.global.security.jwt.entity.CCodePrincipal;

import java.time.LocalDateTime;

public interface TaskHistoryService {
    TaskHistoryResponse getTaskHistory(Long taskId, String companyCode);
    TaskHistoryDto getLatestTaskHistoryEntityByMachineId(Long machineId);
    TaskHistoryDto getCurrentTaskHistoryByMachineIdAndUserId(Long machineId, Long userId);
    TaskHistoryDto getCurrentTaskHistoryByLockerIdAndUserIdIfNotNull(Long lockerId, Long userId);
    TaskListResponse getTaskHistoryEntityByEmployeeNum(String employeeNum);
    void enrollTaskHistory(CCodePrincipal cCodePrincipal,
                           String lockerUid,
                           Long taskTemplateId,
                           Long machineId,
                           String endTime,
                           String taskPrecaution);

    void updateTaskCode(Long taskId, CODE taskCode);
    void updateTaskCodeNull(Long taskId);
    TaskHistoryDto updateTaskEndTimeNow(Long taskId, LocalDateTime now);
    void updateTaskStartTimeNow(Long taskId, LocalDateTime now);
}
