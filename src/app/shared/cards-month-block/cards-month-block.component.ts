import { Component, OnInit, inject } from '@angular/core';
import { MonthAmountService } from './month-amount.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards-month-block',
  templateUrl: './cards-month-block.component.html',
  styleUrls: ['./cards-month-block.component.scss'],
})
export class CardsMonthBlockComponent implements OnInit {
  amountMonthIncomes = 0;
  amountMonthExpenses = 0;
  amountMonthBalance = 0;

  subscriptionIncomes: Subscription | undefined;
  subscriptionExpenses: Subscription | undefined;

  private monthAmountService = inject(MonthAmountService);

  ngOnInit(): void {
    this.subscriptionIncomes = this.monthAmountService.getMonthIncomes().subscribe((amount: number) => {
      this.amountMonthIncomes = amount;
      this.amountMonthBalance = this.amountMonthIncomes - this.amountMonthExpenses;
    });

    this.subscriptionExpenses = this.monthAmountService.getMonthExpenses().subscribe((amount: number) => {
      this.amountMonthExpenses = amount;
      this.amountMonthBalance = this.amountMonthIncomes - this.amountMonthExpenses;
    });
  }

  // ngOnDEstroy() {
  //   if(this.subscriptionIncomes) this.subscriptionIncomes.unsubscribe();
  //   if(this.subscriptionExpenses) this.subscriptionExpenses.unsubscribe()
  // }
}
