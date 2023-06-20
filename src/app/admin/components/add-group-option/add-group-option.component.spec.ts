import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupOptionComponent } from './add-group-option.component';

describe('AddGroupOptionComponent', () => {
  let component: AddGroupOptionComponent;
  let fixture: ComponentFixture<AddGroupOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGroupOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroupOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
