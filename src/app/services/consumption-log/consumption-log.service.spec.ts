import { TestBed } from '@angular/core/testing';

import { ConsumptionLogService } from './consumption-log.service';

describe('ConsumptionLogService', () => {
  let service: ConsumptionLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumptionLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
