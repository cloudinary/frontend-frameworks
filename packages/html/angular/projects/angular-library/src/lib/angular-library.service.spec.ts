import { TestBed, inject } from '@angular/core/testing';

import { AngularLibraryService } from './angular-library.service';

describe('AngularLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularLibraryService]
    });
  });

  it('should be created', inject([AngularLibraryService], (service: AngularLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
