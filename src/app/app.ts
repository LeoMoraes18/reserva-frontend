import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EspacoLista } from './espacos/espaco-lista/espaco-lista';

@Component({
  imports: [RouterOutlet, EspacoLista],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Sistema de Reservas');
}
