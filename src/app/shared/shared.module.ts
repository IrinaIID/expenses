import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamePageBlockComponent } from './name-page-block/name-page-block.component';
import { CardsMonthBlockComponent } from './cards-month-block/cards-month-block.component';



@NgModule({
  declarations: [
    NamePageBlockComponent,
    CardsMonthBlockComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NamePageBlockComponent,
    CardsMonthBlockComponent
  ]
})
export class SharedModule { }
