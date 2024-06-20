import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInitComponent } from './banner-init.component';

describe('BannerInitComponent', () => {
  let component: BannerInitComponent;
  let fixture: ComponentFixture<BannerInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
