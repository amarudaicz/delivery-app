import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionStateComponent } from './subscription-state.component';

describe('SubscriptionStateComponent', () => {
  let component: SubscriptionStateComponent;
  let fixture: ComponentFixture<SubscriptionStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
