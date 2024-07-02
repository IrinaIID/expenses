import { Injectable, inject } from '@angular/core';
import { TransactionFirebaseService } from '../services/transaction-firebase.service';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { BalanceTableData, Transaction } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BalanceTableService {
  dataTable: Observable<Transaction[]> | undefined;

  private transactionService = inject(TransactionFirebaseService);

  getDataTable(idUser: number, queriesArr: QueryFieldFilterConstraint[] = []) {
    const snapShot = this.transactionService.getQueryTransactions([where('idUser', '==', idUser), ...queriesArr]);
    this.dataTable = from(snapShot) as Observable<Transaction[]>;

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
