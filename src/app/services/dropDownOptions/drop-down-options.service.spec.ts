import { TestBed } from '@angular/core/testing';

import { DropDownOptionsService } from './drop-down-options.service';

describe('DropDownOptionsService', () => {
  let service: DropDownOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropDownOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
