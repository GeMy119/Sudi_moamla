import { TestBed } from '@angular/core/testing';

import { VisitInquiryService } from './visit-inquiry.service';

describe('VisitInquiryService', () => {
  let service: VisitInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
