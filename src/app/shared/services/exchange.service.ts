import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
// please use relative imports
import { Currency } from 'src/app/exchange-rate/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {

  private http = inject(HttpClient);
  
  private baseCurrency = 'EUR';

  // please use camelCase
  getCurrency(): Observable<Currency> {
    return this.http.get<Currency>(`https://open.er-api.com/v6/latest/${this.baseCurrency}`).pipe(
      map((data) => ({
        timeLastUpdateUtc: data.timeLastUpdateUtc,
        timeNextUpdateUtc: data.timeNextUpdate,
        baseCode: data.baseCode,
        rates: data.rates,
      }))
    ) as unknown as Observable<Currency>;
  }

  getBaseCurrency(): string {
    return this.baseCurrency;
  }
}
