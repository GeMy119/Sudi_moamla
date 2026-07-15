import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyVisasSearchComponent } from './family-visas-search.component';

describe('FamilyVisasSearchComponent', () => {
  let component: FamilyVisasSearchComponent;
  let fixture: ComponentFixture<FamilyVisasSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyVisasSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyVisasSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
