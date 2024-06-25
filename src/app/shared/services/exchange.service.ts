import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private http = inject(HttpClient);
  private baseCurrency = 'EUR';

  getCurrency() {
    return this.http.get(`https://open.er-api.com/v6/latest/${this.baseCurrency}`)
  }

  getBaseCurrency() {
    return this.baseCurrency
  }
  // constructor() { }
}
