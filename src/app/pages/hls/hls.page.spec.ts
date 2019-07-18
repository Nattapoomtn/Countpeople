import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlsPage } from './hls.page';

describe('HlsPage', () => {
  let component: HlsPage;
  let fixture: ComponentFixture<HlsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
