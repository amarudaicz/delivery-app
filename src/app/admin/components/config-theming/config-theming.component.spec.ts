import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigThemingComponent } from './config-theming.component';

describe('ConfigThemingComponent', () => {
  let component: ConfigThemingComponent;
  let fixture: ComponentFixture<ConfigThemingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigThemingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigThemingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
