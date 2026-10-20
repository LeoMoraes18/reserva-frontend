import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspacoApi } from '../espaco-api';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-espaco-form',
  styleUrl: './espaco-form.scss',
  templateUrl: './espaco-form.html',
})
export class EspacoForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly espacoApi = inject(EspacoApi);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly form = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(100)]],
    descricao: [''],
    capacidade: [1, [Validators.required, Validators.min(1)]],
  });

  protected readonly salvando = signal(false);
  protected readonly erroServidor = signal<string | null>(null);

  protected salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvando.set(true);
    this.erroServidor.set(null);

    this.espacoApi.cadastrar(this.form.getRawValue()).subscribe({
      next: () => {
        this.snackBar.open('Espaço cadastrado!', 'OK', { duration: 3000 });
        this.router.navigate(['/espacos'])
      },
      error: (err: HttpErrorResponse) => {
        this.salvando.set(false);
        this.erroServidor.set(err.error?.detail ?? 'Erro ao salvar o espaço.');
      },
    });
  }
}
