import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionSearchComponent } from './profession-search.component';

describe('ProfessionSearchComponent', () => {
  let component: ProfessionSearchComponent;
  let fixture: ComponentFixture<ProfessionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfessionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
