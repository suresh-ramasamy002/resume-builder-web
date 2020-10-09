import { TestBed } from '@angular/core/testing';

import { CoreDataService } from './core-data.service';

describe('CoreDataServiceService', () => {
  let service: CoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
