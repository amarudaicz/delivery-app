import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLandingComponent } from './layout-landing.component';

describe('LayoutLandingComponent', () => {
  let component: LayoutLandingComponent;
  let fixture: ComponentFixture<LayoutLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
