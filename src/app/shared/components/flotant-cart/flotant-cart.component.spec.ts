import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlotantCartComponent } from './flotant-cart.component';

describe('FlotantCartComponent', () => {
  let component: FlotantCartComponent;
  let fixture: ComponentFixture<FlotantCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlotantCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlotantCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
