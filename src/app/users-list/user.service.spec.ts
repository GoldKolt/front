import { TestBed, inject } from '@angular/core/testing';

import { UserList.ServiceService } from './user-list.service.service';

describe('UserList.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserList.ServiceService]
    });
  });

  it('should be created', inject([UserList.ServiceService], (service: UserList.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
