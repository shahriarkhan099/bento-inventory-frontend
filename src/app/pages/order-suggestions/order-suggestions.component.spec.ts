import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuggestionsComponent } from './order-suggestions.component';

describe('OrderSuggestionsComponent', () => {
  let component: OrderSuggestionsComponent;
  let fixture: ComponentFixture<OrderSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSuggestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
