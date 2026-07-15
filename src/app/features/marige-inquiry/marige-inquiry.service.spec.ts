import { TestBed } from '@angular/core/testing';

import { MarigeInquiryService } from './marige-inquiry.service';

describe('MarigeInquiryService', () => {
  let service: MarigeInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarigeInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
