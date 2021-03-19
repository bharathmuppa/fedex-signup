// Copyright Fedex 2021

import { TestBed } from '@angular/core/testing';

import { AuthConfigService } from './client-configured-messages.service';

describe('AuthConfigService', () => {
  let service: AuthConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
