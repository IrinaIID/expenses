import { Component, OnInit, inject } from '@angular/core';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';
import { TransactionFirebaseService } from '../../services/transaction-firebase.service';

@Component({
  selector: 'app-cards-month-block',
  templateUrl: './cards-month-block.component.html',
  styleUrls: ['./cards-month-block.component.scss'],
})
export class CardsMonthBlockComponent implements OnInit {
  private transactionService = inject(TransactionFirebaseService);
  private authService = inject(AuthService);

  idUser: string | null = this.authService.idUser;

  amountMonthIncomes!: Observable<number>;
  amountMonthExpenses!: Observable<number>;
  amountMonthBalance!: Observable<number>;
  userId!: string;
  isPositiveBalance = true;
  subscriotion!: Subscription;
  queriesArrIncomes: QueryFieldFilterConstraint[] = [];
  queriesArrExpenses: QueryFieldFilterConstraint[] = [];

  ngOnInit(): void {
    this.loadData();

    console.log(this.authService.uidFire)


  }


  loadData(): void {
    const dateToday = new Date();
    const year = dateToday.getFullYear();
    const month = dateToday.getMonth();
    const firstDayMonth = new Date(year, month, 1).getTime();
    const lastDayMonth = new Date(year, month + 1, 0, 24).getTime();
  
    this.queriesArrIncomes.push(
      where('type', '==', 'income'),
      where('date', '>=', firstDayMonth),
      where('date', '<=', lastDayMonth));
  
    this.queriesArrExpenses.push(
      where('type', '==', 'expense'),
      where('date', '>=', firstDayMonth),
      where('date', '<=', lastDayMonth));
      
 
    this.requestTransactions();
  }

  private requestTransactions(): void {
    this.subscriotion = this.authService.user$.subscribe((data) => {
      if (data?.uid) {
        this.setIdUserQuery(data.uid);
      }

      // const snapShotIncomes = this.transactionService.getQueryTransactions(this.queriesArrIncomes);
      // const observableIncomesMonth = from(snapShotIncomes) as Observable<Transaction[]>
      this.amountMonthIncomes = this.transactionService.getTransactions(this.queriesArrIncomes).pipe(
        map((data) => {
          return data.reduce((total, income) => total + income.amount, 0);
        })
      );

      // const snapShotExpenses = this.transactionService.getQueryTransactions(this.queriesArrExpenses);
      // const observableExpensesMonth = from(snapShotExpenses) as Observable<Transaction[]>;
      this.amountMonthExpenses = this.transactionService.getTransactions(this.queriesArrExpenses).pipe(
        map((data) => {
          return data.reduce((total, expense) => total + expense.amount, 0);
        })
      );

      this.amountMonthBalance = combineLatest([this.amountMonthIncomes, this.amountMonthExpenses]).pipe(
        map(([incomes, expenses]) => {
          this.isPositiveBalance = incomes - expenses >= 0;
          return incomes - expenses;
        })
      );
    });
  }

  

  ngOnDEstroy() {
    this.subscriotion.unsubscribe();
  }

  setIdUserQuery(idUser: string): void {
    this.queriesArrIncomes.push(where('idUser', '==', idUser));
    this.queriesArrExpenses.push(where('idUser', '==', idUser));
  }
}
