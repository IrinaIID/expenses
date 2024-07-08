import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '../shared/shared.module';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [StatisticsComponent, ChartComponent],
  imports: [CommonModule,
    StatisticsRoutingModule,
    NgxEchartsModule.forChild(),
    SharedModule
  ]
})
export class StatisticsModule {}
