/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Http2Service } from './http2.service';

describe('Service: Http2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Http2Service]
    });
  });

  it('should ...', inject([Http2Service], (service: Http2Service) => {
    expect(service).toBeTruthy();
  }));
});
