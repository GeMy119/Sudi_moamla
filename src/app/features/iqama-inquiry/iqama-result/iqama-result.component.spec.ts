import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqamaResultComponent } from './iqama-result.component';

describe('IqamaResultComponent', () => {
  let component: IqamaResultComponent;
  let fixture: ComponentFixture<IqamaResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IqamaResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IqamaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
