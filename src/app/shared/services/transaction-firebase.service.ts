import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { DataCharts, Transaction, TransactionDraft } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TransactionFirebaseService {
  private firestore = inject(Firestore);

  transactionsCollection = collection(this.firestore, 'transactions');

  // dataChart: DataCharts | undefined;
  // dataChartsIncome$: Observable<number> | undefined;

  getTransactions(args: QueryFieldFilterConstraint[]): Observable<Transaction[]> {
    const q = query(this.transactionsCollection, orderBy('date'), ...args);
    return from(getDocs(q)).pipe(map(({ docs }) => docs.map((doc) => ({ ...doc.data() } as Transaction))));
  }

  addTransaction(transaction: TransactionDraft): Observable<string> {
    const promise = addDoc(this.transactionsCollection, transaction).then((response) => response.id);
    return from(promise);
  }

  removeTransaction(idTransaction: string): Observable<void> {
    const docRef = doc(this.firestore, 'transactions/' + idTransaction);
    const promise = deleteDoc(docRef);
    return from(promise);
  }
}
