import { TestBed } from '@angular/core/testing';

import { RecitationService } from './recitation.service';

describe('RecitationService', () => {
  let service: RecitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
