import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePageBlockComponent } from './name-page-block/name-page-block.component';
import { CardsMonthBlockComponent } from './cards-month-block/cards-month-block.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ExchangeService } from './services/exchange.service';
import { TransactionFirebaseService } from './services/transaction-firebase.service';
import { TableDataComponent } from './table-data/table-data.component';
import { BalanceTableService } from './table-data/balance-table.service';
import { TableControlComponent } from './table-control/table-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableBalanceComponent } from './table-balance/table-balance.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    NamePageBlockComponent,
    CardsMonthBlockComponent,
    TableDataComponent,
    TableControlComponent,
    TableBalanceComponent,
    ModalDeleteComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NamePageBlockComponent,
    CardsMonthBlockComponent,
    TableDataComponent,
    TableControlComponent,
    ModalDeleteComponent,
    TableBalanceComponent,
  ],
  providers: [
    ExchangeService,
    TransactionFirebaseService,
    BalanceTableService,
    provideHttpClient()
  ],
})
export class SharedModule {}
