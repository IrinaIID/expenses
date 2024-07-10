import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Currency } from '../../exchange-rate/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private http = inject(HttpClient);

  private baseCurrency = 'EUR';

  getCurrency(): Observable<Currency> {
    return this.http
      .get<Currency>(`https://open.er-api.com/v6/latest/${this.baseCurrency}`)
      .pipe(map(Currency.fromJson));
  }

  getBaseCurrency(): string {
    return this.baseCurrency;
  }
}
