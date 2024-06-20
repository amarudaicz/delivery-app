import { TestBed } from '@angular/core/testing';

import { LoaderHttpService } from './loader-http.service';

describe('LoaderHttpService', () => {
  let service: LoaderHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
