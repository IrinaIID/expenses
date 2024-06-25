import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePageBlockComponent } from './name-page-block/name-page-block.component';
import { CardsMonthBlockComponent } from './cards-month-block/cards-month-block.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ExchangeService } from './services/exchange.service';


@NgModule({
  declarations: [
    NamePageBlockComponent,
    CardsMonthBlockComponent
  ],
  imports: [
    CommonModule, HttpClientModule
  ],
  exports: [
    NamePageBlockComponent,
    CardsMonthBlockComponent,
  ],
  providers: [ExchangeService, provideHttpClient()]
})
export class SharedModule { }
