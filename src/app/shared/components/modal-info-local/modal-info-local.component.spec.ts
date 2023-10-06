import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoLocalComponent } from './modal-info-local.component';

describe('ModalInfoLocalComponent', () => {
  let component: ModalInfoLocalComponent;
  let fixture: ComponentFixture<ModalInfoLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
