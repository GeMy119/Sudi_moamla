import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarigeSearchComponent } from './marige-search.component';

describe('MarigeSearchComponent', () => {
  let component: MarigeSearchComponent;
  let fixture: ComponentFixture<MarigeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarigeSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarigeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
