import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTransactionRoutingModule } from './add-transaction-routing.module';
import { AddTransactionComponent } from './add-transaction.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormTransactionComponent } from './form-transaction/form-transaction.component';

@NgModule({
  declarations: [AddTransactionComponent, FormTransactionComponent],
  imports: [CommonModule, AddTransactionRoutingModule, SharedModule, ReactiveFormsModule],
  exports: [AddTransactionComponent],
})
export class AddTransactionModule {}
