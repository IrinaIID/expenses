import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExchangeRateComponent } from './table-exchange-rate.component';

describe('TableExchangeRateComponent', () => {
  let component: TableExchangeRateComponent;
  let fixture: ComponentFixture<TableExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableExchangeRateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
