import { TestBed } from '@angular/core/testing';

import { StateStoreService } from './state-store.service';

describe('StateStoreServiceService', () => {
  let service: StateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
