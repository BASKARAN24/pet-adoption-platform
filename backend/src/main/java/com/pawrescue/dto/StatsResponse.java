package com.pawrescue.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatsResponse {
    private long totalReports;
    private long activeSpotted;
    private long rescuedAndSafe;
    private long happyEndings; // reunited + adopted
}
