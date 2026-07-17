import { Animal } from './animal.model';

export type HousingType = 'HOUSE_FENCED_YARD' | 'HOUSE_NO_YARD' | 'APARTMENT' | 'OTHER';
export type PetExperience = 'NONE' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERIENCED';
export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'DECLINED';

export interface AdoptionApplication {
  id: number;
  animal: Animal;
  applicantName: string;
  email: string;
  phone?: string;
  housingType?: HousingType;
  petExperience?: PetExperience;
  message?: string;
  status: ApplicationStatus;
  appliedAt: string;
  decidedAt?: string;
}

export interface AdoptionApplicationRequest {
  animalId: number;
  applicantName: string;
  email: string;
  phone?: string;
  housingType?: HousingType;
  petExperience?: PetExperience;
  message?: string;
}
