import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoamlaSearchComponent } from './moamla-search.component';

describe('MoamlaSearchComponent', () => {
  let component: MoamlaSearchComponent;
  let fixture: ComponentFixture<MoamlaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoamlaSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoamlaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
