import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDurationsComponent } from './category-durations.component';

describe('CategoryDurationsComponent', () => {
  let component: CategoryDurationsComponent;
  let fixture: ComponentFixture<CategoryDurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
