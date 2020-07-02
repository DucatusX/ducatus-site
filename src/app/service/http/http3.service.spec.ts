/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Http3Service } from './http3.service';

describe('Service: Http3', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Http3Service]
    });
  });

  it('should ...', inject([Http3Service], (service: Http3Service) => {
    expect(service).toBeTruthy();
  }));
});
