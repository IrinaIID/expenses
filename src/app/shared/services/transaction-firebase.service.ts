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
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Transaction, TransactionDraft } from '../interfaces';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionFirebaseService {

  private firestore = inject(Firestore);

  transactionsCollection = collection(this.firestore, 'transactions');

  authService = inject(AuthService);

  constructor() {
    this.authService.getUser().subscribe(data => {
      data
    })
  }



  // private authUpdateSubject = new BehaviorSubject<void>(undefined);
  // authUpdate$ = this.authUpdateSubject.asObservable();

  // dataTable: Observable<Transaction[]> | undefined;

  // getAllTransactions(): Observable<Transaction[]> {
  //   return collectionData(this.transactionsCollection, {
  //     idField: 'idTransaction',
  //   }) as Observable<Transaction[]>;
  // }

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
