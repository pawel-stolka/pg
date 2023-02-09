import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCustomActionsComponent } from './weather-custom-actions.component';

describe('WeatherCustomActionsComponent', () => {
  let component: WeatherCustomActionsComponent;
  let fixture: ComponentFixture<WeatherCustomActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherCustomActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherCustomActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
