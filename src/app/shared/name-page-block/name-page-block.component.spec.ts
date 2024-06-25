import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePageBlockComponent } from './name-page-block.component';

describe('NamePageBlockComponent', () => {
  let component: NamePageBlockComponent;
  let fixture: ComponentFixture<NamePageBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamePageBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamePageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
