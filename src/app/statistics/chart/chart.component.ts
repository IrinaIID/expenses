import { Component, inject, Input, OnInit } from '@angular/core';
import { QueryFieldFilterConstraint } from '@angular/fire/firestore';
import { EChartsOption } from 'echarts';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Transaction } from 'src/app/shared/interfaces';
import { TransactionFirebaseService } from 'src/app/shared/services/transaction-firebase.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  private transactionService = inject(TransactionFirebaseService);

  @Input() idUser!: string | undefined | null;

  private ngUnsubscribe$ = new Subject<void>();

  chartOption!: EChartsOption;
  chartOption2!: EChartsOption;
  datesArr: string[] = [];
  amountArrIncomes: number[] = [];
  amountArrExpenses: number[] = [];

  ngOnInit(): void {
    this.refreshDataChart()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        data.forEach((transaction) => {
          const date = new Date(transaction.date).toLocaleDateString();
          if (date === this.datesArr[this.datesArr.length - 1]) {
            if (transaction.type === 'income') {
              this.amountArrIncomes[this.amountArrIncomes.length - 1] += transaction.amount;
            } else {
              this.amountArrExpenses[this.amountArrExpenses.length - 1] += transaction.amount;
            }
          } else {
            this.datesArr.push(date);
            if (transaction.type == 'income') {
              this.amountArrIncomes.push(transaction.amount);
              this.amountArrExpenses.push(0);
            } else {
              this.amountArrIncomes.push(0);
              this.amountArrExpenses.push(transaction.amount);
            }
          }
        });
        this.setDataChart();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  setDataChart() {
    this.chartOption = {
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: true },
          saveAsImage: { 
            show: true, 
            name: `your_balance_chart_${new Date().toLocaleDateString()}`
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: this.datesArr,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Incomes',
          data: this.amountArrIncomes,
          type: 'line',
        },
        {
          name: 'Expenses',
          data: this.amountArrExpenses,
          type: 'line',
        },
      ],
    };

    this.chartOption2 = {
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: true },
          saveAsImage: { 
            show: true,
            name: `your_balance_chart_${new Date().toLocaleDateString()}`
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.datesArr,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Incomes',
          data: this.amountArrIncomes,
          type: 'line',
          areaStyle: {},
        },
        {
          name: 'Expenses',
          data: this.amountArrExpenses,
          type: 'line',
          areaStyle: {},
        },
      ],
    };
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

  refreshDataChart(queriesArr: QueryFieldFilterConstraint[] = []): Observable<Transaction[]> {
    return this.transactionService.getTransactions(queriesArr);
  }
}
