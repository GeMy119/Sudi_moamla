import { TestBed } from '@angular/core/testing';

import { FamilyVisasInquiryService } from './family-visas-inquiry.service';

describe('FamilyVisasInquiryService', () => {
  let service: FamilyVisasInquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyVisasInquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
