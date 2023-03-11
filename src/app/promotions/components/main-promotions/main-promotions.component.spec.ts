import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPromotionsComponent } from './main-promotions.component';

describe('MainPromotionsComponent', () => {
  let component: MainPromotionsComponent;
  let fixture: ComponentFixture<MainPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
