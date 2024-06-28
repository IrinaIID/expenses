import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction, TypeTransaction } from 'src/app/shared/interfaces';
import { EXPENSES_CATEGORIES, INCOME_CATEGORIES } from '../const';
import { Category } from '../interfaces';
import { TransactionFirebaseService } from 'src/app/shared/services/transaction-firebase.service';



@Component({
  selector: 'app-form-transaction',
  templateUrl: './form-transaction.component.html',
  styleUrls: ['./form-transaction.component.scss'],
})
export class FormTransactionComponent implements OnInit{

  typeTransaction!: TypeTransaction;
  categoriesArr!: Category[];
  transactionForm!: FormGroup;
  subcategories: string[] = [];

  private formBuilder = inject(FormBuilder);
  private transactionService = inject(TransactionFirebaseService)

  get subcategoriesFormArray() {
    return this.transactionForm.controls['subcategories'] as FormArray;
  }

  private addCheckboxes() {

    this.subcategoriesFormArray.clear();
    // recheck this comment for me
    // this.subcategoriesFormArray = new Array().fill(new FormControl(false), 0, this.subcategories.length - 1);
    this.subcategories.forEach(() => this.subcategoriesFormArray.push(new FormControl(false)));

  }

  ngOnInit(): void {

    this.transactionForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: '',
      regularity: [false, Validators.required],
      category: ['', Validators.required],
      subcategories: new FormArray([]),
      date: new Date(),
      count: [null, Validators.required],
    });
  }

  setIncomeTypeTransaction(): void {
    this.transactionForm.setControl('type', new FormControl('income'))
    this.typeTransaction = 'income';
    this.subcategoriesFormArray.clear();
    this.categoriesArr = INCOME_CATEGORIES;
  }

  setExpenseTypeTransaction(): void {
    this.transactionForm.setControl('type', new FormControl('expense'))
    this.typeTransaction = 'expense';
    this.subcategoriesFormArray.clear();
    this.categoriesArr = EXPENSES_CATEGORIES;
  }

  setSubcategories(): void {
    this.subcategories = this.transactionForm.value.category.subcategories
    this.addCheckboxes();
  }

  submitForm(): void {
    if (this.transactionForm?.valid) {

      const arrSubcategories = this.transactionForm.value.subcategories.map((item: boolean | string, index: number) => {
        return item === true ? item = this.subcategories[index] : item
      })
      const arrSubcategoriesForTransaction = arrSubcategories.filter((item: boolean | string) => item !== false);

      const objSendForm: Transaction = {
        idTransaction: Date.now(),
        idUser: 28,
        type: this.transactionForm.value.type,
        title: this.transactionForm.value.title,
        description: this.transactionForm.value.description,
        count: this.transactionForm.value.count,
        regularity: this.transactionForm.value.regularity,
        category: this.transactionForm.value.category.category,
        subcategories: arrSubcategoriesForTransaction,
        date: this.transactionForm.value.date
      }

      console.log('Form data:', this.transactionForm.value);

      this.transactionService.addTransaction(objSendForm);
      
      this.transactionForm.reset();
      this.typeTransaction = null;
    }
  }

}