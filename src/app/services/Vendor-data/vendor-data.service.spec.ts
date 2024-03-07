import { TestBed } from '@angular/core/testing';

import { VendorDataService } from './vendor-data.service';

describe('VendorDataService', () => {
  let service: VendorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
