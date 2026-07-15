import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqamaSearchComponent } from './iqama-search.component';

describe('IqamaSearchComponent', () => {
  let component: IqamaSearchComponent;
  let fixture: ComponentFixture<IqamaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IqamaSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IqamaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
