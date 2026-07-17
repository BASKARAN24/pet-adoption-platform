package com.pawrescue.service;

import com.pawrescue.dto.AnimalRequest;
import com.pawrescue.dto.AnimalStatusUpdateRequest;
import com.pawrescue.dto.StatsResponse;
import com.pawrescue.exception.ResourceNotFoundException;
import com.pawrescue.model.Animal;
import com.pawrescue.model.AnimalStatus;
import com.pawrescue.model.Species;
import com.pawrescue.repository.AnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    public List<Animal> search(Species species, AnimalStatus status, String searchTerm) {
        return animalRepository.search(species, status, searchTerm);
    }

    public Animal getById(Long id) {
        return animalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + id));
    }

    public Animal report(AnimalRequest request) {
        Animal animal = Animal.builder()
                .species(request.getSpecies())
                .breed(request.getBreed())
                .colors(request.getColors())
                .size(request.getSize())
                .description(request.getDescription())
                .locationDetails(request.getLocationDetails())
                .imageUrl(request.getImageUrl())
                .contactPhone(request.getContactPhone())
                .contactEmail(request.getContactEmail())
                .status(AnimalStatus.SPOTTED)
                .build();

        return animalRepository.save(animal);
    }

    public Animal updateStatus(Long id, AnimalStatusUpdateRequest request) {
        Animal animal = getById(id);
        animal.setStatus(request.getStatus());
        return animalRepository.save(animal);
    }

    public void delete(Long id) {
        if (!animalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Animal not found with id: " + id);
        }
        animalRepository.deleteById(id);
    }

    public StatsResponse getStats() {
        long total = animalRepository.count();
        long spotted = animalRepository.countByStatus(AnimalStatus.SPOTTED);
        long safe = animalRepository.countByStatus(AnimalStatus.SAFE);
        long reunited = animalRepository.countByStatus(AnimalStatus.REUNITED);
        long adopted = animalRepository.countByStatus(AnimalStatus.ADOPTED);
        return new StatsResponse(total, spotted, safe, reunited + adopted);
    }
}
