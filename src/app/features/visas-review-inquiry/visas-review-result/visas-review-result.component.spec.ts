import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisasReviewResultComponent } from './visas-review-result.component';

describe('VisasReviewResultComponent', () => {
  let component: VisasReviewResultComponent;
  let fixture: ComponentFixture<VisasReviewResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisasReviewResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisasReviewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
