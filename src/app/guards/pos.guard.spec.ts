import { TestBed } from '@angular/core/testing';

import { PosGuard } from './pos.guard';

describe('PosGuard', () => {
  let guard: PosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
