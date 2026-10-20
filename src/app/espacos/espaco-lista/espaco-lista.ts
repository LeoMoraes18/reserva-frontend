import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Espaco } from '../espaco';
import { EspacoCard } from '../espaco-card/espaco-card';
import { EspacoApi } from '../espaco-api';
import { RouterLink } from '@angular/router';

@Component({
  imports: [EspacoCard, RouterLink],
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

  protected adicionarTeste() {
    this.espacos.update(
      (lista) => [...lista,
        {
          id: 'test-' + Date.now(),
          nome: 'Sala de teste',
          descricao: 'Criado pelo botão',
          capacidade: 10,
          ativo: true
        }
      ]);
  }

  ngOnInit(): void {
    this.espacoApi.listar().subscribe((dados) => this.espacos.set(dados));
  }
}
