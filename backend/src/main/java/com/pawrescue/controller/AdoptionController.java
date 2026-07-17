package com.pawrescue.controller;

import com.pawrescue.dto.AdoptionApplicationRequest;
import com.pawrescue.model.AdoptionApplication;
import com.pawrescue.model.ApplicationStatus;
import com.pawrescue.service.AdoptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoptions")
@RequiredArgsConstructor
public class AdoptionController {

    private final AdoptionService adoptionService;

    @GetMapping
    public ResponseEntity<List<AdoptionApplication>> getAll(
            @RequestParam(required = false) ApplicationStatus status) {
        if (status != null) {
            return ResponseEntity.ok(adoptionService.getByStatus(status));
        }
        return ResponseEntity.ok(adoptionService.getAll());
    }

    @PostMapping
    public ResponseEntity<AdoptionApplication> apply(@Valid @RequestBody AdoptionApplicationRequest request) {
        return ResponseEntity.ok(adoptionService.apply(request));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<AdoptionApplication> approve(@PathVariable Long id) {
        return ResponseEntity.ok(adoptionService.approve(id));
    }

    @PutMapping("/{id}/decline")
    public ResponseEntity<AdoptionApplication> decline(@PathVariable Long id) {
        return ResponseEntity.ok(adoptionService.decline(id));
    }
}
