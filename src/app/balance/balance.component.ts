import { Component, OnInit, inject } from '@angular/core';
import { BalanceTableData } from '../shared/interfaces';
import { BalanceTableService } from '../shared/table-data/balance-table.service';
import { QueryFieldFilterConstraint } from '@angular/fire/firestore';
import { TransactionFirebaseService } from '../shared/services/transaction-firebase.service';
import { AuthService } from '../auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  private balanceTableService = inject(BalanceTableService);
  private transactionFirebaseServise = inject(TransactionFirebaseService);
  private authService = inject(AuthService);

  private ngUnsubscribe$ = new Subject<void>();

  dataTable!: BalanceTableData[];
  isModal = false;
  isAgreedDelete = false;
  idTransactionDeleted: string | undefined;

  queriesTable: QueryFieldFilterConstraint[] = [];
  dataKeys: (keyof BalanceTableData)[] = [
    'date',
    'type',
    'amount',
    'regularity',
    'title',
    'category',
    'subcategories',
    'description',
  ];
  
  refreshTable(queriesArr: QueryFieldFilterConstraint[] = []): void {
    this.balanceTableService.getDataTable(queriesArr)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        console.log(data);
        this.dataTable = data.reverse();
      });
  }

  ngOnInit(): void {

    console.log(this.authService.getUser())

    this.balanceTableService.authUpdate$.subscribe(() => {
      this.refreshTable(this.queriesTable);
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  emitDeleteAction($event: BalanceTableData): void {
    this.idTransactionDeleted = $event.id;
    this.isModal = true;
    this.refreshTable(this.queriesTable);

  }

  deleteTransaction(idTransaction: string): void {
    this.transactionFirebaseServise.removeTransaction(idTransaction);
    this.refreshTable(this.queriesTable);
  }

  setQueries($event: QueryFieldFilterConstraint[]): void {
    this.queriesTable = $event;
    this.refreshTable(this.queriesTable);
  }

  checkModalMessage($event: boolean): void {
    if ($event && this.idTransactionDeleted) {
      this.deleteTransaction(this.idTransactionDeleted);
      this.refreshTable(this.queriesTable);
      this.isModal = false;
    } else {
      this.isModal = false;
      this.idTransactionDeleted = undefined;
    }
  }
}
