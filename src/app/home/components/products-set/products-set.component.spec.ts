import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSetComponent } from './products-set.component';

describe('ProductsSetComponent', () => {
  let component: ProductsSetComponent;
  let fixture: ComponentFixture<ProductsSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
