import { TestBed } from '@angular/core/testing';

import { OnPlatformSupplierService } from './on-platform-supplier.service';

describe('OnPlatformSupplierService', () => {
  let service: OnPlatformSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnPlatformSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
