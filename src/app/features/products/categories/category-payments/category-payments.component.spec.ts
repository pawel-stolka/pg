import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPaymentsComponent } from './category-payments.component';

describe('CategoryPaymentsComponent', () => {
  let component: CategoryPaymentsComponent;
  let fixture: ComponentFixture<CategoryPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
