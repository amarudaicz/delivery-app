import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLocalClosedComponent } from './alert-local-closed.component';

describe('AlertLocalClosedComponent', () => {
  let component: AlertLocalClosedComponent;
  let fixture: ComponentFixture<AlertLocalClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertLocalClosedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertLocalClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
