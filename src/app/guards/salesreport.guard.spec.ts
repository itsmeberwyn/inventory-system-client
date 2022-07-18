import { TestBed } from '@angular/core/testing';

import { SalesreportGuard } from './salesreport.guard';

describe('SalesreportGuard', () => {
  let guard: SalesreportGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalesreportGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
