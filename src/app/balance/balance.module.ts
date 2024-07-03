import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { SharedModule } from '../shared/shared.module';
import { BalanceRoutingModule } from './balance-routing.module';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@NgModule({
  declarations: [BalanceComponent, ModalDeleteComponent],
  imports: [CommonModule, SharedModule, BalanceRoutingModule],
  exports: [BalanceComponent],
})
export class BalanceModule {}
