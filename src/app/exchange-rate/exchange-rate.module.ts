import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { CardExchangeRateComponent } from './card-exchange-rate/card-exchange-rate.component';
import { TableExchangeRateComponent } from './table-exchange-rate/table-exchange-rate.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ExchangeRateComponent, CardExchangeRateComponent, TableExchangeRateComponent],
  imports: [CommonModule, ExchangeRateRoutingModule, SharedModule],
  exports: [ExchangeRateComponent],
})
export class ExchangeRateModule {}
