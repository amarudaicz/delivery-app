import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMethodsConfigComponent } from './payments-methods-config.component';

describe('PaymentsMethodsConfigComponent', () => {
  let component: PaymentsMethodsConfigComponent;
  let fixture: ComponentFixture<PaymentsMethodsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsMethodsConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsMethodsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
