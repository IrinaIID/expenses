import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';
import { EChartsOption } from 'echarts';
import { from, Observable } from 'rxjs';
import { Transaction } from 'src/app/shared/interfaces';
import { TransactionFirebaseService } from 'src/app/shared/services/transaction-firebase.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {

  private transactionService = inject(TransactionFirebaseService);

  @Input() idUser!: string | undefined | null;

  dataChart!: Observable<Transaction[]>
  chartOption!: EChartsOption;
  datesArr: string[] = [];
  amountArr: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['idUser']
    if (change) {
      const {currentValue} = change;
      this.dataChart = this.refreshDataChart(currentValue);

      this.dataChart.subscribe(data => {
        data.forEach(transaction => {
          const date = new Date(transaction.date);
          this.datesArr.push(date.toLocaleDateString());
          this.amountArr.push(transaction.amount);
        })
        this.setDataChart()
        
      })


    }
  }

  setDataChart() {
    this.chartOption = {
      xAxis: {
        type: 'category',
        data: this.datesArr,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.amountArr,
          type: 'line'
        }
      ]
    }
  }


  getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  
  refreshDataChart(idUser: string, queriesArr: QueryFieldFilterConstraint[] = []): Observable<Transaction[]> {
    queriesArr.push(where('idUser', '==', idUser));
    // const snapShot = this.transactionService.getQueryTransactions(queriesArr);
    // const data$ = from(snapShot) as unknown as Observable<Transaction[]>;
    return this.transactionService.getTransactions(queriesArr);
  }

}
