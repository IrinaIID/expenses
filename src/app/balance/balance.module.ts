import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { SharedModule } from '../shared/shared.module';
import { BalanceRoutingModule } from './balance-routing.module';

@NgModule({
  declarations: [BalanceComponent],
  imports: [CommonModule, BalanceRoutingModule, SharedModule],
  exports: [BalanceComponent],
  providers: [DatePipe]
})
export class BalanceModule {}
