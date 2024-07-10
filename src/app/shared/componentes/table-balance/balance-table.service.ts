import { Injectable, inject } from '@angular/core';
import { TransactionFirebaseService } from '../../services/transaction-firebase.service';
import { QueryFieldFilterConstraint } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { BalanceTableData, Transaction } from '../../interfaces';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BalanceTableService {
  private transactionService = inject(TransactionFirebaseService);
  private datePipe = inject(DatePipe);

  getDataTable(queriesArr: QueryFieldFilterConstraint[] = []) {
    return this.transactionService.getTransactions([...queriesArr]).pipe(
      map((data) => {
        return data.map((transaction) => {
          return {
            ...transaction,
            date: this.datePipe.transform(transaction.date, 'yyyy/MM/dd'),
          } as BalanceTableData;
        });
      })
    );
  }
}
