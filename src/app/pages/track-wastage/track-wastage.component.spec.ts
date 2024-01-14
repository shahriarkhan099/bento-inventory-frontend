import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWastageComponent } from './track-wastage.component';

describe('TrackWastageComponent', () => {
  let component: TrackWastageComponent;
  let fixture: ComponentFixture<TrackWastageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackWastageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackWastageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
