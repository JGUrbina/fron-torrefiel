import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumPieChartComponent } from './medium-pie-chart.component';

describe('MediumPieChartComponent', () => {
  let component: MediumPieChartComponent;
  let fixture: ComponentFixture<MediumPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
