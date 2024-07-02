import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Transaction, TransactionDraft } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TransactionFirebaseService {
  firestore = inject(Firestore);
  transactionsCollection = collection(this.firestore, 'transactions');

  getAllTransactions(): Observable<Transaction[]> {
    return collectionData(this.transactionsCollection, {
      idField: 'idTransaction',
    }) as Observable<Transaction[]>;
  }

  async getQueryTransactions(args: QueryFieldFilterConstraint[]) {
    const q = query(this.transactionsCollection, orderBy('date'), orderBy('amount'), ...args);
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
