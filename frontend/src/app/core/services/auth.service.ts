import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

const TOKEN_KEY = 'pawrescue_token';
const USERNAME_KEY = 'pawrescue_username';
const ROLE_KEY = 'pawrescue_role';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isLoggedIn = signal<boolean>(!!localStorage.getItem(TOKEN_KEY));
  username = signal<string | null>(localStorage.getItem(USERNAME_KEY));
  role = signal<string | null>(localStorage.getItem(ROLE_KEY));

  isAdmin = computed(() => this.role() === 'ADMIN');

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, request).pipe(
      tap(res => this.storeSession(res))
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, request).pipe(
      tap(res => this.storeSession(res))
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ROLE_KEY);
    this.isLoggedIn.set(false);
    this.username.set(null);
    this.role.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private storeSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USERNAME_KEY, res.username);
    localStorage.setItem(ROLE_KEY, res.role);
    this.isLoggedIn.set(true);
    this.username.set(res.username);
    this.role.set(res.role);
  }
}
