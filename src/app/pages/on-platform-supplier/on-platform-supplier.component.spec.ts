import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnPlatformSupplierComponent } from './on-platform-supplier.component';

describe('OnPlatformSupplierComponent', () => {
  let component: OnPlatformSupplierComponent;
  let fixture: ComponentFixture<OnPlatformSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnPlatformSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnPlatformSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
