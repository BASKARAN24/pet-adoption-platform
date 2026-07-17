package com.pawrescue.dto;

import com.pawrescue.model.AnimalStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnimalStatusUpdateRequest {
    @NotNull
    private AnimalStatus status;
}
