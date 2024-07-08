import { Component, inject, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TransactionFirebaseService } from '../shared/services/transaction-firebase.service';
import { from, Observable, reduce } from 'rxjs';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Transaction } from '../shared/interfaces';

interface DataChart {
  date: Date[],
  amount: number[]
}


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  private transactionService = inject(TransactionFirebaseService);
  private authService = inject(AuthService);

  idUser: string | undefined;
  isOpenCards = false;
  isOpenStatistics = false;
  queriesChart: QueryFieldFilterConstraint[] = [];
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
  dataChart!: Observable<DataChart>

  ngOnInit(): void {

    this.authService.getUser()
    .subscribe(data => {
      this.idUser = data?.uid

      this.dataChart = this.refreshDataChart()
      .pipe(
        reduce((acc: DataChart, transaction: Transaction) => {
          acc.date.push(new Date(transaction.date));
          acc.amount.push(transaction.amount);
          return acc
        }, {date: [], amount: []})
      )
      
    })

   }

  refreshDataChart(queriesArr: QueryFieldFilterConstraint[] = []): Observable<any> {
    queriesArr.push(where('idUser', '==', this.idUser));
    const snapShot = this.transactionService.getQueryTransactions(queriesArr);
    const data$ = from(snapShot);
    return data$
  }

  setQueries($event: QueryFieldFilterConstraint[]): void {
    this.queriesChart = $event;
    this.refreshDataChart(this.queriesChart);
  }

  toggleMonthCards(): void {
    this.isOpenCards = !this.isOpenCards
  }

  toggleStatistics(): void {
    this.isOpenStatistics = !this.isOpenStatistics
  }
}
