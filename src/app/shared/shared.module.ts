import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePageBlockComponent } from './name-page-block/name-page-block.component';
import { CardsMonthBlockComponent } from './cards-month-block/cards-month-block.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ExchangeService } from './services/exchange.service';
import { TransactionFirebaseService } from './services/transaction-firebase.service';
import { MonthAmountService } from './cards-month-block/month-amount.service';
import { TableDataComponent } from './table-data/table-data.component';
import { BalanceTableService } from './table-data/balance-table.service';
import { UserService } from './services/user.service';
import { TableControlComponent } from './table-control/table-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NamePageBlockComponent, CardsMonthBlockComponent, TableDataComponent, TableControlComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [NamePageBlockComponent, CardsMonthBlockComponent, TableDataComponent, TableControlComponent],
  providers: [
    ExchangeService,
    TransactionFirebaseService,
    MonthAmountService,
    BalanceTableService,
    UserService,
    provideHttpClient(),
  ],
})
export class SharedModule {}
