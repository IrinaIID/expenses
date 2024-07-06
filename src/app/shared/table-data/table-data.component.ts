import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-data[dataKeys][dataTable]',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent<T = any> {
  @Input() dataKeys!: (keyof T)[];
  @Input() dataTable!: T[] | null;

  @Output() idDeleteEvent = new EventEmitter<T>();

  chooseId(row: T) {
    this.idDeleteEvent.emit(row);
  }
}
