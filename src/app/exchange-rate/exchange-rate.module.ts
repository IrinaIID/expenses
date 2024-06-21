import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';

@NgModule({
  declarations: [
    ExchangeRateComponent
  ],
  imports: [
    CommonModule,
    ExchangeRateRoutingModule
  ],
  exports: [
    ExchangeRateComponent
  ]
})
export class ExchangeRateModule { }
