import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ExchangeRateComponent
  ],
  imports: [
    CommonModule,
    ExchangeRateRoutingModule,
    SharedModule
  ],
  exports: [
    ExchangeRateComponent
  ]
})
export class ExchangeRateModule { }
