import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva, ReservaRequest } from './reserva';

// TEMPORÁRIO: remover na Fase 6 (o usuário virá do JWT)
const USUARIO_TEMPORARIO_ID = '22222222-2222-2222-2222-222222222222';

@Service()
export class ReservaApi {
  private readonly http = inject(HttpClient);

  listar(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('/api/reservas');
  }

  criar(request: ReservaRequest): Observable<Reserva> {
    return this.http.post<Reserva>('/api/reservas',
      { ...request, usuarioId: USUARIO_TEMPORARIO_ID}
    );
  }

  cancelar(id: string): Observable<Reserva> {
    return this.http.patch<Reserva>(`/api/reservas/${id}/cancelar`, null);
  }

}
