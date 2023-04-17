import { TestBed } from '@angular/core/testing';

import { CodePageServiceService } from './code-page-service.service';

describe('CodePageServiceService', () => {
  let service: CodePageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodePageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
