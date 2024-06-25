import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BalanceComponent,
  ],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [
    BalanceComponent
  ]
})
export class BalanceModule { }
