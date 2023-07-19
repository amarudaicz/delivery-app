import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingConfigComponent } from './shipping-config.component';

describe('ShippingConfigComponent', () => {
  let component: ShippingConfigComponent;
  let fixture: ComponentFixture<ShippingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
