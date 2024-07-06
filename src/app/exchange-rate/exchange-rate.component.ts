import { Component, OnInit, inject } from '@angular/core';
import { ExchangeService } from '../shared/services/exchange.service';
import { Currency, Rate } from './interfaces';
import { map, Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss'],
})
export class ExchangeRateComponent implements OnInit {

  private exchangeService = inject(ExchangeService);

  currencyData: Currency | undefined | any;
  ratesArr: Rate[] = [];
  baseCurrency!: string;
  isCards: boolean | undefined;
  updateTime: string | undefined;

  authService = inject(AuthService);

  isAuth: boolean = false;
  rates!: Observable<any>


  ngOnInit(): void {

    this.authService.getUser().subscribe(data => this.isAuth = !!data?.uid);

    this.isCards = sessionStorage.getItem('isCards') === 'true';

    this.baseCurrency = this.exchangeService.getBaseCurrency();

    this.rates = this.exchangeService.getCurrency()
      .pipe(map((data) => {
        this.updateTime = data.time_last_update_utc;
        this.currencyData = data.rates;
        const arrRates = []

        for (const property in this.currencyData) {
          arrRates.push({
            currency: property,
            rate: this.currencyData[property],
          });
        }
        return  arrRates
      }));

    this.rates.subscribe();
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
