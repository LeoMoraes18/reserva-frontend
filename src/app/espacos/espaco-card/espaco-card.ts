import { Component, input } from '@angular/core';
import { Espaco } from '../espaco';

@Component({
  imports: [],
  selector: 'app-espaco-card',
  styleUrl: './espaco-card.scss',
  templateUrl: './espaco-card.html',
})
export class EspacoCard {
  readonly espaco = input.required<Espaco>();
}
