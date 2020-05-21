import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSectionComponent } from './close-section.component';

describe('CloseSectionComponent', () => {
  let component: CloseSectionComponent;
  let fixture: ComponentFixture<CloseSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
