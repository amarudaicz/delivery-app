import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPlanBasicComponent } from './info-plan-basic.component';

describe('InfoPlanBasicComponent', () => {
  let component: InfoPlanBasicComponent;
  let fixture: ComponentFixture<InfoPlanBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPlanBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPlanBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
