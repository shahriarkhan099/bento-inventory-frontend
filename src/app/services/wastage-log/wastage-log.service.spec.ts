import { TestBed } from '@angular/core/testing';

import { WastageLogService } from './wastage-log.service';

describe('WastageLogService', () => {
  let service: WastageLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WastageLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
