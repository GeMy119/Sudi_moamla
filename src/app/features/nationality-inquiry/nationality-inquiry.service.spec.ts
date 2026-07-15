import { TestBed } from '@angular/core/testing';

import { NationalityInquiryService } from './nationality-inquiry.service';

describe('NationalityInquiryService', () => {
  let service: NationalityInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalityInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
