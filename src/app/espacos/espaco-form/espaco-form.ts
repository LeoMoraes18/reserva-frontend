import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspacoApi } from '../espaco-api';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-espaco-form',
  styleUrl: './espaco-form.scss',
  templateUrl: './espaco-form.html',
})
export class EspacoForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly espacoApi = inject(EspacoApi);
  private readonly router = inject(Router);

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
      next: () => this.router.navigate(['/espacos']),
      error: (err: HttpErrorResponse) => {
        this.salvando.set(false);
        this.erroServidor.set(err.error?.detail ?? 'Erro ao salvar o espaço.');
      },
    });
  }
}
