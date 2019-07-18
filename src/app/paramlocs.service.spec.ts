import { TestBed } from '@angular/core/testing';

import { ParamlocsService } from './paramlocs.service';

describe('ParamlocsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParamlocsService = TestBed.get(ParamlocsService);
    expect(service).toBeTruthy();
  });
});
