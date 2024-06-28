import { TestBed } from '@angular/core/testing';

import { TransactionFirebaseService } from './transaction-firebase.service';

describe('TransactionFirebaseService', () => {
  let service: TransactionFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
