import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNewProductComponent } from './main-new-product.component';

describe('MainNewProductComponent', () => {
  let component: MainNewProductComponent;
  let fixture: ComponentFixture<MainNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNewProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
