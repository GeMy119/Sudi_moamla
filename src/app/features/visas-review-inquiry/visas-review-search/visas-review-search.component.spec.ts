import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisasReviewSearchComponent } from './visas-review-search.component';

describe('VisasReviewSearchComponent', () => {
  let component: VisasReviewSearchComponent;
  let fixture: ComponentFixture<VisasReviewSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisasReviewSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisasReviewSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
