import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsOrderComponent } from './modal-details-order.component';

describe('ModalDetailsOrderComponent', () => {
  let component: ModalDetailsOrderComponent;
  let fixture: ComponentFixture<ModalDetailsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
