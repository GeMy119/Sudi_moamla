import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSliderComponent } from './events-slider.component';

describe('EventsSliderComponent', () => {
  let component: EventsSliderComponent;
  let fixture: ComponentFixture<EventsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
