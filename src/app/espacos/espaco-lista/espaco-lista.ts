import { Component, computed, signal } from '@angular/core';
import { Espaco } from '../espaco';
import { EspacoCard } from '../espaco-card/espaco-card';

@Component({
  imports: [EspacoCard],
  selector: 'app-espaco-lista',
  styleUrl: './espaco-lista.scss',
  templateUrl: './espaco-lista.html',
})
export class EspacoLista {
  protected readonly espacos = signal<Espaco[]>(
    [
      {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        nome: "Sala de Reunião A",
        descricao: "Sala com TV",
        capacidade: 8,
        ativo: true,
      },
      {
        id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        nome: "Auditório",
        descricao: "Palco e projetor",
        capacidade: 80,
        ativo: true,
      },
      {
        id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
        nome: "Sala de reunião B",
        descricao: "Palco e projetor",
        capacidade: 4,
        ativo: true,
      },
    ]
  );

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
}
