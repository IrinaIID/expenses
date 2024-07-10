import { Component, OnInit, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';
import { TransactionFirebaseService } from '../../services/transaction-firebase.service';

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
  isPositiveBalance = true;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const dateToday = new Date();
    const year = dateToday.getFullYear();
    const month = dateToday.getMonth();
    const firstDayMonth = new Date(year, month, 1).getTime();
    const lastDayMonth = new Date(year, month + 1, 0, 24).getTime();

    const queriesArrIncomes: QueryFieldFilterConstraint[] = [ 
      where('type', '==', 'income'),
      where('date', '>=', firstDayMonth),
      where('date', '<=', lastDayMonth)
    ];

    const queriesArrExpenses: QueryFieldFilterConstraint[] = 
    [
      where('type', '==', 'expense'),
      where('date', '>=', firstDayMonth),
      where('date', '<=', lastDayMonth)
    ];

    this.requestTransactions(queriesArrIncomes, queriesArrExpenses);
  }

  private requestTransactions(queries1: QueryFieldFilterConstraint[], queries2: QueryFieldFilterConstraint[]): void {
    this.amountMonthIncomes = this.transactionService.getTransactions(queries1).pipe(
      map((data) => {
        return data.reduce((total, income) => total + income.amount, 0);
      })
    );

    this.amountMonthExpenses = this.transactionService.getTransactions(queries2).pipe(
      map((data) => {
        return data.reduce((total, expense) => total + expense.amount, 0);
      })
    );

    this.amountMonthBalance = combineLatest([this.amountMonthIncomes, this.amountMonthExpenses]).pipe(
      map(([incomes, expenses]) => {
        this.isPositiveBalance = incomes - expenses >= 0;
        return incomes - expenses;
      })
    );
  }
}
