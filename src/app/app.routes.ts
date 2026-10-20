import { Routes } from '@angular/router';
import { EspacoLista } from './espacos/espaco-lista/espaco-lista';
import { ReservaLista } from './reservas/reserva-lista/reserva-lista';
import { EspacoForm } from './espacos/espaco-form/espaco-form';

export const routes: Routes = [
  { path: '', redirectTo: 'espacos', pathMatch: 'full'},
  { path: 'espacos', component: EspacoLista },
  { path: 'reservas', component: ReservaLista },
  { path: 'espacos/novo', component: EspacoForm},
  { path: '**', redirectTo: 'espacos' },
];
