import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Espaco } from '../espaco';
import { EspacoCard } from '../espaco-card/espaco-card';
import { EspacoApi } from '../espaco-api';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [EspacoCard, RouterLink, MatButtonModule],
  selector: 'app-espaco-lista',
  styleUrl: './espaco-lista.scss',
  templateUrl: './espaco-lista.html',
})
export class EspacoLista implements OnInit {

  private readonly espacoApi = inject(EspacoApi);

  protected readonly espacos = signal<Espaco[]>([]);

  protected readonly somenteGrandes = signal(false);

  protected readonly visiveis = computed(() =>
    this.somenteGrandes() ?
    this.espacos()
    .filter((e) => e.capacidade >= 20) : this.espacos(),
  );

  protected readonly capacidadeTotal = computed(() =>
    this.visiveis().reduce((some, e) => some + e.capacidade, 0),
  );

  protected alternarFiltro() {
    this.somenteGrandes.update((v) => !v)
  }

  ngOnInit(): void {
    this.espacoApi.listar().subscribe((dados) => this.espacos.set(dados));
  }
}
