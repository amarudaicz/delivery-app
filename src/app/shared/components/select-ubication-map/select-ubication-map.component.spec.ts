import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUbicationMapComponent } from './select-ubication-map.component';

describe('SelectUbicationMapComponent', () => {
  let component: SelectUbicationMapComponent;
  let fixture: ComponentFixture<SelectUbicationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUbicationMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUbicationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
