import { Component, inject, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TransactionFirebaseService } from '../shared/services/transaction-firebase.service';
import { from, Observable } from 'rxjs';
import { Transaction } from '../shared/interfaces';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  transactionService = inject(TransactionFirebaseService);
  
  dataTable: Observable<Transaction[]> | undefined;
  chartOption!: EChartsOption;
  queriesArr: QueryFieldFilterConstraint[] = [];

  ngOnInit(): void {

    const snapShot = this.transactionService.getQueryTransactions([where('idUser', '==', 'id'), ...this.queriesArr]);
    this.dataTable = from(snapShot) as Observable<Transaction[]>;

    

    this.chartOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        },
        {
          data: [20, 932, 95, 934, 32, 1330, 1320],
          type: 'line',
        },
      ],
    };
    
  }
}
