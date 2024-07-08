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
import { Observable, from } from 'rxjs';
import { DataCharts, TransactionDraft } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TransactionFirebaseService {

  private firestore = inject(Firestore);

  transactionsCollection = collection(this.firestore, 'transactions');

  dataChart: DataCharts | undefined;
  dataChartsIncome$: Observable<number> | undefined

  async getQueryTransactions(args: QueryFieldFilterConstraint[]):Promise<{id: string;}[]> {
    const q = query(this.transactionsCollection, orderBy('date'), ...args);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  addTransaction(object: TransactionDraft): Observable<string> {
    const promise = addDoc(this.transactionsCollection, object).then((response) => response.id);
    return from(promise);
  }

  removeTransaction(idTransaction: string): Observable<void> {
    const docRef = doc(this.firestore, 'transactions/' + idTransaction);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

}
