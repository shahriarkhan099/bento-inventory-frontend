import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAutopilotComponent } from './order-autopilot.component';

describe('OrderAutopilotComponent', () => {
  let component: OrderAutopilotComponent;
  let fixture: ComponentFixture<OrderAutopilotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderAutopilotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAutopilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
