import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyVisasResultComponent } from './family-visas-result.component';

describe('FamilyVisasResultComponent', () => {
  let component: FamilyVisasResultComponent;
  let fixture: ComponentFixture<FamilyVisasResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyVisasResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyVisasResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
