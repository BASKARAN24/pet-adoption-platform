import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnimalService } from '../../core/services/animal.service';
import { AuthService } from '../../core/services/auth.service';
import { Animal, AnimalStatus, Species, Stats } from '../../core/models/animal.model';
import { StatsCardsComponent } from '../../shared/components/stats-cards/stats-cards.component';
import { AdoptModalComponent } from './adopt-modal/adopt-modal.component';

type SpeciesFilter = Species | 'ALL';
type StatusFilter = AnimalStatus | 'ALL';

@Component({
  selector: 'app-sightings-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, StatsCardsComponent, AdoptModalComponent],
  templateUrl: './sightings-board.component.html',
  styleUrl: './sightings-board.component.css'
})
export class SightingsBoardComponent implements OnInit {
  stats: Stats | null = null;
  animals: Animal[] = [];
  loading = true;
  error: string | null = null;

  searchTerm = '';
  speciesFilter: SpeciesFilter = 'ALL';
  statusFilter: StatusFilter = 'ALL';

  adoptingAnimal: Animal | null = null;
  updatingStatusId: number | null = null;

  allStatuses: AnimalStatus[] = ['SPOTTED', 'SAFE', 'REUNITED', 'ADOPTED'];

  constructor(private animalService: AnimalService, public authService: AuthService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadAnimals();
  }

  loadStats(): void {
    this.animalService.getStats().subscribe({
      next: (stats) => (this.stats = stats),
      error: () => {}
    });
  }

  loadAnimals(): void {
    this.loading = true;
    this.error = null;
    this.animalService
      .search({ species: this.speciesFilter, status: this.statusFilter, search: this.searchTerm })
      .subscribe({
        next: (animals) => {
          this.animals = animals;
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load sightings. Is the backend running?';
          this.loading = false;
        }
      });
  }

  onSearchChange(): void {
    this.loadAnimals();
  }

  setSpeciesFilter(species: SpeciesFilter): void {
    this.speciesFilter = species;
    this.loadAnimals();
  }

  setStatusFilter(status: StatusFilter): void {
    this.statusFilter = status;
    this.loadAnimals();
  }

  badgeClass(status: AnimalStatus): string {
    switch (status) {
      case 'SPOTTED': return 'badge-spotted';
      case 'SAFE': return 'badge-safe';
      case 'REUNITED': return 'badge-reunited';
      case 'ADOPTED': return 'badge-adopted';
    }
  }

  speciesEmoji(species: Species): string {
    switch (species) {
      case 'DOG': return '🐕';
      case 'CAT': return '🐈';
      default: return '🐾';
    }
  }

  statusLabel(status: AnimalStatus): string {
    return status.charAt(0) + status.slice(1).toLowerCase();
  }

  canAdopt(animal: Animal): boolean {
    return animal.status !== 'ADOPTED';
  }

  changeStatus(animal: Animal, status: AnimalStatus): void {
    if (status === animal.status) return;
    this.updatingStatusId = animal.id;
    this.animalService.updateStatus(animal.id, status).subscribe({
      next: (updated) => {
        this.animals = this.animals.map(a => (a.id === updated.id ? updated : a));
        this.updatingStatusId = null;
        this.loadStats();
      },
      error: () => {
        this.updatingStatusId = null;
      }
    });
  }

  openAdoptModal(animal: Animal): void {
    this.adoptingAnimal = animal;
  }

  closeAdoptModal(): void {
    this.adoptingAnimal = null;
  }

  onAdoptionSubmitted(): void {
    // Application is pending review; nothing to refresh yet since the
    // animal only flips to ADOPTED once the application is approved.
  }
}
