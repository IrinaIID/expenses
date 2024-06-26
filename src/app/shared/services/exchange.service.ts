import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Currency } from 'src/app/exchange-rate/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private http = inject(HttpClient);
  private baseCurrency = 'EUR';

  getCurrency(): Observable<Currency> {
    return this.http.get<Currency>(`https://open.er-api.com/v6/latest/${this.baseCurrency}`)
    .pipe(
      map((data) => ({
        time_last_update_utc: data.time_last_update_utc,
        time_next_update_utc: data.time_next_update_utc,
        base_code: data.base_code,
        rates: data.rates
      }))
    )
  }

  getBaseCurrency(): string  {
    return this.baseCurrency
  }

}
