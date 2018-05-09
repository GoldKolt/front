import { TestBed, inject } from '@angular/core/testing';

import { TypeOperationService } from './type-operation.service';

describe('TypeOperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeOperationService]
    });
  });

  it('should be created', inject([TypeOperationService], (service: TypeOperationService) => {
    expect(service).toBeTruthy();
  }));
});
