import { Component, input } from '@angular/core';
import { Espaco } from '../espaco';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatCardModule],
  selector: 'app-espaco-card',
  styleUrl: './espaco-card.scss',
  templateUrl: './espaco-card.html',
})
export class EspacoCard {
  readonly espaco = input.required<Espaco>();
}
