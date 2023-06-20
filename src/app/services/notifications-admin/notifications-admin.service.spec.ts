import { TestBed } from '@angular/core/testing';

import { NotificationsAdminService } from './notifications-admin.service';

describe('NotificationsAdminService', () => {
  let service: NotificationsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
