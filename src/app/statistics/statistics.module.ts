import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';



@NgModule({
  declarations: [StatisticsComponent],
  imports: [CommonModule,
    StatisticsRoutingModule,
    NgxEchartsModule.forChild()
  ]
})
export class StatisticsModule {}
