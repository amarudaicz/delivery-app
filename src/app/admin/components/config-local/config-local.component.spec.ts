import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigLocalComponent } from './config-local.component';

describe('ConfigLocalComponent', () => {
  let component: ConfigLocalComponent;
  let fixture: ComponentFixture<ConfigLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
