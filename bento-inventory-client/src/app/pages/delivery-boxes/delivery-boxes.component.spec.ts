import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBoxesComponent } from './delivery-boxes.component';

describe('InventoryBoxesComponent', () => {
  let component: DeliveryBoxesComponent;
  let fixture: ComponentFixture<DeliveryBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryBoxesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
