import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionResultComponent } from './profession-result.component';

describe('ProfessionResultComponent', () => {
  let component: ProfessionResultComponent;
  let fixture: ComponentFixture<ProfessionResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
