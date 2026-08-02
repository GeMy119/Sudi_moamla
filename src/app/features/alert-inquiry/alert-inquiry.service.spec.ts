import { TestBed } from '@angular/core/testing';

import { AlertInquiryService } from './alert-inquiry.service';

describe('AlertInquiryService', () => {
  let service: AlertInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
