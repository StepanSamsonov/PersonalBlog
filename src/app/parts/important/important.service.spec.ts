import { TestBed, inject } from '@angular/core/testing';

import { ImportantService } from './important.service';

describe('ImportantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportantService]
    });
  });

  it('should be created', inject([ImportantService], (service: ImportantService) => {
    expect(service).toBeTruthy();
  }));
});
