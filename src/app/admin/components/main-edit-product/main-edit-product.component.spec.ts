import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEditProductComponent } from './main-edit-product.component';

describe('MainEditProductComponent', () => {
  let component: MainEditProductComponent;
  let fixture: ComponentFixture<MainEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEditProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
