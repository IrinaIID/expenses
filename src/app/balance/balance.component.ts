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
      this.dataTable = data;
    });
  }

  ngOnInit(): void {
    this.refreshTable();
  }

  deleteTransaction($event: BalanceTableData) {
    console.log($event.id);
    this.transactionFirebaseServise.removeTransaction($event.id);
    this.refreshTable();
  }

  setQueries($event: QueryFieldFilterConstraint[]) {
    this.refreshTable($event);
  }
}
