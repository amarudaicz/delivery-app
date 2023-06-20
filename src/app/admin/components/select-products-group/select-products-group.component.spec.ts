import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductsGroupComponent } from './select-products-group.component';

describe('SelectProductsGroupComponent', () => {
  let component: SelectProductsGroupComponent;
  let fixture: ComponentFixture<SelectProductsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProductsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProductsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
