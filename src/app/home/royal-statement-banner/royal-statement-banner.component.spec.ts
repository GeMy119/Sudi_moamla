import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoyalStatementBannerComponent } from './royal-statement-banner.component';

describe('RoyalStatementBannerComponent', () => {
  let component: RoyalStatementBannerComponent;
  let fixture: ComponentFixture<RoyalStatementBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoyalStatementBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoyalStatementBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
