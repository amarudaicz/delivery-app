import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureShippingComponent } from './feature-shipping.component';

describe('FeatureShippingComponent', () => {
  let component: FeatureShippingComponent;
  let fixture: ComponentFixture<FeatureShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
