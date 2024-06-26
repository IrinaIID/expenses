import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TypeTransaction } from 'src/app/shared/interfaces';
import { EXPENSES_CATEGORIES, INCOME_CATEGORIES } from '../const';
import { Category } from '../interfaces';



@Component({
  selector: 'app-form-transaction',
  templateUrl: './form-transaction.component.html',
  styleUrls: ['./form-transaction.component.scss'],
})
export class FormTransactionComponent {

  typeTransaction!: TypeTransaction;
  categoriesArr!: Category[];

  private formBuilder = inject(FormBuilder);

  transactionForm = this.formBuilder.group({
    idTransaction: Date.now(),
    idUser: 1313,
    type: 'null',
    title: '',
    description: '',
    count: 0,
    regularity: false,
    category: '',
    subcategories: [],
    date: new Date(),
  });

  setIncomeTypeTransaction(): void {
    this.typeTransaction = 'income';
    this.categoriesArr = INCOME_CATEGORIES;
  }

  setExpenseTypeTransaction(): void {
    this.typeTransaction = 'expense';
    this.categoriesArr = EXPENSES_CATEGORIES;
  }

  submitForm(): void {
    if (this.transactionForm?.valid) {
      console.log('Form data:', this.transactionForm.value);
    }
  }
}
