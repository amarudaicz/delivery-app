import { TestBed } from '@angular/core/testing';

import { PreviewCategoryService } from './preview-category.service';

describe('PreviewCategoryService', () => {
  let service: PreviewCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
