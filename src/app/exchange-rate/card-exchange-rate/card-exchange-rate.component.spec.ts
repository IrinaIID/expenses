import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExchangeRateComponent } from './card-exchange-rate.component';

describe('CardExchangeRateComponent', () => {
  let component: CardExchangeRateComponent;
  let fixture: ComponentFixture<CardExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardExchangeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
