import { Routes } from '@angular/router';
import { EspacoLista } from './espacos/espaco-lista/espaco-lista';

export const routes: Routes = [
  { path: '', redirectTo: 'espacos', pathMatch: 'full'},
  { path: 'espacos', component: EspacoLista },
  { path: 'reservas', loadComponent: () => import('./reservas/reserva-lista/reserva-lista').then((m) => m.ReservaLista) },
  { path: 'espacos/novo', loadComponent: () => import('./espacos/espaco-form/espaco-form').then((m) => m.EspacoForm) },
  { path: '**', redirectTo: 'espacos' },
];
