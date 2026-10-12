import { Routes } from '@angular/router';
import { Clients } from './pages/clients/clients';
import { ProgrammeFidelite } from './pages/programme-fidelite/programme-fidelite';
import { CodesPromo } from './pages/codes-promo/codes-promo';
import { CartesCadeaux } from './pages/cartes-cadeaux/cartes-cadeaux';
import { Reglages } from './pages/reglages/reglages';
import { Compte } from './pages/compte/compte';

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', component: Clients },
  { path: 'fidelite', component: ProgrammeFidelite },
  { path: 'codes-promo', component: CodesPromo },
  { path: 'cartes-cadeaux', component: CartesCadeaux },
  { path: 'reglages', component: Reglages },
  { path: 'compte', component: Compte },
];
