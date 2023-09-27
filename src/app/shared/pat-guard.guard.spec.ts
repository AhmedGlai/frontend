import { TestBed } from '@angular/core/testing';

import { PatGuardGuard } from './pat-guard.guard';

describe('PatGuardGuard', () => {
  let guard: PatGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
