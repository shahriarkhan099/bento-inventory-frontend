import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryIngredientsComponent } from './inventory-ingredients.component';

describe('InventoryIngredientsComponent', () => {
  let component: InventoryIngredientsComponent;
  let fixture: ComponentFixture<InventoryIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryIngredientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
