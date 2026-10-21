export type StatusReserva = 'CONFIRMADA' | 'CANCELADA';

export interface ReservaRequest {
  espacoId: string;
  inicio: string;
  fim: string;
}

export interface Reserva {
  id: string;
  usuarioId: string;
  usuarioNome: string;
  espacoId: string;
  espacoNome: string;
  inicio: string;
  fim: string;
  status: StatusReserva
}
