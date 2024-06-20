import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesLocalComponent } from './features-local.component';

describe('FeaturesLocalComponent', () => {
  let component: FeaturesLocalComponent;
  let fixture: ComponentFixture<FeaturesLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
