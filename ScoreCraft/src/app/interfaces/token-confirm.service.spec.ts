import { TestBed } from '@angular/core/testing';

import { TokenConfirmService } from './token-confirm.service';

describe('TokenConfirmService', () => {
  let service: TokenConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
