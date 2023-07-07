import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerQrComponent } from './banner-qr.component';

describe('BannerQrComponent', () => {
  let component: BannerQrComponent;
  let fixture: ComponentFixture<BannerQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
