import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCreditDebitComponent } from './feature-credit-debit.component';

describe('FeatureCreditDebitComponent', () => {
  let component: FeatureCreditDebitComponent;
  let fixture: ComponentFixture<FeatureCreditDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureCreditDebitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCreditDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
