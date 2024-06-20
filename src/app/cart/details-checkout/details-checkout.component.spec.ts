import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCheckoutComponent } from './details-checkout.component';

describe('DetailsCheckoutComponent', () => {
  let component: DetailsCheckoutComponent;
  let fixture: ComponentFixture<DetailsCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
