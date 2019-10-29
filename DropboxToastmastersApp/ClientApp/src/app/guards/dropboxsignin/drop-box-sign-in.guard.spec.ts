import { TestBed, async, inject } from '@angular/core/testing';

import { DropBoxSignInGuard } from './drop-box-sign-in.guard';

describe('DropBoxSignInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropBoxSignInGuard]
    });
  });

  it('should ...', inject([DropBoxSignInGuard], (guard: DropBoxSignInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
