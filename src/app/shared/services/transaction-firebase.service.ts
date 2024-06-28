import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, QueryFieldFilterConstraint, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Transaction } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransactionFirebaseService {

  firestore = inject(Firestore);
  transactionsCollection = collection(this.firestore, 'transactions');

  getAllTransactions(): Observable<Object> {
    return collectionData(this.transactionsCollection, {
      idField: 'id',
    }) as Observable<Object[]>;
  }


  // in progress 
  async getQueryTransactions(args: QueryFieldFilterConstraint[]) {
    
    // const s = where("type", "==", 'income')
    const q = query(this.transactionsCollection, ...args);
    const querySnapshot = await getDocs(q);
    const transactionsArr: DocumentData[] = [];
    
    querySnapshot.forEach((doc) => {
      transactionsArr.push(doc.data())
      // console.log(doc.id, " => ", doc.data());
      });
    return transactionsArr

  }

  addTransaction(object: Transaction): Observable<string> {
    const promise = addDoc(this.transactionsCollection, object).then(
      (response) => response.id
    );
    return from(promise);
  }

  removeTransaction(idTransaction: string): Observable<void> {
    const docRef = doc(this.firestore, 'transactions/' + idTransaction);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

}
