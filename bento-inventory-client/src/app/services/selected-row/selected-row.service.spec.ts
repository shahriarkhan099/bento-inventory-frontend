import { TestBed } from '@angular/core/testing';

import { SelectedRowService } from './selected-row.service';

describe('SelectedRowService', () => {
  let service: SelectedRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
