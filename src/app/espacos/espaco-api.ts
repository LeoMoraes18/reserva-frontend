import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Espaco, EspacoRequest } from './espaco';

@Service()
export class EspacoApi {
  private readonly http = inject(HttpClient);

  listar(): Observable<Espaco[]> {
    return this.http.get<Espaco[]>('/api/espacos');
  }

  cadastrar(request: EspacoRequest): Observable<Espaco> {
    return this.http.post<Espaco>('/api/espacos', request)
  }
}
