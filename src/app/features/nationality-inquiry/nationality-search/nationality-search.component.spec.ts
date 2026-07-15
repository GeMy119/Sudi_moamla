import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalitySearchComponent } from './nationality-search.component';

describe('NationalitySearchComponent', () => {
  let component: NationalitySearchComponent;
  let fixture: ComponentFixture<NationalitySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalitySearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
