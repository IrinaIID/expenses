import { Component, OnInit, inject } from '@angular/core';
import { ExchangeService } from '../shared/services/exchange.service';
import { Currency, Rate } from './interfaces';


@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {

  currencyData: Currency = {} as Currency;
  ratesArr: Rate[] = [];
  baseCurrency!: string;

  exchangeService = inject(ExchangeService);
  
  ngOnInit(): void {

    this.baseCurrency = this.exchangeService.getBaseCurrency();

    this.exchangeService.getCurrency().subscribe(data => {
      this.currencyData = data as Currency;

      for (const property in this.currencyData.rates) {
        this.ratesArr.push({
          currency: property,
          rate: this.currencyData.rates[property]
        })
      }

      console.log(this.ratesArr);

      console.log(this.currencyData)
    })

  }

}
