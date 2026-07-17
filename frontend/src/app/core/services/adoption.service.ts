import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdoptionApplication, AdoptionApplicationRequest, ApplicationStatus } from '../models/adoption.model';

@Injectable({ providedIn: 'root' })
export class AdoptionService {

  private baseUrl = `${environment.apiUrl}/adoptions`;

  constructor(private http: HttpClient) {}

  getAll(status?: ApplicationStatus): Observable<AdoptionApplication[]> {
    const url = status ? `${this.baseUrl}?status=${status}` : this.baseUrl;
    return this.http.get<AdoptionApplication[]>(url);
  }

  apply(request: AdoptionApplicationRequest): Observable<AdoptionApplication> {
    return this.http.post<AdoptionApplication>(this.baseUrl, request);
  }

  approve(id: number): Observable<AdoptionApplication> {
    return this.http.put<AdoptionApplication>(`${this.baseUrl}/${id}/approve`, {});
  }

  decline(id: number): Observable<AdoptionApplication> {
    return this.http.put<AdoptionApplication>(`${this.baseUrl}/${id}/decline`, {});
  }
}
