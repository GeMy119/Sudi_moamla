import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitResultComponent } from './visit-result.component';

describe('VisitResultComponent', () => {
  let component: VisitResultComponent;
  let fixture: ComponentFixture<VisitResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
