/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { RateService } from './rate.service';

describe('Service: Rate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateService],
    });
  });

  it('should ...', inject([RateService], (service: RateService) => {
    expect(service).toBeTruthy();
  }));
});
