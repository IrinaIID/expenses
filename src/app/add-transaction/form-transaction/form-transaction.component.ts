import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionDraft, TypeTransaction } from 'src/app/shared/interfaces';
import { EXPENSES_CATEGORIES, INCOME_CATEGORIES } from '../const';
import { Category } from '../interfaces';
import { TransactionFirebaseService } from 'src/app/shared/services/transaction-firebase.service';
import { AuthService } from 'src/app/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-transaction',
  templateUrl: './form-transaction.component.html',
  styleUrls: ['./form-transaction.component.scss'],
})
export class FormTransactionComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private transactionService = inject(TransactionFirebaseService);
  private authService = inject(AuthService);

  typeTransaction: TypeTransaction | undefined;
  categoriesArr!: Category[] | undefined;
  transactionForm!: FormGroup;  
  private ngUnsubscribe$ = new Subject<void>();

  subcategories: string[] = [];
  userId!: string;

  ngOnInit(): void {

    this.transactionForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: '',
      regularity: ['no', Validators.required],
      category: ['', Validators.required],
      subcategories: new FormArray([]),
      date: new Date(),
      amount: [null, Validators.required],
    });

    this.authService.getUser()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        if (data?.uid) this.userId = data.uid;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }

  get subcategoriesFormArray() {
    return this.transactionForm.controls['subcategories'] as FormArray;
  }

  private addCheckboxes() {
    this.subcategoriesFormArray.clear();
    // recheck this comment for me
    // this.subcategoriesFormArray = new Array().fill(new FormControl(false), 0, this.subcategories.length - 1);
    this.subcategories.forEach(() => this.subcategoriesFormArray.push(new FormControl(false)));
  }

  setIncomeTypeTransaction(): void {
    this.transactionForm.setControl('type', new FormControl('income'));
    this.typeTransaction = 'income';
    this.subcategoriesFormArray.clear();
    this.categoriesArr = INCOME_CATEGORIES;
  }

  setExpenseTypeTransaction(): void {
    this.transactionForm.setControl('type', new FormControl('expense'));
    this.typeTransaction = 'expense';
    this.subcategoriesFormArray.clear();
    this.categoriesArr = EXPENSES_CATEGORIES;
  }

  setSubcategories(): void {
    this.subcategories = this.transactionForm.value.category.subcategories;
    this.addCheckboxes();
  }

  submitForm(): void {
    if (this.transactionForm?.valid) {
      const arrSubcategories = this.transactionForm.value.subcategories.map((item: boolean | string, index: number) => {
        return item === true ? (item = this.subcategories[index]) : item;
      });
      const arrSubcategoriesForTransaction = arrSubcategories.filter((item: boolean | string) => item !== false);

      const objSendForm: TransactionDraft = {
        idUser: this.userId,
        type: this.transactionForm.value.type,
        title: this.transactionForm.value.title,
        description: this.transactionForm.value.description,
        amount: this.transactionForm.value.amount,
        regularity: this.transactionForm.value.regularity,
        category: this.transactionForm.value.category.category,
        subcategories: arrSubcategoriesForTransaction,
        date: new Date(this.transactionForm.value.date).getTime() || new Date().getTime(),
      };

      this.transactionService.addTransaction(objSendForm);

      this.transactionForm.reset();
      this.typeTransaction = null;
    }
  }
}
