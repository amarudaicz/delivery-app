import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowCreateAcountComponent } from './how-create-acount.component';

describe('HowCreateAcountComponent', () => {
  let component: HowCreateAcountComponent;
  let fixture: ComponentFixture<HowCreateAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowCreateAcountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowCreateAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
