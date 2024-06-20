import { TestBed } from '@angular/core/testing';

import { MysqlRepositoryService } from './mysql-repository.service';

describe('MysqlRepositoryService', () => {
  let service: MysqlRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MysqlRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
