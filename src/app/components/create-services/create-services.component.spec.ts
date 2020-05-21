import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServicesComponent } from './create-services.component';

describe('CreateServicesComponent', () => {
  let component: CreateServicesComponent;
  let fixture: ComponentFixture<CreateServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
