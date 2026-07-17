package com.pawrescue.service;

import com.pawrescue.dto.AdoptionApplicationRequest;
import com.pawrescue.exception.BadRequestException;
import com.pawrescue.exception.ResourceNotFoundException;
import com.pawrescue.model.*;
import com.pawrescue.repository.AdoptionApplicationRepository;
import com.pawrescue.repository.AnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdoptionService {

    private final AdoptionApplicationRepository applicationRepository;
    private final AnimalRepository animalRepository;

    public List<AdoptionApplication> getAll() {
        return applicationRepository.findAll();
    }

    public List<AdoptionApplication> getByStatus(ApplicationStatus status) {
        return applicationRepository.findByStatus(status);
    }

    public AdoptionApplication getById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
    }

    @Transactional
    public AdoptionApplication apply(AdoptionApplicationRequest request) {
        Animal animal = animalRepository.findById(request.getAnimalId())
                .orElseThrow(() -> new ResourceNotFoundException("Animal not found with id: " + request.getAnimalId()));

        if (animal.getStatus() == AnimalStatus.ADOPTED) {
            throw new BadRequestException("This animal has already been adopted");
        }

        AdoptionApplication application = AdoptionApplication.builder()
                .animal(animal)
                .applicantName(request.getApplicantName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .housingType(request.getHousingType())
                .petExperience(request.getPetExperience())
                .message(request.getMessage())
                .status(ApplicationStatus.PENDING)
                .build();

        return applicationRepository.save(application);
    }

    @Transactional
    public AdoptionApplication approve(Long id) {
        AdoptionApplication application = getById(id);
        application.setStatus(ApplicationStatus.APPROVED);
        application.setDecidedAt(LocalDateTime.now());
        applicationRepository.save(application);

        // Approving an application automatically transitions the animal's status to ADOPTED
        Animal animal = application.getAnimal();
        animal.setStatus(AnimalStatus.ADOPTED);
        animalRepository.save(animal);

        return application;
    }

    @Transactional
    public AdoptionApplication decline(Long id) {
        AdoptionApplication application = getById(id);
        application.setStatus(ApplicationStatus.DECLINED);
        application.setDecidedAt(LocalDateTime.now());
        return applicationRepository.save(application);
    }
}
