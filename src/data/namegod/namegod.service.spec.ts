import { TestBed } from '@angular/core/testing';

import { NamegodService } from './namegod.service';

describe('NamegodService', () => {
  let service: NamegodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NamegodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
