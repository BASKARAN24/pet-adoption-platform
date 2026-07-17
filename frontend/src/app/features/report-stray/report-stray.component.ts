import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalService } from '../../core/services/animal.service';
import { Species } from '../../core/models/animal.model';

@Component({
  selector: 'app-report-stray',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report-stray.component.html',
  styleUrl: './report-stray.component.css'
})
export class ReportStrayComponent {
  private fb = inject(FormBuilder);
  private animalService = inject(AnimalService);
  private router = inject(Router);

  submitting = false;
  submitError: string | null = null;
  submitted = false;

  form = this.fb.group({
    species: this.fb.control<Species>('DOG', { nonNullable: true }),
    breed: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    colors: this.fb.control('', { nonNullable: true }),
    size: this.fb.control('Medium', { nonNullable: true }),
    locationDetails: this.fb.control('', { nonNullable: true }),
    description: this.fb.control('', { nonNullable: true }),
    imageUrl: this.fb.control('', { nonNullable: true }),
    contactPhone: this.fb.control('', { nonNullable: true }),
    contactEmail: this.fb.control('', { nonNullable: true, validators: [Validators.email] })
  });

  selectSpecies(species: Species): void {
    this.form.controls.species.setValue(species);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.submitError = null;

    this.animalService.report(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        setTimeout(() => this.router.navigate(['/']), 1200);
      },
      error: () => {
        this.submitting = false;
        this.submitError = 'Could not submit the report. Please try again.';
      }
    });
  }
}
