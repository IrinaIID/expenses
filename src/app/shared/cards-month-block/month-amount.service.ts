import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Transaction } from '../interfaces';
import { TransactionFirebaseService } from '../services/transaction-firebase.service';
import { where } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MonthAmountService {

  private transactionService = inject(TransactionFirebaseService);

  monthAmount: Observable<Transaction[]> | undefined;
  amountMonthIncomes: number | undefined;

  monthExpenses: Observable<Transaction[]> | undefined;
  amountMonthExpenses: number | undefined;
  

  dateToday = new Date();
  year = this.dateToday.getFullYear();
  month = this.dateToday.getMonth();
  firstDayMonth = new Date(this.year, this.month, 1).getTime();
  lastDayMonth = new Date(this.year, this.month + 1, 0, 24).getTime();

  ////

  private authService = inject(AuthService);
  private authUpdateSubject = new BehaviorSubject<void>(undefined);
  authUpdate$ = this.authUpdateSubject.asObservable();

  dataTable: Observable<Transaction[]> | undefined;

  userId!: string;

  constructor() { 
    this.authService.getUser()
    .subscribe((data) => {
      console.log(data?.uid)

      if (data?.uid) this.userId = data.uid;
      this.authUpdateSubject.next()
      console.log(data?.uid)
    });
  }


  private getMonthAmount(type: 'income' | 'expense'): Observable<number> {
    const queriesArr = [
      where('idUser', '==', this.userId),
      where('type', '==', type),
      where('date', '>=', this.firstDayMonth),
      where('date', '<=', this.lastDayMonth),
    ];

    console.log(this.userId)

    const snapShot = this.transactionService.getQueryTransactions(queriesArr);
    this.monthAmount = from(snapShot) as Observable<Transaction[]>;

    return this.monthAmount.pipe(
      map((data) => {
        return data.reduce((total, income) => total + income.amount, 0);
      })
    );
  }

  getMonthIncomes(): Observable<number> {
    return this.getMonthAmount('income');
  }

  getMonthExpenses(): Observable<number> {
    return this.getMonthAmount('expense');
  }
}
