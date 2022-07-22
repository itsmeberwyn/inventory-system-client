import { TestBed } from '@angular/core/testing';

import { InventoryGuard } from './inventory.guard';

describe('InventoryGuard', () => {
  let guard: InventoryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InventoryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
