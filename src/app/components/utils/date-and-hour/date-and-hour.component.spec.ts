import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAndHourComponent } from './date-and-hour.component';

describe('DateAndHourComponent', () => {
  let component: DateAndHourComponent;
  let fixture: ComponentFixture<DateAndHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateAndHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAndHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
