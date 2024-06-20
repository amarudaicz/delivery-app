import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInfoAppComponent } from './main-info-app.component';

describe('MainInfoAppComponent', () => {
  let component: MainInfoAppComponent;
  let fixture: ComponentFixture<MainInfoAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInfoAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainInfoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
