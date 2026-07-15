import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitSearchComponent } from './visit-search.component';

describe('VisitSearchComponent', () => {
  let component: VisitSearchComponent;
  let fixture: ComponentFixture<VisitSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
