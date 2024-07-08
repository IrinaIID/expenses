import { Component, OnInit, inject } from '@angular/core';
import { combineLatest, from, map, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { TransactionFirebaseService } from '../services/transaction-firebase.service';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';
import { DataCharts, Transaction } from '../interfaces';
import { EChartsOption } from 'echarts';


@Component({
  selector: 'app-cards-month-block',
  templateUrl: './cards-month-block.component.html',
  styleUrls: ['./cards-month-block.component.scss'],
})
export class CardsMonthBlockComponent implements OnInit {

  private transactionService = inject(TransactionFirebaseService);
  private authService = inject(AuthService);

  amountMonthIncomes!: Observable<number>;
  amountMonthExpenses!: Observable<number>;
  amountMonthBalance!: Observable<number>;
  userId!: string;
  isPositiveBalance = true;
  subscriotion!: Subscription;

  dateToday = new Date();
  year = this.dateToday.getFullYear();
  month = this.dateToday.getMonth();
  firstDayMonth = new Date(this.year, this.month, 1).getTime();
  lastDayMonth = new Date(this.year, this.month + 1, 0, 24).getTime();

  queriesArrIncomes: QueryFieldFilterConstraint[] = [
    where('type', '==', 'income'),
    where('date', '>=', this.firstDayMonth),
    where('date', '<=', this.lastDayMonth),
  ];

  queriesArrExpenses: QueryFieldFilterConstraint[] = [
    where('type', '==', 'expense'),
    where('date', '>=', this.firstDayMonth),
    where('date', '<=', this.lastDayMonth),
  ];

  dataChartsMonth: DataCharts = {
    income: [],
    expense: [],
    date: []
  }

  chartOption!: EChartsOption;


  ngOnInit(): void {

    this.subscriotion = this.authService.getUser().subscribe(data => {

      if(data?.uid) this.setIdUserQuery(data.uid);

      const snapShotIncomes = this.transactionService.getQueryTransactions(this.queriesArrIncomes);
      const observableIncomesMonth = from(snapShotIncomes) as Observable<Transaction[]>
      this.amountMonthIncomes = observableIncomesMonth
      .pipe(
        map((data) => {
          return data.reduce((total, income) => total + income.amount, 0);
        })
      )

      const snapShotExpenses = this.transactionService.getQueryTransactions(this.queriesArrExpenses);
      const observableExpensesMonth = from(snapShotExpenses) as Observable<Transaction[]>
      this.amountMonthExpenses = observableExpensesMonth
      .pipe(
        map((data) => {
          return data.reduce((total, expense) =>total + expense.amount, 0);
        })
      )

      this.amountMonthBalance = combineLatest([this.amountMonthIncomes, this.amountMonthExpenses])
      .pipe(
        map(([incomes, expenses]) => {
          this.isPositiveBalance = incomes - expenses >= 0;
          return incomes - expenses
        })
      )
    });
  }

  ngOnDEstroy() {
    this.subscriotion.unsubscribe()
  }

  setIdUserQuery(idUser: string): void {
    this.queriesArrIncomes.push(where('idUser', '==', idUser));
    this.queriesArrExpenses.push(where('idUser', '==', idUser));
  }


}
