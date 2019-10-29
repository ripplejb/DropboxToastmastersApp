import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });

  it('Generate UUID should generate a new UUID in the string format.', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service.generateUUID).Any(String);
  })
});
