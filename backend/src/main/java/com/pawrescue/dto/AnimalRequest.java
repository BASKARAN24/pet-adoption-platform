package com.pawrescue.dto;

import com.pawrescue.model.Species;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnimalRequest {
    @NotNull
    private Species species;

    @NotBlank
    private String breed;

    private String colors;
    private String size;
    private String description;
    private String locationDetails;
    private String imageUrl;
    private String contactPhone;
    private String contactEmail;
}
