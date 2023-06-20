import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOptionsProductComponent } from './set-options-product.component';

describe('SetOptionsProductComponent', () => {
  let component: SetOptionsProductComponent;
  let fixture: ComponentFixture<SetOptionsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetOptionsProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetOptionsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
