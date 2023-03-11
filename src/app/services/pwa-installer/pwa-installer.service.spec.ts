import { TestBed } from '@angular/core/testing';

import { PwaInstallerService } from './pwa-installer.service';

describe('PwaInstallerService', () => {
  let service: PwaInstallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaInstallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
