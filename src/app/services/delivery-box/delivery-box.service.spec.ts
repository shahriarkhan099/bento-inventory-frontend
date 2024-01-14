import { TestBed } from '@angular/core/testing';

import { DeliveryBoxService } from './delivery-box.service';

describe('DeliveryBoxService', () => {
  let service: DeliveryBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
