import { TestBed } from '@angular/core/testing';

import { PreachService } from './preach.service';

describe('PreachService', () => {
  let service: PreachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
