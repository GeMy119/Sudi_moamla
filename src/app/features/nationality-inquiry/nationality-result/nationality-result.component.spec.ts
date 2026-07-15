import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalityResultComponent } from './nationality-result.component';

describe('NationalityResultComponent', () => {
  let component: NationalityResultComponent;
  let fixture: ComponentFixture<NationalityResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationalityResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
