import { TestBed } from '@angular/core/testing';

import { IqamaInquiryService } from './iqama-inquiry.service';

describe('IqamaInquiryService', () => {
  let service: IqamaInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IqamaInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
