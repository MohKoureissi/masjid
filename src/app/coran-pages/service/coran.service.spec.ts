import { TestBed } from '@angular/core/testing';

import { CoranService } from './coran.service';

describe('CoranService', () => {
  let service: CoranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
