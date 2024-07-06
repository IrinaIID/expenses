import { Component, OnInit, inject } from '@angular/core';
import { MonthAmountService } from './month-amount.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cards-month-block',
  templateUrl: './cards-month-block.component.html',
  styleUrls: ['./cards-month-block.component.scss'],
})
export class CardsMonthBlockComponent implements OnInit {

  private monthAmountService = inject(MonthAmountService);

  amountMonthIncomes = 0;
  amountMonthExpenses = 0;
  amountMonthBalance = 0;
  private ngUnsubscribe$ = new Subject<void>();


  ngOnInit(): void {

    this.monthAmountService.authUpdate$
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(() => {
      this.monthAmountService.getMonthIncomes()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((amount: number) => {
        this.amountMonthIncomes = amount;
        this.amountMonthBalance = this.amountMonthIncomes - this.amountMonthExpenses;
      });

      this.monthAmountService.getMonthExpenses()
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe((amount: number) => {
          this.amountMonthExpenses = amount;
          this.amountMonthBalance = this.amountMonthIncomes - this.amountMonthExpenses;
      });
    })
  }

  ngOnDEstroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}
