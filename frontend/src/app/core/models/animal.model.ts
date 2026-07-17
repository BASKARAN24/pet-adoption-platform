export type Species = 'DOG' | 'CAT' | 'OTHER';
export type AnimalStatus = 'SPOTTED' | 'SAFE' | 'REUNITED' | 'ADOPTED';

export interface Animal {
  id: number;
  species: Species;
  breed: string;
  colors?: string;
  size?: string;
  description?: string;
  locationDetails?: string;
  imageUrl?: string;
  status: AnimalStatus;
  contactPhone?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnimalRequest {
  species: Species;
  breed: string;
  colors?: string;
  size?: string;
  description?: string;
  locationDetails?: string;
  imageUrl?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface Stats {
  totalReports: number;
  activeSpotted: number;
  rescuedAndSafe: number;
  happyEndings: number;
}
