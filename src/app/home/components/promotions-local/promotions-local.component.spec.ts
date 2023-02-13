import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsLocalComponent } from './promotions-local.component';

describe('PromotionsLocalComponent', () => {
  let component: PromotionsLocalComponent;
  let fixture: ComponentFixture<PromotionsLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
