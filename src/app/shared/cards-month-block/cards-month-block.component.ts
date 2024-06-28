import { Component, OnInit, inject } from '@angular/core';
import { MonthAmountService } from '../services/month-amount.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cards-month-block',
  templateUrl: './cards-month-block.component.html',
  styleUrls: ['./cards-month-block.component.scss'],
})
export class CardsMonthBlockComponent implements OnInit {

  amountMonthIncomes!: number;
  amountMonthExpenses!: number;
  amountMonthBalance!: number;

  subscriptionIncomes!: Subscription;
  subscriptionExpenses!: Subscription;

  private monthAmountService = inject(MonthAmountService)

  ngOnInit(): void {
    
    this.subscriptionIncomes = this.monthAmountService.getMonthIncomes().subscribe((amount: number) => {
      this.amountMonthIncomes = amount;
      this.amountMonthBalance = this.amountMonthIncomes - this.amountMonthExpenses
    });
 
    this.subscriptionExpenses = this.monthAmountService.getMonthExpenses().subscribe((amount: number) => {
      this.amountMonthExpenses = amount;
      this.amountMonthBalance = this.amountMonthIncomes - this.amountMonthExpenses
    })
  }

  ngOnDEstroy() {
    this.subscriptionIncomes.unsubscribe();
    this.subscriptionExpenses.unsubscribe()
  }

}
