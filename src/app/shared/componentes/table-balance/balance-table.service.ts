import { Injectable, inject } from '@angular/core';
import { TransactionFirebaseService } from '../../services/transaction-firebase.service';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { BalanceTableData, Transaction } from '../../interfaces';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BalanceTableService {

  private transactionService = inject(TransactionFirebaseService);
  private authService = inject(AuthService);
  private authUpdateSubject = new BehaviorSubject<void>(undefined);
  authUpdate$ = this.authUpdateSubject.asObservable();

  dataTable: Observable<Transaction[]> | undefined;

  userId!: string;

  constructor() { 
    this.authService.user$
    .subscribe((data) => {
      if (data?.uid) this.userId = data.uid;
      this.authUpdateSubject.next()
    });
  }

  getDataTable(queriesArr: QueryFieldFilterConstraint[] = []) {

    // const snapShot = this.transactionService.getQueryTransactions([where('idUser', '==', this.userId), ...queriesArr]);
    this.dataTable = this.transactionService.getTransactions([where('idUser', '==', this.userId), ...queriesArr]);

    return this.dataTable.pipe(
      map((data) => {
        return data.map((transaction) => {
          const year = new Date(transaction.date).getFullYear();
          const month = new Date(transaction.date).getMonth() + 1;
          const day = new Date(transaction.date).getDate();

          const dateString = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
          return {
            ...transaction,
            date: dateString,
          } as BalanceTableData;
        });
      })
    );
  }
}
