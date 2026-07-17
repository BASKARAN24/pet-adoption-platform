import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  mode: 'login' | 'register' = 'login';
  submitting = false;
  error: string | null = null;

  form = this.fb.group({
    username: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    email: this.fb.control('', { nonNullable: true, validators: [Validators.email] }),
    password: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
  });

  toggleMode(): void {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.error = null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = null;

    const { username, email, password } = this.form.getRawValue();
    const request$ = this.mode === 'login'
      ? this.authService.login({ username, password })
      : this.authService.register({ username, email, password });

    request$.subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/adoptions']);
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.error || 'Something went wrong. Please try again.';
      }
    });
  }
}
