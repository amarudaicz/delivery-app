import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonInstallComponent } from './button-install.component';

describe('ButtonInstallComponent', () => {
  let component: ButtonInstallComponent;
  let fixture: ComponentFixture<ButtonInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonInstallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
