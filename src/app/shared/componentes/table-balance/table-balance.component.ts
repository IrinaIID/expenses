import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BalanceTableService } from './balance-table.service';
import { TransactionFirebaseService } from '../../services/transaction-firebase.service';
import { BalanceTableData } from '../../interfaces';
import { Subject, takeUntil } from 'rxjs';
import { QueryFieldFilterConstraint } from '@angular/fire/firestore';

@Component({
  selector: 'app-table-balance',
  templateUrl: './table-balance.component.html',
  styleUrls: ['./table-balance.component.scss'],
})
export class TableBalanceComponent implements OnInit, OnDestroy {
  private balanceTableService = inject(BalanceTableService);
  private transactionFirebaseServise = inject(TransactionFirebaseService);

  private ngUnsubscribe$ = new Subject<void>();

  dataTable!: BalanceTableData[];
  isModal = false;
  idTransactionDeleted: string | undefined;

  queriesTable: QueryFieldFilterConstraint[] = [];
  searchStrTable: string;
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
    this.refreshTable(this.queriesTable, this.searchStrTable);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  refreshTable(queriesArr: QueryFieldFilterConstraint[], serachStr: string): void {
    this.balanceTableService
      .getDataTable(queriesArr)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        this.dataTable = data.reverse();
        if(serachStr) {
           this.dataTable = this.dataTable.filter(transaction => transaction.title.toLocaleLowerCase().includes(serachStr) 
           || ( transaction.description && transaction.description.toLocaleLowerCase().includes(serachStr)))
        }
      });
  }

  emitDeleteAction($event: BalanceTableData): void {
    this.idTransactionDeleted = $event.id;
    this.isModal = true;
  }

  setQueries($event: [QueryFieldFilterConstraint[] , string]): void {
    [this.queriesTable, this.searchStrTable] = $event;
    this.refreshTable(this.queriesTable, this.searchStrTable);
  }

  checkModalMessage($event: boolean): void {
    if ($event && this.idTransactionDeleted) {
      this.transactionFirebaseServise.removeTransaction(this.idTransactionDeleted);
      this.refreshTable(this.queriesTable, this.searchStrTable);
      this.isModal = false;
    } else {
      this.isModal = false;
      this.idTransactionDeleted = undefined;
    }
  }
}
