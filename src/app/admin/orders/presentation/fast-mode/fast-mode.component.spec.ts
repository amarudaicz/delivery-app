import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastModeComponent } from './fast-mode.component';

describe('FastModeComponent', () => {
  let component: FastModeComponent;
  let fixture: ComponentFixture<FastModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
