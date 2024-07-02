import { Component, OnInit, inject } from '@angular/core';
import { ExchangeService } from '../shared/services/exchange.service';
import { Currency, Rate } from './interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {
  currencyData: Currency | undefined;
  ratesArr: Rate[] = [];
  baseCurrency!: string;
  isCards: boolean | undefined;
  updateTime: string | undefined;
  subscription: Subscription | undefined;

  exchangeService = inject(ExchangeService);

  ngOnInit(): void {
    sessionStorage.getItem('isCards') === 'false' ? (this.isCards = false) : (this.isCards = true);

    this.baseCurrency = this.exchangeService.getBaseCurrency();

    this.subscription = this.exchangeService.getCurrency().subscribe((data) => {
      this.currencyData = data;
      this.updateTime = data.time_last_update_utc;

      for (const property in this.currencyData.rates) {
        this.ratesArr.push({
          currency: property,
          rate: this.currencyData.rates[property],
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  setCardsView(): void {
    this.isCards = true;
    sessionStorage.setItem('isCards', 'true');
  }

  setTableView(): void {
    this.isCards = false;
    sessionStorage.setItem('isCards', 'false');
  }
}
