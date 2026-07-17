import { Routes } from '@angular/router';
import { SightingsBoardComponent } from './features/sightings-board/sightings-board.component';
import { ReportStrayComponent } from './features/report-stray/report-stray.component';
import { AdoptionCenterComponent } from './features/adoption-center/adoption-center.component';
import { LoginComponent } from './features/auth/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: SightingsBoardComponent },
  { path: 'report', component: ReportStrayComponent },
  { path: 'adoptions', component: AdoptionCenterComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
