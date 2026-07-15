import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionSeaechComponent } from './profession-seaech.component';

describe('ProfessionSeaechComponent', () => {
  let component: ProfessionSeaechComponent;
  let fixture: ComponentFixture<ProfessionSeaechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionSeaechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionSeaechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
