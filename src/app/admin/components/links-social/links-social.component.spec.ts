import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksSocialComponent } from './links-social.component';

describe('LinksSocialComponent', () => {
  let component: LinksSocialComponent;
  let fixture: ComponentFixture<LinksSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinksSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
