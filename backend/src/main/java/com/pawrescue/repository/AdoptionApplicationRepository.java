package com.pawrescue.repository;

import com.pawrescue.model.AdoptionApplication;
import com.pawrescue.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, Long> {
    List<AdoptionApplication> findByStatus(ApplicationStatus status);
    List<AdoptionApplication> findByAnimalId(Long animalId);
}
