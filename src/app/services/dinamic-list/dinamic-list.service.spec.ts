import { TestBed } from '@angular/core/testing';

import { DinamicListService } from './dinamic-list.service';

describe('DinamicListService', () => {
  let service: DinamicListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DinamicListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
