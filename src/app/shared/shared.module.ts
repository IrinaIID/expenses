import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePageBlockComponent } from './componentes/name-page-block/name-page-block.component';
import { CardsMonthBlockComponent } from './componentes/cards-month-block/cards-month-block.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ExchangeService } from './services/exchange.service';
import { TransactionFirebaseService } from './services/transaction-firebase.service';
import { TableDataComponent } from './componentes/table-data/table-data.component';
import { BalanceTableService } from './componentes/table-balance/balance-table.service';
import { TableControlComponent } from './componentes/table-control/table-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableBalanceComponent } from './componentes/table-balance/table-balance.component';
import { ModalDeleteComponent } from './componentes/modal-delete/modal-delete.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    NamePageBlockComponent,
    CardsMonthBlockComponent,
    TableDataComponent,
    TableControlComponent,
    TableBalanceComponent,
    ModalDeleteComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    FooterComponent,
    HeaderComponent
  ],
  providers: [
    ExchangeService,
    TransactionFirebaseService,
    BalanceTableService,
    provideHttpClient()
  ],
})
export class SharedModule {}
