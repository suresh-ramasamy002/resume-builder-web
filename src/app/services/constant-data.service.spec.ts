import { TestBed } from '@angular/core/testing';

import { ConstantDataService } from './constant-data.service';

describe('ConstantDataService', () => {
  let service: ConstantDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstantDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
