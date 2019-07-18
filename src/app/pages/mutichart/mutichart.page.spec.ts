import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutichartPage } from './mutichart.page';

describe('MutichartPage', () => {
  let component: MutichartPage;
  let fixture: ComponentFixture<MutichartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutichartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutichartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
