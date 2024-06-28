import { Component, OnInit, inject } from '@angular/core';
import { TransactionFirebaseService } from '../shared/services/transaction-firebase.service';
import { DocumentData, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {

  private transactionService = inject(TransactionFirebaseService)
  datatr!: DocumentData[]

  ngOnInit(): void {

    const dateToday = new Date();
    const year = dateToday.getFullYear();
    const month = dateToday.getMonth();
    const firstDayMonth = new Date(year, month, 1);
    const lastDayMonth = new Date(year, month + 1, 0);
    const arr: DocumentData[] = [];
    
    const queriesArr = [where("type", "==", 'income'), where('category', '==', 'Gifts')];
    this.transactionService.getQueryTransactions(queriesArr).then(data => {
      this.datatr = data;
      console.log(data)}
    )

    console.log(this.datatr)
  
  }

}
