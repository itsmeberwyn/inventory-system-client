import { TestBed } from '@angular/core/testing';

import { RouteListenerService } from './route-listener.service';

describe('RouteListenerService', () => {
  let service: RouteListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
