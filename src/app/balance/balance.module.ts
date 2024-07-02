import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { SharedModule } from '../shared/shared.module';
import { BalanceRoutingModule } from './balance-routing.module';

@NgModule({
  declarations: [BalanceComponent],
  imports: [CommonModule, SharedModule, BalanceRoutingModule],
  exports: [BalanceComponent],
})
export class BalanceModule {}
