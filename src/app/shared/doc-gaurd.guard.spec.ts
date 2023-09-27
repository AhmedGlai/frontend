import { TestBed } from '@angular/core/testing';

import { DocGaurdGuard } from './doc-gaurd.guard';

describe('DocGaurdGuard', () => {
  let guard: DocGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DocGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
