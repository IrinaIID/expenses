import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transaction, TypeTransaction } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-form-transaction',
  templateUrl: './form-transaction.component.html',
  styleUrls: ['./form-transaction.component.scss']
})
export class FormTransactionComponent implements OnInit {

  typeTransaction!: TypeTransaction;

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
    date: new Date()
  })

  ngOnInit(): void {

  }

  setIncomeTypeTransaction(): void {
    this.typeTransaction = 'income'
  }

  setExpenseTypeTransaction(): void {
    this.typeTransaction = 'expense'
  }

  submitForm(): void {
    if (this.transactionForm?.valid) {
      console.log('Form data:', this.transactionForm.value);
    }
  }

}
