import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarigeResultComponent } from './marige-result.component';

describe('MarigeResultComponent', () => {
  let component: MarigeResultComponent;
  let fixture: ComponentFixture<MarigeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarigeResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarigeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
