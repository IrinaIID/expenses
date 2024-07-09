import { Component, Input } from '@angular/core';
import { Rate } from '../interfaces';

@Component({
  selector: 'app-card-exchange-rate',
  templateUrl: './card-exchange-rate.component.html',
  styleUrls: ['./card-exchange-rate.component.scss'],
})
export class CardExchangeRateComponent {
  @Input() baseCurrency!: string;
  @Input() currency!: string;
  @Input() rate!: Rate[] | null;
}
