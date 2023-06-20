import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLocalComponent } from './card-local.component';

describe('CardLocalComponent', () => {
  let component: CardLocalComponent;
  let fixture: ComponentFixture<CardLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
