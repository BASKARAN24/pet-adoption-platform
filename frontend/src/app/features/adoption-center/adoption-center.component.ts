import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AdoptionService } from '../../core/services/adoption.service';
import { AdoptionApplication, ApplicationStatus } from '../../core/models/adoption.model';

@Component({
  selector: 'app-adoption-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adoption-center.component.html',
  styleUrl: './adoption-center.component.css'
})
export class AdoptionCenterComponent implements OnInit {
  applications: AdoptionApplication[] = [];
  loading = true;
  error: string | null = null;
  actioningId: number | null = null;
  filter: ApplicationStatus | 'ALL' = 'ALL';

  constructor(private adoptionService: AdoptionService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.adoptionService.getAll(this.filter === 'ALL' ? undefined : this.filter).subscribe({
      next: (apps) => {
        this.applications = apps;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.error = 'You need to log in to view adoption applications.';
        } else if (err.status === 0) {
          this.error = 'Could not reach the server. Is the backend running on localhost:8080?';
        } else {
          this.error = `Something went wrong loading applications (server returned ${err.status}). Check the backend logs for details.`;
        }
        this.loading = false;
      }
    });
  }

  setFilter(filter: ApplicationStatus | 'ALL'): void {
    this.filter = filter;
    this.load();
  }

  approve(app: AdoptionApplication): void {
    this.actioningId = app.id;
    this.adoptionService.approve(app.id).subscribe({
      next: (updated) => {
        this.applications = this.applications.map(a => (a.id === updated.id ? updated : a));
        this.actioningId = null;
      },
      error: () => (this.actioningId = null)
    });
  }

  decline(app: AdoptionApplication): void {
    this.actioningId = app.id;
    this.adoptionService.decline(app.id).subscribe({
      next: (updated) => {
        this.applications = this.applications.map(a => (a.id === updated.id ? updated : a));
        this.actioningId = null;
      },
      error: () => (this.actioningId = null)
    });
  }

  housingLabel(housing?: string): string {
    switch (housing) {
      case 'HOUSE_FENCED_YARD': return 'House (Fenced Yard)';
      case 'HOUSE_NO_YARD': return 'House (No Yard)';
      case 'APARTMENT': return 'Apartment';
      default: return 'Other';
    }
  }

  experienceLabel(exp?: string): string {
    if (!exp) return 'Not specified';
    return exp.charAt(0) + exp.slice(1).toLowerCase();
  }
}
