import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBuyerFieldsComponent } from './set-buyer-fields.component';

describe('SetBuyerFieldsComponent', () => {
  let component: SetBuyerFieldsComponent;
  let fixture: ComponentFixture<SetBuyerFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetBuyerFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetBuyerFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
