import { Component, inject, OnInit, signal } from '@angular/core';
import { ReservaApi } from '../reserva-api';
import { Reserva } from '../reserva';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatTableModule, MatButtonModule, DatePipe, RouterLink],
  selector: 'app-reserva-lista',
  styleUrl: './reserva-lista.scss',
  templateUrl: './reserva-lista.html',
})
export class ReservaLista implements OnInit {
  private readonly reservaApi = inject(ReservaApi);
  protected readonly reservas = signal<Reserva[]>([]);
  protected readonly colunas = ['espaco', 'usuario', 'inicio', 'fim', 'status', 'acoes'];
  private readonly snackBar = inject(MatSnackBar);

  protected cancelar(reserva: Reserva) {
    this.reservaApi.cancelar(reserva.id).subscribe({
      next: (atualizada) => {
        this.snackBar.open('Reserva cancelada com sucesso!', 'OK', { duration: 3000 });
        this.reservas.update((lista) =>
          lista.map((r) => (r.id === atualizada.id ? atualizada : r)),
        );
      },
      error: (err: HttpErrorResponse) =>
        this.snackBar.open(err.error?.detail ?? 'Erro ao cancelar', 'Fechar', { duration: 4000 }),
    });
  }

  ngOnInit(): void {
    this.reservaApi.listar().subscribe((dados) => this.reservas.set(dados));
  }
}
