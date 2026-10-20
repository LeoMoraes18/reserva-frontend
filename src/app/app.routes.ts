import { Routes } from '@angular/router';
import { EspacoLista } from './espacos/espaco-lista/espaco-lista';
import { ReservaLista } from './reservas/reserva-lista/reserva-lista';

export const routes: Routes = [
  { path: '', redirectTo: 'espacos', pathMatch: 'full'},
  { path: 'espacos', component: EspacoLista },
  { path: 'reservas', component: ReservaLista },
  { path: '**', redirectTo: 'espacos' },
];
