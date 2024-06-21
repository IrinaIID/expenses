import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTransactionRoutingModule } from './add-transaction-routing.module';
import { AddTransactionComponent } from './add-transaction.component';


@NgModule({
  declarations: [
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    AddTransactionRoutingModule
  ]
})
export class AddTransactionModule { }
