import { TestBed } from '@angular/core/testing';

import { MoamlaInquiryService } from './moamla-inquiry.service';

describe('MoamlaInquiryService', () => {
  let service: MoamlaInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoamlaInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
