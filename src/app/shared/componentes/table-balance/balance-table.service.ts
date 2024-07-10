import { Injectable, inject } from '@angular/core';
import { TransactionFirebaseService } from '../../services/transaction-firebase.service';
import { QueryFieldFilterConstraint } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { BalanceTableData, Transaction } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class BalanceTableService {

  private transactionService = inject(TransactionFirebaseService);

  dataTable: Observable<Transaction[]> | undefined;

  getDataTable(queriesArr: QueryFieldFilterConstraint[] = []) {

    this.dataTable = this.transactionService.getTransactions([...queriesArr]);

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
