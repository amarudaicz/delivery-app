import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryCardsComponent } from './primary-cards.component';

describe('PrimaryCardsComponent', () => {
  let component: PrimaryCardsComponent;
  let fixture: ComponentFixture<PrimaryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
