import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule,
    StatisticsRoutingModule,
    NgxEchartsModule.forChild(),
    SharedModule
  ]
})
export class StatisticsModule {}
