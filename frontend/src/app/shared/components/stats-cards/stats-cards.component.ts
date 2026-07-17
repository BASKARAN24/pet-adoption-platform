import { Component, Input } from '@angular/core';
import { Stats } from '../../../core/models/animal.model';

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css'
})
export class StatsCardsComponent {
  @Input() stats: Stats | null = null;
}
