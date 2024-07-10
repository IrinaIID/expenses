import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTransactionRoutingModule } from './add-transaction-routing.module';
import { AddTransactionComponent } from './add-transaction.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTransactionComponent } from './form-transaction/form-transaction.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AddTransactionComponent, FormTransactionComponent],
  imports: [BrowserModule, CommonModule, AddTransactionRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [AddTransactionComponent],
})
export class AddTransactionModule {}
