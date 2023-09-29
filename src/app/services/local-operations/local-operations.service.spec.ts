import { TestBed } from '@angular/core/testing';

import { LocalOperationsService } from './local-operations.service';

describe('LocalOperationsService', () => {
  let service: LocalOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
