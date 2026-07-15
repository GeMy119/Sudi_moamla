import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertResultComponent } from './alert-result.component';

describe('AlertResultComponent', () => {
  let component: AlertResultComponent;
  let fixture: ComponentFixture<AlertResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
