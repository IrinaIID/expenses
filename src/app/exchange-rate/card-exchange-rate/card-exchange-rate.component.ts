import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-exchange-rate',
  templateUrl: './card-exchange-rate.component.html',
  styleUrls: ['./card-exchange-rate.component.scss']
})
export class CardExchangeRateComponent {

  @Input() baseCurrency!: string;
  @Input() currency!: string;
  @Input() rate!: number;

}
