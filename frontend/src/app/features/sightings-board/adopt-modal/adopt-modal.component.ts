import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdoptionService } from '../../../core/services/adoption.service';
import { Animal } from '../../../core/models/animal.model';
import { HousingType, PetExperience } from '../../../core/models/adoption.model';

@Component({
  selector: 'app-adopt-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adopt-modal.component.html',
  styleUrl: './adopt-modal.component.css'
})
export class AdoptModalComponent {
  private fb = inject(FormBuilder);
  private adoptionService = inject(AdoptionService);

  @Input({ required: true }) animal!: Animal;
  @Output() closed = new EventEmitter<void>();
  @Output() submittedOk = new EventEmitter<void>();

  submitting = false;
  submitError: string | null = null;
  submitted = false;

  form = this.fb.group({
    applicantName: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: this.fb.control('', { nonNullable: true }),
    housingType: this.fb.control<HousingType>('HOUSE_FENCED_YARD', { nonNullable: true }),
    petExperience: this.fb.control<PetExperience>('BEGINNER', { nonNullable: true }),
    message: this.fb.control('', { nonNullable: true })
  });

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.submitError = null;

    this.adoptionService.apply({
      animalId: this.animal.id,
      ...this.form.getRawValue()
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.submittedOk.emit();
      },
      error: (err) => {
        this.submitting = false;
        this.submitError = err?.error?.error || 'Could not submit your application. Please try again.';
      }
    });
  }
}
