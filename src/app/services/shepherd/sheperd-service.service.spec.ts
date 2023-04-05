import { TestBed } from '@angular/core/testing';

import { SheperdServiceService } from './sheperd-service.service';

describe('SheperdServiceService', () => {
  let service: SheperdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheperdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
