package com.pawrescue.repository;

import com.pawrescue.model.Animal;
import com.pawrescue.model.AnimalStatus;
import com.pawrescue.model.Species;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> findByStatus(AnimalStatus status);

    List<Animal> findBySpecies(Species species);

    long countByStatus(AnimalStatus status);

    @Query("""
        SELECT a FROM Animal a
        WHERE (:species IS NULL OR a.species = :species)
        AND (:status IS NULL OR a.status = :status)
        AND (:search IS NULL OR LOWER(a.breed) LIKE LOWER(CONCAT('%', :search, '%'))
             OR LOWER(a.colors) LIKE LOWER(CONCAT('%', :search, '%'))
             OR LOWER(a.locationDetails) LIKE LOWER(CONCAT('%', :search, '%')))
        ORDER BY a.createdAt DESC
        """)
    List<Animal> search(@Param("species") Species species,
                         @Param("status") AnimalStatus status,
                         @Param("search") String search);
}
