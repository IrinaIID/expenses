import { TestBed } from '@angular/core/testing';

import { MonthAmountService } from './month-amount.service';

describe('MonthAmountService', () => {
  let service: MonthAmountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthAmountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
