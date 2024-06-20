import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertClosedComponent } from './alert-closed.component';

describe('AlertClosedComponent', () => {
  let component: AlertClosedComponent;
  let fixture: ComponentFixture<AlertClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertClosedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
