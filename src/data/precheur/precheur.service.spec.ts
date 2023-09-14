import { TestBed } from '@angular/core/testing';

import { PrecheurService } from './precheur.service';

describe('PrecheurService', () => {
  let service: PrecheurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecheurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
