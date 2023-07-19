import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSchedulesComponent } from './main-schedules.component';

describe('MainSchedulesComponent', () => {
  let component: MainSchedulesComponent;
  let fixture: ComponentFixture<MainSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
