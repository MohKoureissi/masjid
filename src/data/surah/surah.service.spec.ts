import { TestBed } from '@angular/core/testing';

import { SurahService } from './surah.service';

describe('RecitationService', () => {
  let service: SurahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
