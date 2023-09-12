import { TestBed } from '@angular/core/testing';

import { ProgramService } from './programme.service';

describe('ProgrammeService', () => {
  let service: ProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
