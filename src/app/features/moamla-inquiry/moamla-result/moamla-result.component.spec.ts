import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoamlaResultComponent } from './moamla-result.component';

describe('MoamlaResultComponent', () => {
  let component: MoamlaResultComponent;
  let fixture: ComponentFixture<MoamlaResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoamlaResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoamlaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
