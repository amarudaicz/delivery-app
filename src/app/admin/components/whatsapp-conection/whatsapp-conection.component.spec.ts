import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappConectionComponent } from './whatsapp-conection.component';

describe('WhatsappConectionComponent', () => {
  let component: WhatsappConectionComponent;
  let fixture: ComponentFixture<WhatsappConectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappConectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappConectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
