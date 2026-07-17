import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Animal, AnimalRequest, AnimalStatus, Species, Stats } from '../models/animal.model';

@Injectable({ providedIn: 'root' })
export class AnimalService {

  private baseUrl = `${environment.apiUrl}/animals`;

  constructor(private http: HttpClient) {}

  search(filters: { species?: Species | 'ALL'; status?: AnimalStatus | 'ALL'; search?: string }): Observable<Animal[]> {
    let params = new HttpParams();
    if (filters.species && filters.species !== 'ALL') params = params.set('species', filters.species);
    if (filters.status && filters.status !== 'ALL') params = params.set('status', filters.status);
    if (filters.search) params = params.set('search', filters.search);
    return this.http.get<Animal[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.baseUrl}/${id}`);
  }

  report(request: AnimalRequest): Observable<Animal> {
    return this.http.post<Animal>(this.baseUrl, request);
  }

  updateStatus(id: number, status: AnimalStatus): Observable<Animal> {
    return this.http.put<Animal>(`${this.baseUrl}/${id}/status`, { status });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getStats(): Observable<Stats> {
    return this.http.get<Stats>(`${environment.apiUrl}/stats`);
  }
}
