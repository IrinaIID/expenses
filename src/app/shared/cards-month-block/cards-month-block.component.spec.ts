import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsMonthBlockComponent } from './cards-month-block.component';

describe('CardsMonthBlockComponent', () => {
  let component: CardsMonthBlockComponent;
  let fixture: ComponentFixture<CardsMonthBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsMonthBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardsMonthBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
