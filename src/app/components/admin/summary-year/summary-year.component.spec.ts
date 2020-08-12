import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryYearComponent } from './summary-year.component';

describe('SummaryYearComponent', () => {
  let component: SummaryYearComponent;
  let fixture: ComponentFixture<SummaryYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
