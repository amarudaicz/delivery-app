import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureInHomeComponent } from './feature-in-home.component';

describe('FeatureInHomeComponent', () => {
  let component: FeatureInHomeComponent;
  let fixture: ComponentFixture<FeatureInHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureInHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureInHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
