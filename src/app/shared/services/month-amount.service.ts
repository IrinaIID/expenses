import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, from, map, reduce } from 'rxjs';
import { Transaction } from '../interfaces';
import { TransactionFirebaseService } from './transaction-firebase.service';
import { where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MonthAmountService {

  monthAmount!: Observable<Transaction[]>
  amountMonthIncomes!: number;

  monthExpenses!: Observable<Transaction[]>
  amountMonthExpenses!: number;

  private transactionService = inject(TransactionFirebaseService);

  dateToday = new Date();
  year = this.dateToday.getFullYear();
  month = this.dateToday.getMonth();
  firstDayMonth = new Date(this.year, this.month, 1);
  lastDayMonth = new Date(this.year, this.month + 1, 0, 24);



  private getMonthAmount(type: 'income' | 'expense') {
    const queriesArr = [
      where("type", "==", type), 
      where("date", ">=", this.firstDayMonth), 
      where("date", "<=", this.lastDayMonth)
    ];

    const snapShot = this.transactionService.getQueryTransactions(queriesArr);
    this.monthAmount = from(snapShot) as Observable<Transaction[]>;

    return this.monthAmount.pipe(
      map(data => {      
        return data.reduce((total, income) => total + income.count, 0);
      })
    );
  }

  getMonthIncomes() {
    return this.getMonthAmount('income')
  }

  getMonthExpenses() {
    return this.getMonthAmount('expense')
  }
}

