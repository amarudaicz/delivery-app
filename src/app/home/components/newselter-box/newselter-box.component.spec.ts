import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewselterBoxComponent } from './newselter-box.component';

describe('NewselterBoxComponent', () => {
  let component: NewselterBoxComponent;
  let fixture: ComponentFixture<NewselterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewselterBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewselterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
