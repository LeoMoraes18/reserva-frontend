import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaApi } from '../reserva-api';
import { ReservaRequest } from '../reserva';
import { formatDate } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { toSignal } from '@angular/core/rxjs-interop';
import { EspacoApi } from '../../espacos/espaco-api';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatButtonModule,
  ],
  selector: 'app-reserva-form',
  styleUrl: './reserva-form.scss',
  templateUrl: './reserva-form.html',
})
export class ReservaForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly reservaApi = inject(ReservaApi);
  private readonly espacoApi = inject(EspacoApi);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly form = this.fb.group({
    espacoId: ['', [Validators.required]],
    data: this.fb.control<Date | null>(null, Validators.required),
    horaInicio: this.fb.control<Date | null>(null, Validators.required),
    horaFim: this.fb.control<Date | null>(null, Validators.required),
  });

  protected readonly salvando = signal(false);
  protected readonly erroServidor = signal<string | null>(null);

  protected readonly hoje = new Date();
  protected readonly espacos = toSignal(this.espacoApi.listar(), { initialValue: [] });

  protected salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvando.set(true);
    this.erroServidor.set(null);

    const { espacoId, data, horaInicio, horaFim } = this.form.getRawValue();
    const request: ReservaRequest = {
      espacoId,
      inicio: this.paraLocalDateTime(data!, horaInicio!),
      fim: this.paraLocalDateTime(data!, horaFim!),
    };

    this.reservaApi.criar(request).subscribe({
      next: () => {
        this.snackBar.open('Reserva realizada com sucesso!', 'OK', { duration: 3000 });
        this.router.navigate(['/reservas']);
      },
      error: (err: HttpErrorResponse) => {
        this.salvando.set(false);
        this.erroServidor.set(err.error?.detail ?? 'Erro ao realizar reserva.');
      },
    });
  }

  // LocalDateTime no back: horário local sem fuso (toISOString converteria para UTC)
  private paraLocalDateTime(data: Date, hora: Date): string {
    const combinado = new Date(
      data.getFullYear(),
      data.getMonth(),
      data.getDate(),
      hora.getHours(),
      hora.getMinutes(),
    );
    return formatDate(combinado, "yyyy-MM-dd'T'HH:mm:ss", 'en-US');
  }
}
