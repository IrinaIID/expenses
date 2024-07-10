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
  where,
} from '@angular/fire/firestore';
import { Observable, from, map, switchAll, switchMap } from 'rxjs';
import { Transaction, TransactionDraft } from '../interfaces';
import { AuthService } from 'src/app/auth.service';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class TransactionFirebaseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  transactionsCollection = collection(this.firestore, 'transactions');

  getTransactions(args: QueryFieldFilterConstraint[]): Observable<Transaction[]> {
    return this.authService.user$.pipe(
      switchMap((user: User) => {
        const q = query(this.transactionsCollection, orderBy('date'), where('idUser', '==', user?.uid), ...args);
        return from(getDocs(q));
      }),
      map(({ docs }) => docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Transaction))
    );

    //TODO 2 options

    // const id = this.authService.getUserId();
    // const q = query(this.transactionsCollection, orderBy('date'), where('idUser', '==', id), ...args);
    // return this.authService.user$
    //   .pipe(
    //     switchMap((user: User) => {
    //       const q = query(this.transactionsCollection, orderBy('date'), where('idUser', '==', user?.uid), ...args);
    //       return from(getDocs(q));
    //     }),
    //     map(({ docs }) => docs.map((doc) => ({id: doc.id, ...doc.data() } as Transaction)))
    //   );
    // from(getDocs(q))
    // .pipe(map(({ docs }) => docs.map((doc) => ({id: doc.id, ...doc.data() } as Transaction))));
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
