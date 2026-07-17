package com.pawrescue.controller;

import com.pawrescue.dto.AnimalRequest;
import com.pawrescue.dto.AnimalStatusUpdateRequest;
import com.pawrescue.model.Animal;
import com.pawrescue.model.AnimalStatus;
import com.pawrescue.model.Species;
import com.pawrescue.service.AnimalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animals")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    @GetMapping
    public ResponseEntity<List<Animal>> search(
            @RequestParam(required = false) Species species,
            @RequestParam(required = false) AnimalStatus status,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(animalService.search(species, status, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> getById(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Animal> report(@Valid @RequestBody AnimalRequest request) {
        return ResponseEntity.ok(animalService.report(request));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Animal> updateStatus(@PathVariable Long id,
                                                @Valid @RequestBody AnimalStatusUpdateRequest request) {
        return ResponseEntity.ok(animalService.updateStatus(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        animalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
