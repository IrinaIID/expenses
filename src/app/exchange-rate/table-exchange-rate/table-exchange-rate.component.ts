import { Component, Input } from '@angular/core';
import { Rate } from '../interfaces';

@Component({
  selector: 'app-table-exchange-rate',
  templateUrl: './table-exchange-rate.component.html',
  styleUrls: ['./table-exchange-rate.component.scss'],
})
export class TableExchangeRateComponent {
  @Input() ratesArr!: Rate[];
  @Input() baseCurrency!: string;
}
