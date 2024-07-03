import { Component, OnInit, inject } from '@angular/core';
import { BalanceTableData } from '../shared/interfaces';
import { UserService } from '../shared/services/user.service';
import { BalanceTableService } from '../shared/table-data/balance-table.service';
import { QueryFieldFilterConstraint } from '@angular/fire/firestore';
import { TransactionFirebaseService } from '../shared/services/transaction-firebase.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  dataTable!: BalanceTableData[];

  private userService = inject(UserService);
  private balanceTableService = inject(BalanceTableService);
  private transactionFirebaseServise = inject(TransactionFirebaseService);

  userId = this.userService.getUserId();

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

  refreshTable(queriesArr: QueryFieldFilterConstraint[] = []) {
    this.balanceTableService.getDataTable(this.userId, queriesArr).subscribe((data) => {
      console.log(data);
      this.dataTable = data.reverse();
    });
  }

  ngOnInit(): void {
    this.refreshTable(this.queriesTable);
  }

  emitDeleteAction($event: BalanceTableData) {
    this.idTransactionDeleted = $event.id;
    this.isModal = true;
  }

  deleteTransaction(idTransaction: string) {
    this.transactionFirebaseServise.removeTransaction(idTransaction);
    this.refreshTable(this.queriesTable);
  }

  setQueries($event: QueryFieldFilterConstraint[]) {
    this.queriesTable = $event;
    this.refreshTable(this.queriesTable);
  }

  checkModalMessage($event: boolean) {
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
