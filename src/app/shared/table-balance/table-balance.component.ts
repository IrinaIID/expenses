import { Component, inject, OnInit } from '@angular/core';
import { BalanceTableService } from '../table-data/balance-table.service';
import { TransactionFirebaseService } from '../services/transaction-firebase.service';
import { BalanceTableData } from '../interfaces';
import { Subject, takeUntil } from 'rxjs';
import { QueryFieldFilterConstraint } from '@angular/fire/firestore';

@Component({
  selector: 'app-table-balance',
  templateUrl: './table-balance.component.html',
  styleUrls: ['./table-balance.component.scss']
})
export class TableBalanceComponent  implements OnInit {
  private balanceTableService = inject(BalanceTableService);
  private transactionFirebaseServise = inject(TransactionFirebaseService);

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

  ngOnInit(): void {
    this.balanceTableService.authUpdate$.subscribe(() => {
      this.refreshTable(this.queriesTable);
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  refreshTable(queriesArr: QueryFieldFilterConstraint[] = []): void {
    this.balanceTableService.getDataTable(queriesArr)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        console.log(data);
        this.dataTable = data.reverse();
      });
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
