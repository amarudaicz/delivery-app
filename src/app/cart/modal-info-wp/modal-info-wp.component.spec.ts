import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoWpComponent } from './modal-info-wp.component';

describe('ModalInfoWpComponent', () => {
  let component: ModalInfoWpComponent;
  let fixture: ComponentFixture<ModalInfoWpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoWpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoWpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
