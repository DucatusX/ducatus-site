/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuyService } from './buy.service';

describe('Service: Buy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyService]
    });
  });

  it('should ...', inject([BuyService], (service: BuyService) => {
    expect(service).toBeTruthy();
  }));
});
