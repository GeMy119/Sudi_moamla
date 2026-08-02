import { TestBed } from '@angular/core/testing';

import { ProfessionInquiryService } from './profession-inquiry.service';

describe('ProfessionInquiryService', () => {
  let service: ProfessionInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
