import { TestBed, inject } from '@angular/core/testing';

import { CarServiceDataService } from './car-service-data.service';

describe('CarServiceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarServiceDataService]
    });
  });

  it('should be created', inject([CarServiceDataService], (service: CarServiceDataService) => {
    expect(service).toBeTruthy();
  }));
});
