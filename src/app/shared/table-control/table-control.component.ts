import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { QueryFieldFilterConstraint, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EXPENSES_CATEGORIES, INCOME_CATEGORIES } from 'src/app/add-transaction/const';

@Component({
  selector: 'app-table-control',
  templateUrl: './table-control.component.html',
  styleUrls: ['./table-control.component.scss'],
})
export class TableControlComponent implements OnInit {

  private formBuilder = inject(FormBuilder);

  @Output() queryEvent = new EventEmitter<QueryFieldFilterConstraint[]>();

  allCategories: string[] = [
    ...EXPENSES_CATEGORIES.map((item) => item.category),
    ...INCOME_CATEGORIES.map((item) => item.category),
  ].sort();

  allSortOptions: string[] = ['date', 'type', 'amount', 'regularity', 'title', 'category'];
  queriesForm!: FormGroup;
  allQueries: QueryFieldFilterConstraint[] = [];


  ngOnInit(): void {
    this.queriesForm = this.formBuilder.group({
      search: null,
      dateFrom: null,
      dateTo: null,
      category: null,
      type: null,
    });
  }

  cleanInputData(nameInput: string): void {
    this.queriesForm.get(nameInput)?.reset();
    this.setQueries();
  }

  filterSearch(): void {
    this.queryEvent.emit(this.allQueries);
  }

  setQueries(): void {
    this.allQueries = [];

    if (this.queriesForm.value.dateFrom) {
      const startDay = new Date(this.queriesForm.value.dateFrom).getTime();
      this.allQueries.push(where('date', '>=', startDay));
    }

    if (this.queriesForm.value.dateTo) {
      const endtDay = new Date(this.queriesForm.value.dateTo).getTime();
      this.allQueries.push(where('date', '<=', endtDay));
    }

    if (this.queriesForm.value.category) {
      this.allQueries.push(where('category', '==', this.queriesForm.value.category));
    }

    if (this.queriesForm.value.type === 'income') {
      this.allQueries.push(where('type', '==', 'income'));
    }

    if (this.queriesForm.value.type === 'expense') {
      this.allQueries.push(where('type', '==', 'expense'));
    }

    this.filterSearch();
  }
}
